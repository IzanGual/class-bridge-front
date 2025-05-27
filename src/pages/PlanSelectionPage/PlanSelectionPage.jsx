import { useEffect, useState } from 'react';
import "./PlanSelectionPage.css";
import PlansModel from '../../models/PlansModel';
import UsersModel from '../../models/UsersModel';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../utils/AlertProvider';

export default function PlanSelectionPage() {
    const [plan, setPlan] = useState(null);
    const [classroomName, setClassroomName] = useState("");
    const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const showAlert = useAlert();

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                setIsLoading(true);
                const queryParams = new URLSearchParams(window.location.search);
                const locParam = queryParams.get('planId');
                const data = await PlansModel.getPlanById(locParam);
                setPlan(data);
            } catch (error) {
                console.error("Error al obtener los planes:", error);
                showAlert("No se pudo cargar la información del plan");
            } finally {
                setIsLoading(false);
            }
        };

        window.scrollTo(0, 0);
        fetchPlan();
    }, []);

    const handleProceedToPayment = (e) => {
        e.preventDefault();
    
        if (!agreeToPrivacy) {
            showAlert("Debes aceptar la política de privacidad para continuar.");
            return;
        }
    
        const classroomNameRegex = /^[a-zA-Z0-9]{2,20}$/;
        if (!classroomNameRegex.test(classroomName)) {
            showAlert("El nombre del aula debe tener entre 2 y 20 caracteres y no debe contener espacios ni caracteres especiales.");
            return;
        }
    
        handleInsertTeacherData();
    };

    const handleSendInfoMail = async () => {
        try {
            const response = await UsersModel.sendInfoMail(classroomName);

            if(!response){
                showAlert("No se ha enviado el correo de confirmación");
            } else{ 
                showAlert("Se ha enviado un correo a su email con información relevante sobre su compra. Revise la carpeta de spam si es necesario.");
            }   
        } catch (error) {
            showAlert(`Error: ${error.message}`);
        }
    };
    
    const handleInsertTeacherData = async () => {
        try {
            setIsLoading(true);
            const response = await UsersModel.setUserToTeacher(plan.precio, classroomName);

            switch(response){
                case "insertCorrect":
                    handleSendInfoMail();
                    navigate(`/orderCompleted?classroomName=${encodeURIComponent(classroomName)}`, { replace: true });
                    break;
                case "classNameDup":
                    showAlert('El nombre del aula ya está registrado');
                    break;
                case "teacherHasAClass":
                    showAlert('Ya cuentas con un aula asociada a tu cuenta');
                    break;
                case "insertError":
                    showAlert('Error al procesar la compra del plan');
                    break;
                default:
                    showAlert('Error al procesar la compra del plan');
                    break;
            }
        } catch (error) {
            showAlert(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="checkout-loading">
                <div className="checkout-loading-spinner"></div>
                <p>Cargando información...</p>
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="checkout-error">
                <p>No se pudo cargar la información del plan. Por favor, inténtalo de nuevo.</p>
                <button onClick={() => navigate('/plans')} className="checkout-back-button">
                    Volver a planes
                </button>
            </div>
        );
    }

    return (
        <div> 
        <div className="checkout-container">
            <div className="checkout-card">
                <div className="checkout-header">
                    <img className="checkout-logo" src="/assets/images/logos/text-logo.png" alt="Logo" />
                    <h1 className="checkout-title">Finalizar compra</h1>
                </div>
                
                <div className="checkout-plan-summary">
                    <h2 className="checkout-section-title">Plan seleccionado</h2>
                    <div className="checkout-plan-details">
                        <div className="checkout-plan-name">{plan.nombre}</div>
                        <div className="checkout-plan-price">€{plan.precio}<span>/mes</span></div>
                        <p className="checkout-plan-description">{plan.descripcion}</p>
                    </div>
                </div>

                <form onSubmit={handleProceedToPayment} className="checkout-form">
                    <div className="checkout-section">
                        <h2 className="checkout-section-title">Información del aula</h2>
                        <div className="checkout-form-group">
                            <label className="checkout-label" htmlFor="classroom-name">
                                Nombre del aula
                            </label>
                            <input 
                                id="classroom-name"
                                className="checkout-input"
                                type="text" 
                                value={classroomName} 
                                onChange={(e) => setClassroomName(e.target.value)} 
                                placeholder="Introduce un nombre único (2-20 caracteres)"
                                required 
                            />
                            <p className="checkout-input-hint">Solo letras y números, sin espacios</p>
                        </div>
                    </div>
                    
                    <div className="checkout-section">
                        <h2 className="checkout-section-title">Información de pago</h2>
                        <div className="checkout-form-group">
                            <label className="checkout-label" htmlFor="card-number">
                                Número de tarjeta
                            </label>
                            <input 
                                id="card-number"
                                className="checkout-input checkout-input-readonly"
                                type="text" 
                                value="**** **** **** 4242" 
                                readOnly 
                            />
                        </div>
                        
                        <div className="checkout-form-row">
                            <div className="checkout-form-group">
                                <label className="checkout-label" htmlFor="expiry-date">
                                    Fecha de expiración
                                </label>
                                <input 
                                    id="expiry-date"
                                    className="checkout-input checkout-input-readonly"
                                    type="text" 
                                    value="12/26" 
                                    readOnly 
                                />
                            </div>
                            
                            <div className="checkout-form-group">
                                <label className="checkout-label" htmlFor="security-code">
                                    CCV
                                </label>
                                <input 
                                    id="security-code"
                                    className="checkout-input checkout-input-readonly"
                                    type="text" 
                                    value="123" 
                                    readOnly 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="checkout-privacy-policy">
                        <label className="checkout-checkbox-container">
                            <input 
                                type="checkbox" 
                                checked={agreeToPrivacy} 
                                onChange={() => setAgreeToPrivacy(!agreeToPrivacy)} 
                            />
                            <span className="checkout-checkbox-text">
                                Acepto las <a href="/privacy" target="_blank" rel="noopener noreferrer">Políticas de privacidad</a>
                            </span>
                        </label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn-seleccionar"
                        disabled={isLoading}
                    >
                        <span>Completar compra</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor">
                            <path d="m701.33-300.67-47.66-46.66L752.33-446H120v-66.67h633l-98.33-98.66 47-46.67L880-479.33 701.33-300.67Z"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}