import APIurl from '../models/APIurl';
import customFetch from '../utils/customFetch';
class TasksModel {
  constructor(id, alumno_id, categoria_id, comentario, nota, nombre, fecha_limite, estado, fecha_entrega, archivo_url) {
    this.id = id;
    this.alumno_id = alumno_id;
    this.categoria_id = categoria_id;
    this.comentario = comentario;
    this.nota = nota;
    this.nombre = nombre;
    this.fecha_limite = fecha_limite;
    this.estado = estado;
    this.fecha_entrega = fecha_entrega;
    this.archivo_url = archivo_url;
  }

  static async getTasksByCategoriaId(categoria_id) {
  
    const apiUrl = APIurl.getAPIurl("getTasksByCategoriaId", categoria_id);
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
          throw new Error('Error al obtener las tareas sin corregir');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.tasks;
        }else{
          // console.log(data.error)
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

  static async getTasks(aula_id) {
    const apiUrl = APIurl.getAPIurl("getTasks", aula_id);
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
          throw new Error('Error al obtener las tareas ');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.tasks;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }


  static async getUnDeliveredTasks(aula_id, alumno_id) {
    const apiUrl = APIurl.getAPIurl("getUnDeliveredTasks", aula_id, alumno_id);
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
          throw new Error('Error al obtener las tareas sin corregir');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.tasks;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

  static async getUnDoneTasks(aula_id) {
    const apiUrl = APIurl.getAPIurl("getUnDoneTasks", aula_id);
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
          throw new Error('Error al obtener las tareas sin corregir');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.tasks;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

  static async createTask(nombreTarea, fechaLimite, cursoId, categoriaId) {
        const apiUrl = APIurl.getAPIurl("createTarea");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
                nombreTarea,
                fechaLimite,
                cursoId,
                categoriaId,
            }),
          });
          if (response.ok) {
            const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
                if(data.success){
                    // console.log("Respuesta del instert del la tarea",data.message);
                    
                    return true;
                }else{
                        // console.log("Respuesta del instert de la tarea de ERROR", data.error);
                        return false
                    }
                
                }
    
        } catch (error) {
          console.error(error);
          return false;  // En caso de error, retornamos null
        }
      }

      static async updateTask(id, nombreTarea, fechaLimite) {
        const apiUrl = APIurl.getAPIurl("updateTarea");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
              nombreTarea,
              fechaLimite,
            }),
          });
      
          if (response.ok) {
            const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
                if(data.success){
                    // console.log("Respuesta de la actyuaslizacion de la tarea",data.message);
                    return true;
                }else{
                  // console.log("Error actualizando la tarea ERROR:",data.error);
                  return false;
                
            }
          }
      
        } catch (error) {
          console.error(error);
          return null;  // En caso de error, retornamos null
        }
      }

  
static async deleteTask(id) {
      const apiUrl = APIurl.getAPIurl("deleteTask", id);
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
            throw new Error('Error al eliminar la tarea');
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


}
 


export default TasksModel;
