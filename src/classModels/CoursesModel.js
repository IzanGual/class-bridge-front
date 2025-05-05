import APIurl from '../models/APIurl';

class CoursesModel {
  constructor(id, nombre, aula_id, img_url) {
    this.id = id;
    this.nombre = nombre;
    this.aula_id = aula_id;
    this.img_url = img_url;
  }

  static async getOwnCourses(aula_id) {
    const apiUrl = APIurl.getAPIurl("getOwnCourses", aula_id);
    const token = localStorage.getItem('jwt'); 

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
          throw new Error('Error al obtener los cursos');
        }
  
        const data = await response.json(); 
        if(data.success){
          return data.courses;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false;
      }
  }

  
  static async getUsersByCourseId(course_id) {
    const apiUrl = APIurl.getAPIurl("getUsersByCourse_id", course_id);
    const token = localStorage.getItem('jwt'); 

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
          throw new Error('Error al obtener los cursos');
        }
  
        const data = await response.json(); 
        if(data.success){
          return data.users;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false;
      }
  }
}

export default CoursesModel;
