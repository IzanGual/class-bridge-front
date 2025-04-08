import './SubscriptionStatus.css';
import { useNavigate } from 'react-router-dom';
import UsersModel from '../../models/UsersModel';
import { useAlert } from '../../utils/AlertProvider';
export default function SubscriptionStatus({ subscriptionState }) {
    const navigate = useNavigate();
    const showAlert = useAlert();    const handleSuscriptionCancel = async () => {
        

        if(!window.confirm("Estas realemnte seguro de que quieres cancelar tu suscripcion? Todos tus servicios se suspenderan y se perdera cualquer informacion relacionada con ellos.")){
            showAlert("Cancelado");
        }else{
            const response = await UsersModel.cancelUserSuscription();
                if (response) {
                    showAlert("Plan cancelado con éxito");
                    navigate('/'); 
                }else{
                    showAlert("Ocurrio u error eliminado la cueta prueba mas tarde");

                }
  
        }

        
        
    };


    return (
        <div className="subscription-status">
             <label>Estado de la suscripcion</label>
            <p id='estado'>{subscriptionState}</p>
            {subscriptionState === 'pendiente' && (
                <>
                    <p className='text'>No ha seleccionado que plan se ajusta perfectamente a usted, echele un vistazo:</p>
                    <button className="redirect-btn" onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1d1d1d"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                    </button>
                </>
            )}
            {subscriptionState === 'activo' && (
                <>
                    <p>Tu suscripción está activa. ¡Disfruta de todas las ventajas! , recuerda que el link de tu aula esta en la bandeja de entrada de tu correo</p>
                    <ul>
                        <li>Acceso ilimitado a contenido premium</li>
                        <li>Soporte prioritario</li>
                        <li>Actualizaciones exclusivas</li>
                    </ul>
                    <button className="degradeAccount" onClick={handleSuscriptionCancel}>Cancelar suscripción</button>
                </>
            )}
            {subscriptionState === 'cancelado' && (
                <>
                    <p>Has cancelado en el pasado tu suscripcion a class-bridge. ¿Te gustaria volver a confiar en nosotros?</p>
                    <button className="renovar" onClick={() => navigate('/')}>Renovar suscripción</button>
                </>
            )}
        </div>
    );
}
