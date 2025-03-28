import './SubscriptionStatus.css';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionStatus({ subscriptionState }) {
    const navigate = useNavigate();

    return (
        <div className="subscription-status">
            <p>{subscriptionState}</p>
            {subscriptionState === 'pendiente' && (
                <>
                    <p>No has seleccionado ningún plan aún.</p>
                    <button className="btn" onClick={() => navigate('/')}>Seleccionar un plan</button>
                </>
            )}
            {subscriptionState === 'activo' && (
                <>
                    <p>Tu suscripción está activa. ¡Disfruta de todas las ventajas!</p>
                    <ul>
                        <li>Acceso ilimitado a contenido premium</li>
                        <li>Soporte prioritario</li>
                        <li>Actualizaciones exclusivas</li>
                    </ul>
                    <button className="btn" onClick={() => alert("Implementar cancelación de suscripción")}>Cancelar suscripción</button>
                </>
            )}
            {subscriptionState === 'vencido' && (
                <>
                    <p>Tu suscripción ha vencido. ¿Quieres renovarla?</p>
                    <button className="btn" onClick={() => navigate('/')}>Renovar suscripción</button>
                </>
            )}
        </div>
    );
}
