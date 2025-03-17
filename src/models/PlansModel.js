import APIurl from './APIurl';  

class PlansModel {
  constructor(id, nombre, descripcion, beneficios, precio) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.beneficios = beneficios;
    this.precio = precio;
  }

  // Método estático para obtener todos los planes
  static async getAllPlans() {
    const apiUrl = APIurl.getAPIurl("getAllPlans"); // Obtenemos la URL para obtener todos los planes
    
    if (!apiUrl) {
      console.error('URL no válida');
      return []; // Si la URL no es válida, retornamos un array vacío
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al obtener los planes');
      }
      
      const data = await response.json();  // Suponiendo que la respuesta es un JSON con los planes
      
      // Si los datos vienen en un array, lo mapeamos a instancias del modelo
      return data.map(plan => new PlansModel(
        plan.id,
        plan.nombre,
        plan.descripcion,
        plan.beneficios,
        plan.precio
      ));
    } catch (error) {
      console.error(error);
      return []; // Retornamos un array vacío en caso de error
    }
  }

  // Método para mostrar el plan como una representación legible
  toString() {
    return `${this.nombre} - ${this.precio} \n${this.descripcion} \nBeneficios: ${this.beneficios}`;
  }
}

export default PlansModel;
