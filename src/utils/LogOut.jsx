import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("jwt"); // Eliminar el token de autenticación
    navigate("/"); // Redirigir a la página de inicio de sesión
    window.location.reload();
    console.log("Logged out successfully.");
  };

  return logOut;
}
