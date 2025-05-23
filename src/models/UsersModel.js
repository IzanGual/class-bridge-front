import APIurl from './APIurl';  // Importamos la clase APIurl para obtener la URL base
import customFetch from '../utils/customFetch';
class UsersModel {
  constructor(id, nombre, email, contraseña, tipo, estado_suscripcion) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.tipo = tipo;  // 'profesor' o 'alumno'
    this.estado_suscripcion = estado_suscripcion || 'pendiente';  // Estado de la suscripción
  }

  // Método estático para registrar un usuario
  static async registerUser(nombre, email, contraseña) {
    const apiUrl = APIurl.getAPIurl("registerUser");  // Necesitarías agregar un caso en la clase APIurl para esta operación

    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }

    try {
      const response = await customFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          contraseña,
        }),
      });
      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                console.log("Respuesta del instert del usuario",data.message);
                console.log("Respuesta del instert del usuario de DATA",data);
                return "insertCorrect";
            }else{

                if(data.error === "emailDup"){
                    return "emailDup"
                }else{
                    console.log("Respuesta del instert del usuario de ERROR", data.error);
                    return "insertError"
                }
            
      }
            }

    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }

static async registerStudent(nombre, email, contraseña, cursos, aula_id) {
    const apiUrl = APIurl.getAPIurl("registerStudent");  // Necesitarías agregar un caso en la clase APIurl para esta operación

    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }

    try {
      const response = await customFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          contraseña,
          cursos,
          aula_id,
        }),
      });
      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                console.log("Respuesta del instert del usuario",data.message);
                console.log("Respuesta del instert del usuario de DATA",data);
                return "insertCorrect";
            }else{

                if(data.error === "emailDup"){
                    return "emailDup"
                }else{
                    console.log("Respuesta del instert del usuario de ERROR", data.error);
                    return "insertError"
                }
            
      }
            }

    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }



static async uploadStudent(data) {
  const apiUrl = APIurl.getAPIurl("uploadStudent");
  const token = localStorage.getItem('jwt');

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
      body: JSON.stringify(data), // Aquí envías todo el objeto data
    });

    if (response.ok) {
       //const errorText = await response.text();
      //console.error('Cuerpo de la respuesta de error:', errorText);
      const result = await response.json();
      if (result.success) {
        return result.message;
      } else {
        return result.error;
      }
    } else {
      console.error('Error en la respuesta del servidor:', response.status);
      return null;
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    return null;
  }
}





  static async loginUser(email, contraseña) {
    const apiUrl = APIurl.getAPIurl("loginUser");  // Necesitarías agregar un caso en la clase APIurl para esta operación

    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }

    try {
      const response = await customFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contraseña,
        }),
      });

      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                console.log("Respuesta del instert del usuario",data.message);
                console.log("Respuesta del instert del usuario de DATA",data);
                localStorage.setItem('jwt', data.token);
                return "correctLogin";
            }else{

                if(data.error === "incorrectCredentials"){
                    return "incorrectCredentials"
                }else{
                    console.log("Respuesta del instert del usuario de ERROR", data.error);
                    return "consultError"
                }
            
      }
            }

    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }

    static async loginToAula(email, contraseña, aulaID) {
    const apiUrl = APIurl.getAPIurl("loginToAula", aulaID);  // Necesitarías agregar un caso en la clase APIurl para esta operación

    if (!apiUrl) {
      console.error('URL no válida');
      return null;
    }

    try {
      const response = await customFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contraseña,
        }),
      });

      if (response.ok) {
        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
            if(data.success){
                console.log("Respuesta del instert del usuario",data.message);
                console.log("Respuesta del instert del usuario de DATA",data);
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('userName', data.userName);
               
                return data.message;
            }else{
                return data.error;
            }
            }

    } catch (error) {
      console.error(error);
      return null;  // En caso de error, retornamos null
    }
  }


  
  static async getOwnUsers(aulaId) {
    const apiUrl = APIurl.getAPIurl("getOwnUsers", aulaId);  

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
                
                return data.users;  
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

  static async getUser(id) {
    const apiUrl = APIurl.getAPIurl("getUser", id);  // Asegúrate de que esta URL sea correcta

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
                console.log("Datos del usuario:", data);
                return data.user;  // Puedes retornar los datos del usuario aquí
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

static async uploadUserImage(id, file) {
  const apiUrl = APIurl.getAPIurl("updateUserImage"); // Asegúrate de definir esta ruta en `APIurl.js`
  
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
  formData.append('imagen', file); // `imagen` debe coincidir con el campo esperado en el backend

  console.log("formaDFattaaaa", formData.get('imagen'));
  console.log("iddddddddddddd", formData.get('id'));

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
              console.log("respuesta:",data.message);
              return data.imageUrl; // Devuelve la URL de la imagen
          } else {
              console.error("Error en la API:", data.error);
              return false;
          }
      } else {
          console.error("Error en la respuesta del servidor:", response.status);
          return false;
      }
  } catch (error) {
      console.error("Error al subir la imagen:", error);
      return false;
  }
}


static async deleteUserImage() {
  const apiUrl = APIurl.getAPIurl("deleteUserImage");  // Necesitarías agregar un caso en la clase APIurl para esta operación
  
  const token = localStorage.getItem('jwt');
  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token // Incluye el token en el encabezado
    },
    
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Imagen Borrada, RESPUESTA DEL SERVER:",data.message);
              console.log("URL",data.imageUrl);
              return data.imageUrl;
          }else{
              console.log("Error al borrar la imagen, ERROR DEL SERIDOR:", data.error);
              return false;     
          }
    }
  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


static async uploadUserName(name) {
  const apiUrl = APIurl.getAPIurl("uploadUserName");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
        name,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta de la actyuaslizacion del nombre del usuario",data.message);
              return true;
          }else{
            console.log("Error actualizando el nombre de usuario ERROR:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


  static async sendEmailVerificationCode(email) {
  const apiUrl = APIurl.getAPIurl("sendEmailCode");  // Necesitarías agregar un caso en la clase APIurl para esta operación
  const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
  const action = "sendCode";


  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      }, 
      body: JSON.stringify({
        email,
        action,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta de la actyuaslizacion del nombre del usuario",data.message);
              return true;
          }else{
            console.log("Error actualizando el nombre de usuario ERROR:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}



static async verifyEmailCode(verificationCode) {
  const apiUrl = APIurl.getAPIurl("verifyCode");  // Necesitarías agregar un caso en la clase APIurl para esta operación
  const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
  const action = "verifyCode";

  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      }, 
      body: JSON.stringify({
        verificationCode,
        action,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta de la actyuaslizacion del nombre del usuario",data.message);
              return true;
          }else{
            console.log("Error actualizando el nombre de usuario ERROR:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


static async uploadUserMail(mail) {
  const apiUrl = APIurl.getAPIurl("uploadUserMail");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
        mail,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              return data.message;
          }else{
            return data.error;
        }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


static async uploadUserPassword(pass) {
  const apiUrl = APIurl.getAPIurl("uploadUserPass");  // Necesitarías agregar un caso en la clase APIurl para esta operación
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
        pass,
      }),
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta de la actyuaslizacion dela pass del usuario",data.message);
              return true;
          }else{
            console.log("Error actualizando la pass de usuario ERROR:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}



static async deleteUserProfile() {
  const apiUrl = APIurl.getAPIurl("deleteUserProfile");  // Necesitarías agregar un caso en la clase APIurl para esta operación
  
  const token = localStorage.getItem('jwt');
  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token // Incluye el token en el encabezado
    },
    
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Usuario Borrado, RESPUESTA DEL SERVER:",data.message);
              return true;
          }else{
              console.log("Error al borrar el perfil, ERROR DEL SERIDOR:", data.error);
              return false;     
          }
    }
  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}

static async deleteStudentProfile(id) {
  const apiUrl = APIurl.getAPIurl("deleteStudentProfile", id);  // Necesitarías agregar un caso en la clase APIurl para esta operación
  
  const token = localStorage.getItem('jwt');
  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token // Incluye el token en el encabezado
    },
    
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Estudiante Borrado, RESPUESTA DEL SERVER:",data.message);
              return true;
          }else{
              console.log("Error al borrar el perfil de aluno, ERROR DEL SERIDOR:", data.error);
              return false;     
          }
    }
  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}

static async setUserToTeacher(precio, classroomName) {
  const apiUrl = APIurl.getAPIurl("setUserToTeacher");  // Necesitarías agregar un caso en la clase APIurl para esta operación
  const token = localStorage.getItem('jwt');

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
        precio,
        classroomName,
      }),
    });
    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta del upgrade a techer del usuario",data.message);
              return "insertCorrect";
          }else{

              if(data.error === "classNameDup"){
                  return "classNameDup"
              }
              else if(data.error === "teacherHasAClass"){
                  return "teacherHasAClass"
              }
              else{
                  console.log("Respuesta del instert del usuario de ERROR", data.error);
                  return "insertError"
              } 
          }
      }  
  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


static async cancelUserSuscription() {
  const apiUrl = APIurl.getAPIurl("cancelUserSuscription");  
  
  const token = localStorage.getItem('jwt');
  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token // Incluye el token en el encabezado
    },
    
    });

    if (response.ok) {
      

       //const errorText = await response.text();
            //console.error('Cuerpo de la respuesta de error:', errorText);

        const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrad
          if(data.success){
              console.log("Usuario Borrado, RESPUESTA DEL SERVER:",data.message);
              return true;
          }else{
              console.log("Error al borrar el perfil, ERROR DEL SERIDOR:", data.error);
              return false;     
          }
    }
  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}


static async sendInfoMail(aula_name) {
  const apiUrl = APIurl.getAPIurl("sendInfoMail");  // Necesitarías agregar un caso en la clase APIurl para esta operación
  const token = localStorage.getItem('jwt'); // Asegúrate de que el token se guarda en algún lugar accesible
  const action = "sendInfoMail";


  if (!apiUrl) {
    console.error('URL no válida');
    return null;
  }

  try {
    const response = await customFetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      }, 
      body: JSON.stringify({
        action,
        aula_name,
      }),
    });

    if (response.ok) {
          //const errorText = await response.text();
            //console.error('Cuerpo de la respuesta de error:', errorText);
      const data = await response.json();  // Suponiendo que la respuesta de la API contiene los datos del usuario registrado
          if(data.success){
              console.log("Respuesta de la actyuaslizacion del nombre del usuario",data.message);
              return true;
          }else{
            console.log("Error actualizando el nombre de usuario ERROR:",data.error);
            return false;
          
      }
    }

  } catch (error) {
    console.error(error);
    return null;  // En caso de error, retornamos null
  }
}

  // Método para mostrar el usuario como una representación legible
  toString() {
    return `${this.nombre} (${this.email}) - Tipo: ${this.tipo}, Suscripción: ${this.estado_suscripcion}`;
  }
}

export default UsersModel;
