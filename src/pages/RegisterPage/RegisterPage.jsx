import { useState, useEffect } from 'react';
import "./RegisterPage.css";
import UsersModel from '../../models/UsersModel'; 
import { useNavigate } from "react-router-dom";
import { getPasswordStrength } from '../../utils/validationUtils';
import { checkAuthStatus } from "../../utils/auth.js";
import { useAlert } from '../../utils/AlertProvider';

export default function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');     
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ level: "Dificultad", score: 0 });
    const navigate = useNavigate();
    const showAlert = useAlert();

    useEffect(() => {
        const verifyAuth = async () => {
            const isLoggedIn = await checkAuthStatus();
            console.log("Esta loggueado?", isLoggedIn);
    
            if (isLoggedIn) {
                window.location.href = `/`;
            } else {
                console.log("No está logueado");
            }
        };

        window.scrollTo(0, 0);


        verifyAuth();
    }, []); 

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const locParam = queryParams.get('loc');

        if (locParam === 'plan') {
            showAlert('Antes de seleccionar el plan debes registrarte');
        } 
    }, []);

    const handlePasswordChange = (value) => {
        setContraseña(value);
        const strength = getPasswordStrength(value);
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (contraseña !== confirmarContraseña) {
            showAlert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await UsersModel.registerUser(nombre, email, contraseña);

            switch(response){
                case "insertCorrect":
                    showAlert('Usuario registrado con éxito');
                    handleLoginAfterRegister(email, contraseña);
                    break;
                case "emailDup":
                    showAlert('El email ya está registrado');
                    break;
                case "insertError":
                    showAlert('Error al registrar el usuario');
                    break;
                default:
                    showAlert('Error al registrar el usuario');
                    break;
            }

        } catch (error) {
            showAlert(`Error: ${error.message}`);
        }
    };

    const handleLoginAfterRegister = async (email, pass) => {
        try {
            const response = await UsersModel.loginUser(email, pass);
    
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
                    <h2 className="register-page__title">Crear cuenta</h2>
                    <p className="register-page__subtitle">
                        Únete a nuestra plataforma educativa
                    </p>
                </div>

                <form className="register-page__form" onSubmit={handleSubmit}>
                    <div className="register-page__form-group">
                        <label className="register-page__label" htmlFor="nombre">
                            Nombre completo
                        </label>
                        <input
                            id="nombre"
                            className="register-page__input"
                            placeholder="Ingresa tu nombre completo"
                            type="text" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                        />
                    </div>

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
                            placeholder="Crea una contraseña segura"
                            type="password" 
                            value={contraseña} 
                            onChange={(e) => handlePasswordChange(e.target.value)} 
                            required 
                        />
                        
                        {contraseña && (
                            <div className="register-page__password-strength">
                                <div className="register-page__password-strength-bar">
                                    <div 
                                        className="register-page__password-strength-fill" 
                                        style={{ 
                                            width: `${passwordStrength.score}%`, 
                                            backgroundColor: getStrengthColor(passwordStrength.level) 
                                        }}
                                    ></div>
                                </div>
                                <span className="register-page__password-strength-text">
                                    {passwordStrength.level}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="register-page__form-group">
                        <label className="register-page__label" htmlFor="confirmPassword">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            className="register-page__input"
                            placeholder="Confirma tu contraseña" 
                            type="password" 
                            value={confirmarContraseña} 
                            onChange={(e) => setConfirmarContraseña(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-seleccionar">
                        <span className="register-page__submit-btn-text">Crear cuenta</span>
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
                        ¿Ya tienes una cuenta? 
                        <a href="/login" className="register-page__login-anchor">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}

// Función para obtener el color de la barra de seguridad
const getStrengthColor = (level) => {
    switch (level) {
        case "Débil":
            return "var(--class-red-color)";
        case "Media":
            return "rgba(var(--class-accent-color-rgb), 0.8)";
        case "Fuerte":
            return "var(--class-green-color)";
        default:
            return "var(--class-text-grey-color)";
    }
};