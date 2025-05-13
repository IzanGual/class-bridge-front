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




}
 


export default EntregasModel;
