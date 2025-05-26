import APIurl from '../models/APIurl';
import customFetch from '../utils/customFetch';

class CategoriasModel {
  constructor(id, entrega_id, nombre, curso_id, apartado_id) {
    this.id = id;
    this.entrega_id = entrega_id;
    this.nombre = nombre;
    this.curso_id = curso_id;
    this.apartado_id = apartado_id;
  }

  static async getCategoriasByApartadoId(apartadoId) {
    const apiUrl = APIurl.getAPIurl("getCategoriasByApartadoId", apartadoId);
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
          throw new Error('Error al obtener las categorias de x apartado');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.categorias;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

static async uploadCategoria(id, nombreCategoria) {
  const apiUrl = APIurl.getAPIurl("uploadCategoria");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
        nombreCategoria,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              // console.log("Respuesta de la actyuaslizacion de la categoria",data.message);
              return true;
          }else{
            // console.log("Error actualizando la categoria ERROR:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}

static async deleteCategoria(categoria_id) {
      const apiUrl = APIurl.getAPIurl("deleteCategoria", categoria_id);
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
            // console.log(data.error);
            return false;
            
          }
          
        } catch (error) {
          console.error(error);
          return false;
        }
    }


     // Método estático para registrar un usuario
      static async createCategoria(nombreNuevaCategoria, cursoId, apartadoId) {
        const apiUrl = APIurl.getAPIurl("createCategoria");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
                nombreNuevaCategoria,
                cursoId,
                apartadoId,
            }),
          });
          if (response.ok) {
            const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
                if(data.success){
                    // console.log("Respuesta del instert del la categoria",data.message);
                    
                    return true;
                }else{
                        // console.log("Respuesta del instert del categoria de ERROR", data.error);
                        return false
                    }
                
                }
    
        } catch (error) {
          console.error(error);
          return false;  // En caso de error, retornamos null
        }
      }

}

export default CategoriasModel;
