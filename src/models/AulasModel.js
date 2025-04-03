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

  // Método para mostrar el aula como una representación legible
  toString() {
    return `${this.nombre} (Profesor ID: ${this.profesor_id})`;
  }
}

export default AulasModel;
