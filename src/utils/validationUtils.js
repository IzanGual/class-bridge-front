// Validar nombre (mínimo 3 caracteres, no vacío)
export const validateName = (name) => {
    if (!name || name.trim().length < 3) {
        return "El nombre debe tener al menos 3 caracteres.";
    }
    return null; // Sin errores
};

// Validar correo electrónico (formato válido y no vacío)
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return "Introduce un correo electrónico válido.";
    }
    return null; // Sin errores
};

/*
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
        return "La contraseña debe tener al menos 8 caracteres, incluir una letra, un número y un carácter especial.";
    }
    return null; // Sin errores
};
*/

export const getPasswordStrength = (password) => {
    if (!password) return { level: "Vacía", score: 0 };

    let score = 0;

    // Incrementar el puntaje según los criterios
    if (password.length >= 8) score += 1; // Longitud mínima
    if (/[A-Z]/.test(password)) score += 1; // Contiene mayúsculas
    if (/[a-z]/.test(password)) score += 1; // Contiene minúsculas
    if (/\d/.test(password)) score += 1; // Contiene números
    if (/[@$!%*?&]/.test(password)) score += 1; // Contiene caracteres especiales

    // Determinar el nivel de fortaleza
    if (score <= 1) return { level: "Débil", score: 20 };
    if (score === 2 || score === 3) return { level: "Media", score: 50 };
    if (score >= 4) return { level: "Fuerte", score: 100 };
};