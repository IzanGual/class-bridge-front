import APIurl from '../models/APIurl';
import customFetch from '../utils/customFetch';

class ApartadosModel {
  constructor(id, nombre, curso_id) {
    this.id = id;
    this.nombre = nombre;
    this.curso_id = curso_id;
  }

  static async getApartadosByCourseId(course_id) {
    const apiUrl = APIurl.getAPIurl("getApartadosByCourseId", course_id);
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible

    if (!apiUrl) {
        console.error('URL no válida');
        return false; 
      }
  
      try {
        const response = await customFetch(apiUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token 
          }
          
      });
        if (!response.ok) {
          throw new Error('Error al obtener los apartados de x categoria');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.apartados;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

  
static async uploadApartado(id, nombreApartado) {
  const apiUrl = APIurl.getAPIurl("uploadApartado");  // Necesitarías agregar un caso en la clase APIurl para esta operación
  const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible


  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      },
      body: JSON.stringify({
        id,
        nombreApartado,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta de la actyuaslizacion del apartado del usuario",data.message);
              return true;
          }else{
            console.log("Error actualizando el curso ERROR:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


static async deleteApartado(apartado_id) {
      const apiUrl = APIurl.getAPIurl("deleteApartado", apartado_id);
      const token = localStorage.getItem('jwt'); 
  
      if (!apiUrl) {
          console.error('URL no válida');
          return false; 
        }
    
        try {
          const response = await customFetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
            
        });
          if (!response.ok) {
            throw new Error('Error al eliminar el apartado');
          }
          //const errorText = await response.text();
          //console.error('Cuerpo de la respuesta de error:', errorText);
          const data = await response.json(); 
          if(data.success){
            return true;
          }else{
            console.log(data.error);
            return false;
            
          }
          
        } catch (error) {
          console.error(error);
          return false;
        }
    }


    
     // Método estático para registrar un usuario
      static async createApartado(nombreNuevoApartado, cursoId) {
        const apiUrl = APIurl.getAPIurl("createApartado");  // Necesitarías agregar un caso en la clase APIurl para esta operación
        const token = localStorage.getItem('jwt'); 

        if (!apiUrl) {
          console.error('URL no válida');
          return false;
        }
    
        try {
          const response = await customFetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({
                nombreNuevoApartado,
                cursoId,
            }),
          });
          if (response.ok) {
            const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
                if(data.success){
                    console.log("Respuesta del instert del Apartado",data.message);
                    
                    return true;
                }else{
                        console.log("Respuesta del instert del Apartado de ERROR", data.error);
                        return false
                    }
                
                }
    
        } catch (error) {
          console.error(error);
          return false;  // En caso de error, retornamos null
        }
      }

}

export default ApartadosModel;
