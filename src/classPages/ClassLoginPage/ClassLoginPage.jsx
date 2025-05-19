import './ClassLoginPage.css';
import AulasModel from '../../models/AulasModel';
import UsersModel from '../../models/UsersModel';
import { useState, useEffect } from 'react';
import { useAlert } from '../../utils/AlertProvider'; 
import { checkAuthStatus, getUserRole } from "../../utils/auth.js"; 



export default function ClassLoginPage({ aulaInfo, aulaID }) {
    const [aula, setAula] = useState(null);
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const showAlert = useAlert(); 

    useEffect(() => {
        const verifyAuth = async () => {
        const isLoggedIn = await checkAuthStatus();
        console.log("Esta loggueado?",isLoggedIn);

        if (isLoggedIn) {
        const role = getUserRole();
        if (role === "teacher") {
            console.log("El usuario es profesor");
            window.location.href = `/bridgeto/${aulaInfo.nombre}/dashboard/home`;

        } else if (role === "student") {
            console.log("El usuario es alumno");
            window.location.href = `/bridgeto/${aulaInfo.nombre}/class/home`;
        } else {
            console.log("Rol no reconocido o no definido");
        }
        }



        };
        verifyAuth();
    }, [aulaInfo]); 

   

    useEffect(() => {
        const fetchAula = async () => {
            try {
                const data = await AulasModel.getAulaById(aulaID);
                setAula(data);
            } catch (error) {
                console.error("Error al obtener el aula:", error);
                showAlert("Error al cargar los datos del aula.");
            }
        };

        fetchAula();
    }, [aulaID, showAlert]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await UsersModel.loginToAula(email, contraseña, aulaID);

            switch (response) {
                case "isTeacher":
                    showAlert('Inicio de sesión como profesor');
                    window.location.href = `/bridgeto/${aula.nombre}/dashboard/home`;
                    break;
                case "isStudent":
                    showAlert('Inicio de sesión como estudiante');
                    //window.location.href = `/bridgeto/${aula.nombre}/classroom`;
                    break;
                case "notAula":
                    showAlert('Esta no es tu aula');
                    break;
                case "invalidCredenciales":
                    showAlert('Credenciales inválidas');
                    break;
                case "internsalServerError":
                    showAlert('Error interno del servidor');
                    break;
                default:
                    showAlert('Error al iniciar sesión');
                    break;
            }
        } catch (error) {
            showAlert(`Error: ${error.message}`);
        }
    };

    if (!aula) {
        return <p>Cargando datos del aula...</p>;
    }

    const fechaObj = new Date();
    const dia = fechaObj.getDate();
    const mes = fechaObj.toLocaleString('es-ES', { month: 'long' });
    const año = fechaObj.getFullYear();
  
    const fecha = `${dia} ${mes.charAt(0).toUpperCase() + mes.slice(1)}, ${año}`;


    return (
        <>
        <div className="fecha-container">
            <span className="fecha-texto">{fecha}</span>
            <span className="icono-calendario">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </span>
            </div>
        
        <div className="login-container">
            
            <div className="className-container">
                <h1 id="aulaName">{aula.nombre}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="pass">Contraseña</label>
                <input
                    id="pass"
                    placeholder="Contraseña"
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <button type="submit" className="btn-success">
                    Iniciar Sesión
                </button>
            </form>

            <img id="text-logo-class" src="/assets/images/logos/text-logo.png" alt="class-bridge-logo" />
        </div>
        
      </>
    );
}