import APIurl from '../models/APIurl';

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
        const response = await fetch(apiUrl, {
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
        const response = await fetch(apiUrl, {
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
    const response = await fetch(apiUrl, {
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



}
 


export default EntregasModel;
