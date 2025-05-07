export default class APIurl {
    static URLbase = "http://localhost/classbridgeapi/";

    static  getAPIurl(aim, id) {
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
              
          case "loginToAula":
                return this.URLbase+"auth/loginToAula.php?aulaId="+id;
          
          case "getValidateTeacherToken":
            return this.URLbase+"auth/validate-token.php?accion=validateTeacherToken&aulaId="+id;
          
          case "getValidateStudentToken":
              return this.URLbase+"auth/validate-token.php?accion=validateStudentToken";

          case "getUnDoneTasks":
              return this.URLbase+"tasks.php?accion=getUnDoneTasks";
      
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
              
              
              
          default:
            // Caso cuando no coincide con ninguna de las tablas soportadas
            console.error(`Introduce propiedades validas: products, categegories`);
            return null;
        }
    }
}
