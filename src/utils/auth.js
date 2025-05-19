import APIurl from "../models/APIurl";
import { jwtDecode } from "jwt-decode";

export const checkAuthStatus = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
        console.log("No token found in localStorage.");
        return false;
    }

    const validateEndPoint = APIurl.getAPIurl("getValidateToken"); // Obtenemos la URL para obtener todos los planes
    

    try {
        const response = await fetch(validateEndPoint, {
            method: "GET", // Asegúrate de usar el método adecuado (GET o POST según tu backend)
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Token validation failed:", errorData.error);
            return false;
        }

        // Si la respuesta es exitosa, puedes verificar el mensaje
        const data = await response.json();
        if (data.success) {
            console.log(data.message);
            return true;
        } else {
            console.log("Token validation failed:", data.error);
            return false;
        }

    } catch (error) {
        console.error("Error checking auth status:", error);
        return false;
    }
};

export const checkTeacherAuthStatus = async (aulaID) => {
    const token = localStorage.getItem("jwt");
    //console.log("Token:", token); // Debugging line to check the token value
    if (!token) {
        console.log("No token found in localStorage.");
        return false;
    }

    const validateEndPoint = APIurl.getAPIurl("getValidateTeacherToken", aulaID); // Obtenemos la URL para obtener todos los planes
    

    try {
        const response = await fetch(validateEndPoint, {
            method: "GET", // Asegúrate de usar el método adecuado (GET o POST según tu backend)
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Token validation failed:", errorData.error);
            return false;
        }

        // Si la respuesta es exitosa, puedes verificar el mensaje
        const data = await response.json();
        if (data.success) {
            console.log(data.message);
            return true;
        } else {
            console.log("Token validation failed:", data.error);
            return false;
        }

    } catch (error) {
        console.error("Error checking auth status:", error);
        return false;
    }
};

export function getUserRole() {
  const token = localStorage.getItem("jwt");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (error) {
    console.error("Error al decodificar el JWT:", error);
    return null;
  }
}
