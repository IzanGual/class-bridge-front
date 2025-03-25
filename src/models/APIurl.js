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
            return this.URLbase+"auth/validate-token.php"

          case "getUser":
            return this.URLbase+"usuarios.php?id="+id;

          case "updateUserImage":
            return this.URLbase+"usuarios.php";

          case "deleteUserImage":
            return this.URLbase+"usuarios.php?action=deleteImage";
            
          case "uploadUserName":
            return this.URLbase+"usuarios.php";

          case "sendEmailCode":
              return this.URLbase+"auth/mails/sendVerificationCode.php";
    
          default:
            // Caso cuando no coincide con ninguna de las tablas soportadas
            console.error(`Introduce propiedades validas: products, categegories`);
            return null;
        }
    }
}
