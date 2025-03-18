import APIurl from './APIurl';  // Importamos la clase APIurl para obtener la URL base

class UsersModel {
  constructor(id, nombre, email, contraseña, tipo, estado_suscripcion) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.tipo = tipo;  // 'profesor' o 'alumno'
    this.estado_suscripcion = estado_suscripcion || 'pendiente';  // Estado de la suscripción
  }

  // Método estático para registrar un usuario
  static async registerUser(nombre, email, contraseña) {
    const apiUrl = APIurl.getAPIurl("registerUser");  // Necesitarías agregar un caso en la clase APIurl para esta operación

    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          contraseña,
        }),
      });
      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                console.log("Respuesta del instert del usuario",data.message);
                console.log("Respuesta del instert del usuario de DATA",data);
                return "insertCorrect";
            }else{

                if(data.error === "emailDup"){
                    return "emailDup"
                }else{
                    console.log("Respuesta del instert del usuario de ERROR", data.error);
                    return "insertError"
                }
            
      }
            }

    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }

  static async loginUser(email, contraseña) {
    const apiUrl = APIurl.getAPIurl("loginUser");  // Necesitarías agregar un caso en la clase APIurl para esta operación

    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contraseña,
        }),
      });

      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                console.log("Respuesta del instert del usuario",data.message);
                console.log("Respuesta del instert del usuario de DATA",data);
                localStorage.setItem('jwt', data.token);
                return "correctLogin";
            }else{

                if(data.error === "incorrectCredentials"){
                    return "incorrectCredentials"
                }else{
                    console.log("Respuesta del instert del usuario de ERROR", data.error);
                    return "consultError"
                }
            
      }
            }

    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }







  
  // Método para mostrar el usuario como una representación legible
  toString() {
    return `${this.nombre} (${this.email}) - Tipo: ${this.tipo}, Suscripción: ${this.estado_suscripcion}`;
  }
}

export default UsersModel;
