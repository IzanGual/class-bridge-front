import APIurl from '../models/APIurl';
import customFetch from '../utils/customFetch';
class EntregasModel {
  constructor(id, alumno_id, tarea_id, comentario, nota, estado, fecha_entrega, archivo_url, estado_correccion) {
    this.id = id;
    this.alumno_id = alumno_id;
    this.tarea_id = tarea_id;
    this.comentario = comentario;
    this.nota = nota;
    this.estado = estado;
    this.fecha_entrega = fecha_entrega;
    this.archivo_url = archivo_url;
    this.estado_correccion = estado_correccion;
  }

  static async getEntregas(usuario_id = "", tarea_id = "") {
  
    const apiUrl = APIurl.getAPIurl("getEntregas", usuario_id, tarea_id);
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
    console.log("LLamada a la URL:", apiUrl);
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
          throw new Error('Error al obtener las entregas ');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.entregas;
        }else{
          console.log(data.error)
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

  static async getOwnEntregas(aula_id) {
  
    const apiUrl = APIurl.getAPIurl("getOwnEntregas", aula_id);
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
    console.log("LLamada a la URL:", apiUrl);
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
          throw new Error('Error al obtener las entregas ');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.entregas;
        }else{
          console.log(data.error)
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

 static async getEntregaById(entrega_id) {
  
    const apiUrl = APIurl.getAPIurl("getEntregaById", entrega_id);
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
    console.log("LLamada a la URL:", apiUrl);
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
          throw new Error('Error al obtener las entrega ');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.entrega;
        }else{
          console.log(data.error)
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }


  
 static async getOwnEntregaByTareaId(tarea_id) {
  
    const apiUrl = APIurl.getAPIurl("getOwnEntregaByTareaId", tarea_id);
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
    console.log("LLamada a la URL:", apiUrl);
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
          throw new Error('Error al obtener las entrega ');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.entrega;
        }else{
          console.log(data.error)
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }
  
static async correctEntrega(data) {
  const apiUrl = APIurl.getAPIurl("correctEntrega");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
      body: JSON.stringify(
        data,
      ),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta de la actyuaslizacion de la retroaccion de la entrega",data.message);
              return true;
          }else{
            console.log("Error actualizando la retroacción:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


static async deleteEntrega(entrega_id) {
      const apiUrl = APIurl.getAPIurl("deleteEntrega", entrega_id);
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
            throw new Error('Error al eliminar la etrega');
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



static async entregarEntrega(entrega_id, fechaActualEntrega, file) {
            const apiUrl = APIurl.getAPIurl("entregarEntrega"); // Asegúrate de definir esta ruta en `APIurl.js`
            
            if (!apiUrl) {
                console.error('URL no válida');
                return false;
            }
          
            const token = localStorage.getItem('jwt'); 
            if (!token) {
                console.error('Token no encontrado');
                return false;
            }
            
            const formData = new FormData();
            formData.append('entregaId', entrega_id);
            formData.append('fecha', fechaActualEntrega);
            formData.append('file', file);
            formData.append('accion', "entregarEntrega");
        
          
            console.log("entregaID", formData.get('entregaId'));
            console.log("fecha", formData.get('fecha'));
            console.log("file", formData.get('file'));
            console.log("accion", formData.get('accion'));
         
          
            try {
                const response = await customFetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token, // No agregamos `Content-Type`, fetch lo hace automáticamente con FormData
                    },
                    body: formData
                });
          
                if (response.ok) {
                    //const errorText = await response.text();
                    //console.error('Cuerpo de la respuesta de error:', errorText);
                    const data = await response.json();
                    if (data.success) {
                        console.log("ulr publica del archivo:", data.url)
                        return true; 
                    } else {
                        console.error("Error en la API:", data.error);
                        return false;
                    }
                } else {
                    console.error("Error en la respuesta del servidor:", response.status);
                    return false;
                }
            } catch (error) {
                console.error("Error al cambiar la info del curso:", error);
                return false;
            }
                
          }


}
 


export default EntregasModel;
