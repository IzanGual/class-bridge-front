export default class APIurl {
    static URLbase = "http://localhost/classbridgeapi/";

    static  getAPIurl(aim, id, id2) {
        switch (aim) {
          case "getAllPlans":
            return this.URLbase+"planes.php"

          case "registerUser":
            return this.URLbase+"usuarios.php"

          case "loginUser":
            return this.URLbase+"auth/login.php"

          case "getValidateToken":
            return this.URLbase+"auth/validate-token.php?accion=validateUserToken"

          case "getUser":
            return this.URLbase+"usuarios.php?id="+id;

          case "getOwnUsers":
            return this.URLbase+"usuarios.php?aula_id="+id;
            
          case "getPlanById":
              return this.URLbase+"planes.php?id="+id;
            
          case "updateUserImage":
            return this.URLbase+"usuarios.php";

          case "deleteUserImage":
            return this.URLbase+"usuarios.php?action=deleteImage";
          
          case "deleteUserProfile":
              return this.URLbase+"usuarios.php?action=deleteUserProfile";

          case "deleteStudentProfile":
              return this.URLbase+"usuarios.php?action=deleteStudentProfile&student_id="+id;
          
          case "cancelUserSuscription":
              return this.URLbase+"usuarios.php?action=cancelSuscription";
            
          case "uploadUserName":
            return this.URLbase+"usuarios.php";

          case "uploadUserMail":
            return this.URLbase+"usuarios.php";
          
          case "uploadUserPass":
              return this.URLbase+"usuarios.php";

          case "sendEmailCode":
              return this.URLbase+"auth/mails/mailer.php";

          case "sendInfoMail":
              return this.URLbase+"auth/mails/mailer.php";
              
          case "verifyCode":
              return this.URLbase+"auth/mails/mailer.php";

          case "setUserToTeacher":
              return this.URLbase+"usuarios.php";

          case "getAllAulas":
              return this.URLbase+"aulas.php";
          
          case "getAulaById":
              return this.URLbase+"aulas.php?id="+id;
              
          case "getOwnCourses":
              return this.URLbase+"courses.php?aula_id="+id;
              
          case "getUsersByCourse_id":
              return this.URLbase+"courses.php?getUsersByCourse_id="+id;

          case "getCoursesByUserId_id":
              return this.URLbase+"courses.php?getCoursesByUserId_id="+id;
              
          case "loginToAula":
                return this.URLbase+"auth/loginToAula.php?aulaId="+id;
          
          case "getValidateTeacherToken":
                return this.URLbase+"auth/validate-token.php?accion=validateTeacherToken&aulaId="+id;
          
          case "getValidateStudentToken":
              return this.URLbase+"auth/validate-token.php?accion=validateStudentToken&aulaId="+id;

          case "getUnDoneTasks":
              return this.URLbase+"tasks.php?accion=getUnDoneTasks&aula_id="+id;

          case "getUnDeliveredTasks":
              return this.URLbase+"tasks.php?accion=getUnDeliveredTasks&aula_id="+id+"&user_id="+id2;

          case "getStudentCourses":
              return this.URLbase+"courses.php?studentAula_id="+id+"&studentUser_id="+id2;

          case "getOwnEntregaByTareaId":
              return this.URLbase+"entregas.php?accion=getOwnEntregaByTareaId&tarea_id="+id;
              
          case "getTasks":
              return this.URLbase+"tasks.php?accion=getTasks&aula_id="+id;
              
          case "updateCourse":
              return this.URLbase+"courses.php";

          case "deleteCourseBanner":
              return this.URLbase + "courses.php?id=" + id + "&accion=deleteCourseBanner";

          case "deleteCourse":
              return this.URLbase + "courses.php?id=" + id + "&accion=deleteCourse";
            
          case "getApartadosByCourseId":
              return this.URLbase + "apartados.php?course_id=" + id;
          
          case "uploadApartado":
              return this.URLbase + "apartados.php";
          
          case "deleteApartado":
              return this.URLbase + "apartados.php?id=" + id + "&accion=deleteApartado";
          
          case "createApartado":
              return this.URLbase + "apartados.php";

          case "entregarEntrega":
              return this.URLbase + "entregas.php";
              
          case "getCategoriasByApartadoId":
              return this.URLbase + "categorias.php?apartado_id=" + id;
            
          case "uploadCategoria":
              return this.URLbase + "categorias.php";
              
          case "deleteCategoria":
              return this.URLbase + "categorias.php?id=" + id + "&accion=deleteCategoria";
          
          case "createCategoria":
                return this.URLbase + "categorias.php";
        
          case "createDocumento":
                return this.URLbase + "documentos.php";
                
          case "updateDocumento":
                return this.URLbase + "documentos.php";

          case "getDocumentosByCategoriaId":
                return this.URLbase + "documentos.php?categoria_id=" + id;

          case "deleteDocumento":
                return this.URLbase + "documentos.php?id=" + id + "&accion=deleteDocumento";

          case "deleteEntrega":
                return this.URLbase + "entregas.php?id=" + id + "&accion=deleteEntrega";
                
          case "createTarea":
              return this.URLbase+"tasks.php";

          case "getTasksByCategoriaId":
              return this.URLbase + "tasks.php?categoria_id=" + id + "&accion=getTasksByCategoriaId";

          case "getEntregaById":
                return this.URLbase + "entregas.php?id=" + id + "&accion=getEntregaById";
                  
          case "updateTarea":
              return this.URLbase + "tasks.php";
              
          case "deleteTask":
              return this.URLbase + "tasks.php?id=" + id + "&accion=deleteTask";

          case "getFullCourseInfo":
              return this.URLbase+"courses.php?getFullCourseInfo_id="+id;

          case "createCourse":
              return this.URLbase+"courses.php";

          case "registerStudent":
              return this.URLbase+"usuarios.php"
            
          case "uploadStudent":
              return this.URLbase+"usuarios.php";
        
          case "getEntregas":
              return this.URLbase+"entregas.php?usuario_id="+id+"&tarea_id="+id2+"&accion=getEntregas";
            
          case "correctEntrega":
              return this.URLbase+"entregas.php";

          case "updateAula":
              return this.URLbase+"aulas.php";
              
            
              
          default:
            // Caso cuando no coincide con ninguna de las tablas soportadas
            console.error(`Introduce propiedades validas: products, categegories`);
            return null;
        }
    }
}
