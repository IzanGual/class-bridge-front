import { Link, useLocation } from "react-router-dom"; 
import { useState, useEffect } from "react";
import './Navigator.css';
import { checkAuthStatus } from "../../utils/auth.js"; 
import ProfileIcon from "../ProfileIcon/ProfileIcon.jsx";

export default function Navigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Obtiene la ruta actual

  useEffect(() => {
    const verifyAuth = async () => {
      const isLoggedIn = await checkAuthStatus();
      setIsAuthenticated(isLoggedIn);
    };
    verifyAuth();
  }, [location.pathname]); // Se ejecuta cada vez que cambia la URL

  // Verifica si estamos en la página de registro o login
  const IsFullNavNotAvilabe = location.pathname === "/register" || location.pathname === "/login" || location.pathname === "/myprofile" || location.pathname === "/planSelection" || location.pathname === "/privacy" || location.pathname === "/orderCompleted" || location.pathname === "/contact" || location.pathname === "/tutorial";

  return (
    <nav className="navbar">
      {/* Menú hamburguesa con Bootstrap, solo visible si no estamos en la página de registro */}
      {!IsFullNavNotAvilabe && (
        <div className="dropdown">
          <button className="dropdown" id="btn-menu" type="button" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#000000">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#planes">Plan</a></li>
            <li><a className="dropdown-item" href="#nosotros">¿Por qué nosotros?</a></li>
            <li><a className="dropdown-item" href="#faq">FAQ</a></li>
            <li><a className="dropdown-item" href="#contacto">Contacto</a></li>
          </ul>
        </div>
      )}

      {/* Logo centrado */}
      <Link to="/" className="navbar-brand">
        <img src="/assets/images/logos/logo.png" alt="Logo" />
      </Link>

      {/* Botón de registro o perfil */}
      {!IsFullNavNotAvilabe && (
        isAuthenticated ? (
          
            <ProfileIcon />
          
        ) : (
          <Link id="register-pont" to="/login">
        
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 6H38C39.0609 6 40.0783 6.42143 40.8284 7.17157C41.5786 7.92172 42 8.93913 42 10V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H30M20 34L30 24M30 24L20 14M30 24H6" stroke="#FAFAF5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </Link>
        )
      )}
    </nav>
  );
}
