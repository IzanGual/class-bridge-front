const customFetch = async (url, options = {}) => {
  const token = localStorage.getItem("jwt");

  options.headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, options);
    //const errorText = await response.text();
    //console.error('Cuerpo de la respuesta de error:', errorText);

    if (response.status === 401) {
      console.warn("Token expirado o no autorizado. Redirigiendo a login...");
      localStorage.removeItem("jwt");
      localStorage.removeItem("userName");

      // Redirigir a /bridgeto/elnombrequehaya
      // Busca en la URL actual el segmento después de /bridgeto/
      const match = window.location.pathname.match(/\/bridgeto\/([^/]+)/);
      let aulaName = match ? match[1] : null;

      // Si no está en la URL, intenta obtenerlo de localStorage (si lo guardas ahí)
      if (!aulaName) {
        window.location.href = `/`;
        
      }else{
        window.location.href = `/bridgeto/${aulaName}`;
      }

      
      return;
    }

    return response;
  } catch (error) {
    console.error("Error en customFetch:", error);
    throw error;
  }
};

export default customFetch;