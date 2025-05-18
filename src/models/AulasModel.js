import APIurl from './APIurl';

class AulasModel {
  constructor(id, nombre, profesor_id) {
    this.id = id;
    this.nombre = nombre;
    this.profesor_id = profesor_id;
  }

  // Método estático para obtener todas las aulas
  static async getAllAulas() {
    const apiUrl = APIurl.getAPIurl("getAllAulas"); // Obtenemos la URL para obtener todas las aulas
    
    if (!apiUrl) {
      console.error('URL no válida');
      return []; // Si la URL no es válida, retornamos un array vacío
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al obtener las aulas');
      }

      const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
      if(data.success){
        return data.aulas;
      }else{
        return false;
      }
      
    } catch (error) {
      console.error(error);
      return false; // Retornamos un array vacío en caso de error
    }
  }

  // Método estático para obtener todas las aulas
  static async getAulaById(aulaID) {
    const apiUrl = APIurl.getAPIurl("getAulaById", aulaID); // Obtenemos la URL para obtener todas las aulas
    
    if (!apiUrl) {
      console.error('URL no válida');
      return []; // Si la URL no es válida, retornamos un array vacío
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al obtener las aulas');
      }

      const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
      if(data.success){
        return data.aula;
      }else{
        return false;
      }
      
    } catch (error) {
      console.error(error);
      return false; // Retornamos un array vacío en caso de error
    }
  }

  // Método para mostrar el aula como una representación legible
  toString() {
    return `${this.nombre} (Profesor ID: ${this.profesor_id})`;
  }


  static async updateColor(aula_id, color) {
    const apiUrl = APIurl.getAPIurl("updateAula");  // Necesitarías agregar un caso en la clase APIurl para esta operación
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
  
  
    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({
          aula_id,
          color,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                return true;
            }else{
              return false;
          }
      }
  
    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }

  static async updateAulaName(aula_id, aula_name) {
    const apiUrl = APIurl.getAPIurl("updateAula");  // Necesitarías agregar un caso en la clase APIurl para esta operación
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
  
  
    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify({
          aula_id,
          aula_name,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                return data.message;
            }else{
              return data.error;
          }
      }
  
    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }





}



export default AulasModel;
