import { useEffect, useState } from 'react';
import "./PlanSelectionPage.css";
import PlansModel from '../../models/PlansModel';
import UsersModel from '../../models/UsersModel';
import { useNavigate } from 'react-router-dom';

export default function PlanSelectionPage() {
    const [plan, setPlan] = useState(null);
    const [classroomName, setClassroomName] = useState("");
    const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const locParam = queryParams.get('planId');
                const data = await PlansModel.getPlanById(locParam);
                setPlan(data);
            } catch (error) {
                console.error("Error al obtener los planes:", error);
            }
        };

        fetchPlan();
    }, []);

    const handleProceedToPayment = (e) => {
        e.preventDefault();
    
        // Verificar si el usuario aceptó la política de privacidad
        if (!agreeToPrivacy) {
            alert("Debes aceptar la política de privacidad para continuar.");
            return;
        }
    
        // Validación del nombre del aula
        const classroomNameRegex = /^[a-zA-Z0-9]{2,10}$/; // Solo letras y números, sin espacios, de 2 a 10 caracteres
        if (!classroomNameRegex.test(classroomName)) {
            alert("El nombre del aula debe tener entre 2 y 10 caracteres y no debe contener espacios ni caracteres especiales.");
            return;
        }
    
        alert("Procesando pago...");
        handleInsertTeacherData();
    };


    const handleSendInfoMail = async () => {
        try {
            const response = await UsersModel.sendInfoMail();

            if(!response){
                alert("NO SE HA ENVIADO EL CORREO");
            } else{ 
                alert("SII SE HA ENVIADO EL CORREO");
            }   
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
            
        
    };
    

    const handleInsertTeacherData = async () => {
        try {
            const response = await UsersModel.setUserToTeacher(plan.precio, classroomName);

            switch(response){
                case "insertCorrect":
                    handleSendInfoMail();
                    alert('Usuario upgradeado a techaer con éxitooooooooooooo');
                    navigate("/", { replace: true }); 
                    navigate(`/orderCompleted?classroomName=${encodeURIComponent(classroomName)}`, { replace: true });
                    
                    break;
                case "classNameDup":
                    alert('El nombre del aula ya esta registrado');
                    break;
                case "teacherHasAClass":
                        alert('ya cuentas con un aula asociada a tu cuenta ');
                        break;
                case "insertError":
                    alert('Error al comprar el plan');
                    break;
                default:
                    alert('Error al comprar el plan');
                    break;
            }

        } catch (error) {
            alert(`Error: ${error.message}`);
        }
            
        
    };

    if (!plan) {
        return <p>Cargando información del plan...</p>;
    }

    return (
        <div className="page-container">
            <div className="plan-selected-card">
                <img id='text-logo-pay' src="/assets/images/logos/text-logo.png" alt="Logo" />
                
                <form onSubmit={handleProceedToPayment} className="payment-form">
                    <label>Introduce el nombre de tu futura aula:</label>
                        <input 
                            type="text" 
                            value={classroomName} 
                            onChange={(e) => setClassroomName(e.target.value)} 
                            required 
                        />
                    
                    
                    <h3 className="plan-title">Has seleccionado el plan:</h3>
                    <div className="plan-details-card">
                        <h2>{plan.nombre}</h2>
                        <p className="plan-price"><strong>Precio:</strong> ${plan.precio}/mes</p>
                        <p className="plan-description">{plan.descripcion}</p>
                    </div>

                    <label className="checkbox-container">
                        <input 
                            type="checkbox" 
                            checked={agreeToPrivacy} 
                            onChange={() => setAgreeToPrivacy(!agreeToPrivacy)} 
                        />
                        Acepto las <a href="/privacy" target="_blank">Políticas de privacidad</a>
                    </label>
                    
                    <label>
                        Número de tarjeta:
                        <input type="text" value="**** **** **** 4242" readOnly />
                    </label>
                    <label>
                        Fecha de expiración:
                        <input type="text" value="12/26" readOnly />
                    </label>
                    <label>
                        Código de seguridad (CCV):
                        <input type="text" value="123" readOnly />
                    </label>
                    
                    <button type="submit" className="btn-action">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="m701.33-300.67-47.66-46.66L752.33-446H120v-66.67h633l-98.33-98.66 47-46.67L880-479.33 701.33-300.67Z"/></svg>
                    </button>
                </form>
            </div>
        </div>
    );
}