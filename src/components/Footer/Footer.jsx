import './Footer.css';

export default function Footer() {
    return (
        <footer id="footer-container">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/">Inicio</a>
                    <a href="/#planes">Planes</a>
                    <a href="/contact">Contacto</a>
                    <a href="/privacy">Privacidad</a>
                </div>
                <p className="footer-copy">&copy; 2025 class-bridge. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
