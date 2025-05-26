import APIurl from '../models/APIurl';
import customFetch from '../utils/customFetch';

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
        const response = await customFetch(apiUrl, {
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


static async getStudentCourses(aula_id, alumno_id) {
    const apiUrl = APIurl.getAPIurl("getStudentCourses", aula_id, alumno_id);
    const token = localStorage.getItem('jwt'); 

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
static async getFullCourseInfo(course_id) {
    const apiUrl = APIurl.getAPIurl("getFullCourseInfo", course_id);
    const token = localStorage.getItem('jwt'); 

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
          throw new Error('Error al obtener los cursos');
        }
  
        const data = await response.json(); 
        if(data.success){
          return data.full_course_info;
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
        const response = await customFetch(apiUrl, {
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

static async getCoursesByUserId(user_id) {
    const apiUrl = APIurl.getAPIurl("getCoursesByUserId_id", user_id);
    const token = localStorage.getItem('jwt'); 

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
   
    static async uploadCourse(id, data) {
      const apiUrl = APIurl.getAPIurl("updateCourse"); // Asegúrate de definir esta ruta en `APIurl.js`
      
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
      formData.append('id', id);
      formData.append('imagen', data.selectedFile);
      formData.append('courseName', data.courseName);
      formData.append('courseUsers', data.selectedUsers);
      formData.append('accion', "uploadCourse");
    
      // console.log("formaDFattaaaa", formData.get('imagen'));
      // console.log("iddddddddddddd", formData.get('id'));
      // console.log("courseName", formData.get('courseName'));
      // console.log("courseUsers", formData.get('courseUsers'));
    
      try {
          const response = await customFetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + token, // No agregamos `Content-Type`, fetch lo hace automáticamente con FormData
              },
              body: formData
          });
    
          if (response.ok) {
              const data = await response.json();
              if (data.success) {
                  // console.log("respuesta de la actualizacioon del curso:",data.message);
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




    
    static async createCourse(data) {
      const apiUrl = APIurl.getAPIurl("createCourse"); // Asegúrate de definir esta ruta en `APIurl.js`
      
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
      formData.append('imagen', data.img);
      formData.append('courseName', data.name);
      formData.append('courseUsers', data.users);
      formData.append('aulaId', data.aulaId);
      formData.append('accion', "createCourse");
    
    
      try {
          const response = await customFetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + token, // No agregamos `Content-Type`, fetch lo hace automáticamente con FormData
              },
              body: formData
          });
    
          if (response.ok) {
              const data = await response.json();
              if (data.success) {
                  // console.log("respuesta de la creación del curso:",data.message);
                  return data.id; 
              } else {
                  console.error("Error en la API:", data.error);
                  return false;
              }
          } else {
              console.error("Error en la respuesta del servidor:", response.status);
              return false;
          }
      } catch (error) {
          console.error("Error al crear un nuevo  curso:", error);
          return false;
      }
          
    }





    static async deleteCourseBanner(course_id) {
      const apiUrl = APIurl.getAPIurl("deleteCourseBanner", course_id);
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
            throw new Error('Error al eliminar el banner');
          }
    
          const data = await response.json(); 
          if(data.success){
            return true;
          }else{
            return false;
          }
          
        } catch (error) {
          console.error(error);
          return false;
        }
    }

    
    static async deleteCourse(course_id) {
      const apiUrl = APIurl.getAPIurl("deleteCourse", course_id);
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
            throw new Error('Error al eliminar el curso');
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





export default CoursesModel;
