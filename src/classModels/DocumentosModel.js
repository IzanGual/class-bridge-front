import APIurl from '../models/APIurl';

class DocumentosModel {
  constructor(id, categoria_id, nombre, url) {
    this.id = id;
    this.categoria_id = categoria_id;
    this.nombre = nombre;
    this.url = url;
  }
  
  static async getDocumentosByCategoriaId(categoriaId) {
    const apiUrl = APIurl.getAPIurl("getDocumentosByCategoriaId", categoriaId);
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
          throw new Error('Error al obtener las categorias de x apartado');
        }
  
        const data = await response.json(); // Suponemos que la respuesta es un JSON con las aulas
        if(data.success){
          return data.documentos;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error(error);
        return false; // Retornamos un array vacío en caso de error
      }
  }

static async updateDocumento(id, nombreDocumento, file) {
    const apiUrl = APIurl.getAPIurl("updateDocumento"); // Asegúrate de definir esta ruta en `APIurl.js`

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
    formData.append('docName', nombreDocumento);
    formData.append('file', file); 
    formData.append('accion', "updateDoc");
    
    console.log("id", formData.get('id'));
    console.log("file", formData.get('file'));
    console.log("docName", formData.get('docName'));
    console.log("accion", formData.get('accion'));

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token, // No agregamos `Content-Type`, fetch lo hace automáticamente con FormData
            },
            body: formData
        });

        if (response.ok) {
            //const errorText = await response.text();
            //console.error('Cuerpo de la respuesta de error:', errorText);
            const data = await response.json();
            if (data.success) {
                console.log("Documento actualizado correctamente:", data.message);
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
        console.error("Error al actualizar el documento:", error);
        return false;
    }
}


static async deleteDocumento(documento_id) {
      const apiUrl = APIurl.getAPIurl("deleteDocumento", documento_id);
      const token = localStorage.getItem('jwt'); 
  
      if (!apiUrl) {
          console.error('URL no válida');
          return false; 
        }
    
        try {
          const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
            
        });
          if (!response.ok) {
            throw new Error('Error al eliminar el apartado');
          }
          //const errorText = await response.text();
          //console.error('Cuerpo de la respuesta de error:', errorText);
          const data = await response.json(); 
          if(data.success){
            return true;
          }else{
            console.log(data.error);
            return false;
            
          }
          
        } catch (error) {
          console.error(error);
          return false;
        }
    }


      static async createDocumento(nombreDocumento, categoriaId, file, curso_id, apartado_id) {
            const apiUrl = APIurl.getAPIurl("createDocumento"); // Asegúrate de definir esta ruta en `APIurl.js`
            
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
            formData.append('docName', nombreDocumento);
            formData.append('catId', categoriaId);
            formData.append('file', file);
            formData.append('courseId', curso_id);
            formData.append('apartadoId', apartado_id);
            formData.append('accion', "createDoc");
        
          
            console.log("file", formData.get('file'));
            console.log("catId", formData.get('catId'));
            console.log("docName", formData.get('docName'));
            console.log("accion", formData.get('accion'));
         
          
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token, // No agregamos `Content-Type`, fetch lo hace automáticamente con FormData
                    },
                    body: formData
                });
          
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        console.log("ulr publica del archivo:", data.url)
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

}

export default DocumentosModel;
