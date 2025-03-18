export default class APIurl {
    static URLbase = "http://localhost/classbridgeapi/";

    static  getAPIurl(aim) {
        switch (aim) {
          case "getAllPlans":
            return this.URLbase+"planes.php"

    
          case "registerUser":
            return this.URLbase+"usuarios.php"

          case "loginUser":
            return this.URLbase+"auth/login.php"

          default:
            // Caso cuando no coincide con ninguna de las tablas soportadas
            console.error(`Introduce propiedades validas: products, categegories`);
            return null;
        }
    }
}
