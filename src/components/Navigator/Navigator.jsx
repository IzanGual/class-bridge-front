import { Link, useLocation } from "react-router-dom"; // Importa useLocation
import { useState, useEffect } from "react";
import './Navigator.css';
import { checkAuthStatus } from "../../utils/auth.js"; // Importamos la función de autenticación
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
  const IsFullNavNotAvilabe = location.pathname === "/register" || location.pathname === "/login" || location.pathname === "/myprofile";

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
            <li><a className="dropdown-item" href="#planes">Planes</a></li>
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
          <Link id="register-pont" to="/register">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5">
              <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
            </svg>
          </Link>
        )
      )}
    </nav>
  );
}
