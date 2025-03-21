import APIurl from "../models/APIurl";

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
