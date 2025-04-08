import './ContactPage.css';

export default function ContactPage() {
    return (
        <div className="page-container" id="contact-page-container">
            <h1>Contacto</h1>
            <p>¿Tienes preguntas o necesitas ayuda? Contáctanos.</p>

            <div className="contact-info">
                <p><strong>Email:</strong> contacto@classbriodge.com</p>
                <p><strong>Teléfono:</strong> +34 123 456 789</p>
                <p><strong>Dirección:</strong> Calle Ficticia 123, Barcelona, España</p>
            </div>

            <div className="contact-hours">
                <p><strong>Horario de atención:</strong></p>
                <p>Lunes a Viernes: 9:00 – 18:00</p>
            </div>
        </div>
    );
}
