const customFetch = async (url, options = {}) => {
  const token = localStorage.getItem("jwt");

  const isFormData = options.body instanceof FormData;

  options.headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    "Authorization": `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      console.warn("Token expirado o no autorizado. Redirigiendo a login...");
      localStorage.removeItem("jwt");
      localStorage.removeItem("userName");

      const match = window.location.pathname.match(/\/bridgeto\/([^/]+)/);
      const aulaName = match ? match[1] : null;

      window.location.href = aulaName ? `/bridgeto/${aulaName}` : `/`;

      return;
    }

    return response;
  } catch (error) {
    console.error("Error en customFetch:", error);
    throw error;
  }
};

export default customFetch;