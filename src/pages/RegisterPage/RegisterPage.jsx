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
    const [passwordStrength, setPasswordStrength] = useState({ level: "Dificultad", score: 0 });
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
            <h2>Registro</h2>
            {mensaje && <p className='message-text'>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Nombre'
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    required 
                />

                <input
                placeholder='Correo electrónico'
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />

                <input 
                placeholder='Contraseña'
                    type="password" 
                    value={contraseña} 
                    onChange={(e) => handlePasswordChange(e.target.value)} 
                    required 
                />

                <input
                    placeholder='Confirmar Contraseña' 
                    type="password" 
                    value={confirmarContraseña} 
                    onChange={(e) => setConfirmarContraseña(e.target.value)} 
                    required 
                />
                {/* Barra de seguridad */}
                <div className="password-strength">
                    <div 
                        className="strength-bar" 
                        style={{ 
                            width: `${passwordStrength.score}%`, 
                            backgroundColor: getStrengthColor(passwordStrength.level) 
                        }}
                    ></div>
                </div>
                <p>{passwordStrength.level}</p>

                <button type="submit" className="btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FAFAF5"><path d="m480-320 160-160-160-160-56 56 64 64H320v80h168l-64 64 56 56Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </button>
            </form>
            <div id='login-pont-container'>
                <p>¿Ya tienes una cuenta? <a href="/login">Entra aqui.</a></p>
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