import './ClassLoginPage.css';
import AulasModel from '../../models/AulasModel';
import UsersModel from '../../models/UsersModel';
import { useState, useEffect } from 'react';
import { useAlert } from '../../utils/AlertProvider'; // Importa el hook useAlert

export default function ClassLoginPage({ aulaID }) {
    const [aula, setAula] = useState(null);
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const showAlert = useAlert(); // Obtén la función showAlert del AlertProvider

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


    return (
        
        <div className="login-container">
            {/* Contenedor de las estrellas */}
           

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
      
    );
}