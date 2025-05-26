import { useState, useEffect } from 'react';
import "./LoginPage.css";
import UsersModel from '../../models/UsersModel';
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from "../../utils/auth.js";
import { useAlert } from '../../utils/AlertProvider';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();
    const showAlert = useAlert();

    useEffect(() => {
        const verifyAuth = async () => {
            const isLoggedIn = await checkAuthStatus();
            // console.log("Esta loggueado?", isLoggedIn);
    
            if (isLoggedIn) {
                window.location.href = `/`;
            } else {
                // console.log("No está logueado");
            }
        };

        window.scrollTo(0, 0);
        verifyAuth();
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await UsersModel.loginUser(email, contraseña);

            switch(response) {
                case "correctLogin":
                    showAlert('Inicio de sesión exitoso');
                    navigate("/");
                    break;
                case "incorrectCredentials":
                    showAlert('Email o contraseña incorrectos');
                    break;
                case "consultError":
                    showAlert('Error al iniciar sesión');
                    break;
                default:
                    showAlert('Error al iniciar sesión');
                    break;
            }
        } catch (error) {
            showAlert(`Error: ${error.message}`);
        }
    };

    return (
        <div className='landing-option-container mg-top'>
        <div className="register-page">
            <div className="register-page__container">
                <div className="register-page__header">
                    <h2 className="register-page__title">Iniciar sesión</h2>
                    <p className="register-page__subtitle">
                        Accede a tu cuenta para continuar
                    </p>
                </div>

                <form className="register-page__form" onSubmit={handleSubmit}>
                    <div className="register-page__form-group">
                        <label className="register-page__label" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            className="register-page__input"
                            placeholder="tu@email.com"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="register-page__form-group">
                        <label className="register-page__label" htmlFor="password">
                            Contraseña
                        </label>
                        <input 
                            id="password"
                            className="register-page__input"
                            placeholder="Ingresa tu contraseña"
                            type="password" 
                            value={contraseña} 
                            onChange={(e) => setContraseña(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-seleccionar">
                        <span className="register-page__submit-btn-text">Iniciar sesión</span>
                        <svg 
                            className="register-page__submit-btn-icon"
                            xmlns="http://www.w3.org/2000/svg" 
                            height="20px" 
                            viewBox="0 -960 960 960" 
                            width="20px" 
                            fill="currentColor"
                        >
                            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                        </svg>
                    </button>
                </form>

                <div className="register-page__login-link">
                    <p className="register-page__login-text">
                        ¿No tienes una cuenta? 
                        <a href="/register" className="register-page__login-anchor">
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}