import { useState, useEffect } from 'react';
import "./RegisterPage.css";
import UsersModel from '../../models/UsersModel'; 
import { useNavigate } from "react-router-dom";
import { getPasswordStrength } from '../../utils/validationUtils'; // Importar la función de fortaleza de contraseña

export default function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');     
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ level: "Vacía", score: 0 });
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const locParam = queryParams.get('loc'); // Obtén el valor del parámetro 'loc'

        if (locParam === 'plan') {
            setMensaje('Antes de seleccionar el plan debes registrarte');
        } 
    }, []);

    const handlePasswordChange = (value) => {
        setContraseña(value);
        const strength = getPasswordStrength(value);
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (contraseña !== confirmarContraseña) {
            setMensaje('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await UsersModel.registerUser(nombre, email, contraseña);

            switch(response){
                case "insertCorrect":
                    setMensaje('Usuario registrado con éxito');
                    handleLoginAfterRegister(email, contraseña);
                    break;
                case "emailDup":
                    setMensaje('El email ya está registrado');
                    break;
                case "insertError":
                    setMensaje('Error al registrar el usuario');
                    break;
                default:
                    setMensaje('Error al registrar el usuario');
                    break;
            }

        } catch (error) {
            setMensaje(`Error: ${error.message}`);
        }
    };

    const handleLoginAfterRegister = async (email, pass) => {
        try {
            const response = await UsersModel.loginUser(email, pass);
    
            switch(response) {
                case "correctLogin":
                    setMensaje('Inicio de sesión exitoso');
                    navigate("/");
                    break;
                case "incorrectCredentials":
                    setMensaje('Email o contraseña incorrectos');
                    break;
                case "consultError":
                    setMensaje('Error al iniciar sesión');
                    break;
                default:
                    setMensaje('Error al iniciar sesión');
                    break;
            }
        } catch (error) {
            setMensaje(`Error: ${error.message}`);
        }
    };

    return (
        <div className="registro-container">
            <h2>Formulario de Registro</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <label>Contraseña:</label>
                <input 
                    type="password" 
                    value={contraseña} 
                    onChange={(e) => handlePasswordChange(e.target.value)} 
                    required 
                />
                {/* Barra de seguridad */}
                <div className="password-strength">
                    <div 
                        className="strength-bar" 
                        style={{ width: `${passwordStrength.score}%`, backgroundColor: getStrengthColor(passwordStrength.level) }}
                    ></div>
                    <p>{passwordStrength.level}</p>
                </div>

                <label>Confirmar Contraseña:</label>
                <input 
                    type="password" 
                    value={confirmarContraseña} 
                    onChange={(e) => setConfirmarContraseña(e.target.value)} 
                    required 
                />

                <button type="submit" className="btn btn-success">Registrarse</button>
            </form>
            <div id='login-pont-container'>
                <p>¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p>
            </div>
        </div>
    );
}

// Función para obtener el color de la barra de seguridad
const getStrengthColor = (level) => {
    switch (level) {
        case "Débil":
            return "red";
        case "Media":
            return "orange";
        case "Fuerte":
            return "green";
        default:
            return "gray";
    }
};