import './SubscriptionStatus.css';
import { useNavigate } from 'react-router-dom';
import UsersModel from '../../models/UsersModel';
import { useAlert } from '../../utils/AlertProvider';
import { useConfirm } from '../../utils/ConfirmProvider'; // Importar el hook useConfirm

export default function SubscriptionStatus({ subscriptionState }) {
    const navigate = useNavigate();
    const showAlert = useAlert();
    const showConfirm = useConfirm(); // Usar el hook useConfirm

    const handleSuscriptionCancel = async () => {
        // Mostrar el cuadro de confirmación personalizado
        const confirmed = await showConfirm(
            "¿Estás realmente seguro de que quieres cancelar tu suscripción? Todos tus servicios se suspenderán y se perderá cualquier información relacionada con ellos."
        );

        if (!confirmed) {
            showAlert("Cancelado");
            return;
        }

        try {
            const response = await UsersModel.cancelUserSuscription();
            if (response) {
                showAlert("Plan cancelado con éxito");
                navigate('/');
            } else {
                showAlert("Ocurrió un error al cancelar la suscripción. Por favor, inténtalo más tarde.");
            }
        } catch (error) {
            showAlert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="subscription-status">
            <div className='estado-suscripcion-container'>
                <label className='lbl'>Estado de la suscripción</label>
                <p id="estado">{subscriptionState}</p>
                {subscriptionState === 'activo' && (
                    <button className="degradeAccount" onClick={handleSuscriptionCancel}>
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66667 10H13.3333M4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5Z" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}
            </div>
            
        </div>
    );
}