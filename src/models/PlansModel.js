import APIurl from './APIurl';  
import customFetch from '../utils/customFetch';
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
      const response = await customFetch(apiUrl);
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

 static async getPlanById(id) {
     const apiUrl = APIurl.getAPIurl("getPlanById", id);  // Asegúrate de que esta URL sea correcta
 
     if (!apiUrl) {
         console.error('URL no válida');
         return false;
     }
 
     // Suponiendo que el token JWT está almacenado en el localStorage o sessionStorage
     const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
 
     if (!token) {
         console.error('Token no encontrado');
         return false;
     }
 
     try {
         const response = await customFetch(apiUrl, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token // Incluye el token en el encabezado
             }
             
         });
 
         if (response.ok) {
             const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario
 
             if (data.success) {
                 console.log("Datos del plan:", data);
                 return data.plan;  
             } else {
                 console.error('Error en la respuesta de la API:', data.error);
                 return false;
             }
         } else {
             console.error('Error en la respuesta de la API:', response.status);
             return false;
         }
     } catch (error) {
         console.error('Error en la solicitud:', error);
         return false;  // En caso de error, retornamos null
     }
 }

  

  // Método para mostrar el plan como una representación legible
  toString() {
    return `${this.nombre} - ${this.precio} \n${this.descripcion} \nBeneficios: ${this.beneficios}`;
  }
}

export default PlansModel;
