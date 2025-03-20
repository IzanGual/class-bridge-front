import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAuthStatus } from "./auth.js"; // Función que verifica si el usuario está autenticado

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkAuthStatus();
            setIsAuthenticated(loggedIn);
        };
        verifyAuth();
    }, []);

    if (isAuthenticated === null) {
        return <p>Cargando...</p>; // Muestra esto mientras se verifica la autenticación
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}
