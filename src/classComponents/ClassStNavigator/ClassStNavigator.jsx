import { NavLink , useLocation} from "react-router-dom";
import './ClassStNavigator.css';
import { useState , useEffect} from "react";
import { useLogout } from "../../utils/LogOut"; // Importa el hook useLogout
import { useNavigate } from "react-router-dom";


export default function ClassStNavigator({ aula }) {
  const [isOpen, setIsOpen] = useState(true); // Estado para abrir/cerrar el menú
  const logOut = useLogout(); // Obtén la función logOut del hook
  const navigate = useNavigate(); // Obtén la función navigate para redirigir
  const location = useLocation(); // Hook para detectar cambios en la ubicación
  
  useEffect(() => {
    setIsOpen(false); // Cierra el menú
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const goToGuali = (aula) => {
    navigate(`/bridgeto/${aula.nombre}/class/guali`);
  }


  return (
    <>
    <div className={`sidebar ${isOpen ? "open" : ""}`}>

      {/* Opciones del menú */}
        <div className="menu-header">
            <img id='nav-logo' src="/assets/images/logos/logo.png" alt="Logo" />
            <h2 id="nav-text-header">{aula.nombre}</h2>
        </div>
      <ul id="st-nav-container" className="menu-options">
        <li>
          <NavLink to={`/bridgeto/${aula.nombre}/class/home`}
          className={({ isActive }) => (isActive ? "active" : "")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V9M9 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V9M9 3V21M3 9V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H9M3 9H21M21 9V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H9"  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <span>Inicio</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/bridgeto/${aula.nombre}/class/myprofile`}
          className={({ isActive }) => (isActive ? "active" : "")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Perfil</span>
          </NavLink>
        </li>


        <div className="guali-click-container">
            <h3>Habla con</h3>
            <h4>guali</h4>
            <button className="accion-btn" onClick={() => goToGuali(aula)}>Dale!</button>
          </div>

        <li>
        <button onClick={() => logOut(aula)} id="logout-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_15_638)">
          <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_15_638">
          <rect width="24" height="24"/>
          </clipPath>
          </defs>
        </svg>

            <span>Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </div>
    <button className="menu-toggle" onClick={toggleMenu}></button>

    </>
  );
}