import { Link } from "react-router-dom";
import './ClassNavigator.css';
import { useState } from "react";
import { useLogout } from "../../utils/LogOut"; // Importa el hook useLogout


export default function ClassNavigator({ aula }) {
  const [isOpen, setIsOpen] = useState(true); // Estado para abrir/cerrar el menú
  const logOut = useLogout(); // Obtén la función logOut del hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Botón para abrir/cerrar el menú */}
      <button className="menu-toggle" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#000000">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </button>

      {/* Opciones del menú */}
        <div className="menu-header">
            <img id='nav-logo' src="/assets/images/logos/logo.png" alt="Logo" />
            <h2 id="nav-text-header">class-bridge</h2>
            </div>
      <ul className="menu-options">
        <li>
          <Link to={`/bridgeto/${aula.nombre}/dashboard/home`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Hogar</span>
          </Link>
        </li>
        <li>
          <Link to={`/bridgeto/${aula.nombre}/dashboard/courses`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M480-120 120-480h120v-240h240v160h120v-160h240v240h120L480-120Z" />
            </svg>
            <span>Cursos</span>
          </Link>
        </li>
        <li>
          <Link to={`/bridgeto/${aula.nombre}/dashboard/users`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M480-120 120-480h120v-240h240v160h120v-160h240v240h120L480-120Z" />
            </svg>
            <span>Usuarios</span>
          </Link>
        </li>
        <li>
          <Link to={`/bridgeto/${aula.nombre}/dashboard/tasks`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M480-120 120-480h120v-240h240v160h120v-160h240v240h120L480-120Z" />
            </svg>
            <span>Tareas</span>
          </Link>
        </li>
        <li>
          <Link to={`/bridgeto/${aula.nombre}/dashboard/config`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M480-120 120-480h120v-240h240v160h120v-160h240v240h120L480-120Z" />
            </svg>
            <span>Configuración</span>
          </Link>
        </li>
        <li>
          <Link to="/tutorial">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M480-120 120-480h120v-240h240v160h120v-160h240v240h120L480-120Z" />
            </svg>
            <span>¿Cómo funciona?</span>
          </Link>
        </li>
        <li>
        <button onClick={() => logOut(aula)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M480-120 120-480h120v-240h240v160h120v-160h240v240h120L480-120Z" />
            </svg>
            <span>Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </div>
  );
}