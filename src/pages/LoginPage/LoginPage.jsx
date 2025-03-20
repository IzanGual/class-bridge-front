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
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Contraseña:</label>
                <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />

                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
            <div id='register-link-container'>
                <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
            </div>
        </div>
    );
}
