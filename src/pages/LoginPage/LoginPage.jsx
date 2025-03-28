import { useState } from 'react';
import "./LoginPage.css";
import UsersModel from '../../models/UsersModel';
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await UsersModel.loginUser(email, contraseña);

            switch(response) {
                case "correctLogin":
                    setMensaje('Inicio de sesión exitoso');
                    // Redirigir al usuario
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
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {mensaje && <p className='message-text'>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <input placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <input placeholder='Contraseña'type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />

                <button type="submit" className="btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FAFAF5"><path d="m480-320 160-160-160-160-56 56 64 64H320v80h168l-64 64 56 56Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </button>
            </form>
            <div id='register-link-container'>
                <p>¿No tienes una cuenta? <a href="/register">Regístrate.</a></p>
            </div>
        </div>
    );
}
