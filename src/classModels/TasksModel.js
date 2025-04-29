import APIurl from '../models/APIurl';

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

  // Ejemplo: obtener todas las entregas (a completar según tu backend)
  static async getUnDoneTasks() {
    const apiUrl = APIurl.getAPIurl("getUnDoneTasks");
    const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible

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

  // Método opcional para mostrar la entrega como texto
  toString() {
    return `${this.nombre} - Nota: ${this.nota ?? "Sin calificar"}`;
  }
}

export default TasksModel;
