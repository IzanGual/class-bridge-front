import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logOut = (aula) => {
    localStorage.removeItem("jwt"); // Eliminar el token de autenticación 
    localStorage.removeItem("userName"); 
    if (aula && aula.nombre) {
      // Redirigir a la URL base del aula si se pasa la propiedad aula
      navigate(`/bridgeto/${aula.nombre}`);
    } else {
      // Redirigir a la página de inicio de sesión por defecto
      navigate("/");
    }

    window.location.reload(); // Recargar la página
    console.log("Logged out successfully.");
  };

  return logOut;
}