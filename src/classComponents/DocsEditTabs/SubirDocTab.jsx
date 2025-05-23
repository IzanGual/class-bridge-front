import { useState } from 'react';
import './DocTabs.css';
import DocumentosModel from '../../classModels/DocumentosModel';
import { useAlert } from '../../utils/AlertProvider';
//import { useConfirm } from '../../utils/ConfirmProvider';

export default function SubirDocTab({ course, categoria, apartado }) {
    const [nombreDocumento, setNombreDocumento] = useState('');
    const [archivo, setArchivo] = useState(null);
     const showAlert = useAlert();
    //const showConfirm = useConfirm();

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleCreate = async () => {
        if (nombreDocumento.length < 3) {
            showAlert("El nombre del documento debe tener al menos 3 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (nombreDocumento.length > 200) {
            showAlert("El nombre del documento no puede tener más de 200 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (!archivo) {
        showAlert("Es obligatorio seleccionar un archivo.");
        return;
    }

        
        const response = await DocumentosModel.createDocumento(nombreDocumento, categoria.id, archivo, course.id, apartado.id);
            if (response) {
                showAlert("Documento creado y subido correctamente");
                setNombreDocumento("");
                
            } else {
                showAlert("Error al crear el documento");
            }
    };

    return (
        <div className='tab-info-container'>
            
            <label className='edit-input-label'>Nombre visible del documento:</label>
            
                
                {/* Input para el nombre */}
                <input
                    type="text"
                    className='edit-input'
                    placeholder='Nombre del documento'
                    value={nombreDocumento}
                    onChange={(e) => setNombreDocumento(e.target.value)}
                />
                
                <label className='edit-input-label'>Selecciona el documento:</label>
                <div className='input-file-container'>
                    

                    {/* Mostrar nombre del archivo si se ha seleccionado */}
                    <span className='file-selected-text'>
                        {archivo ? `Archivo: ${archivo.name}` : 'Ningún archivo seleccionado'}
                    </span>

                    {/* Contenedor del input file oculto y botón */}
                    <div>
                        <input
                            id='archivo-doc'
                            type="file"
                            className='file-input-hidden'
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.odt,.txt,.rtf,.xls,.xlsx,.ods,.ppt,.pptx,.odp,.jpg,.jpeg,.png,.gif,.zip,.rar,.7z"

                        />
                        <button
                            type="button"
                            className='file-upload-btn'
                            onClick={() => document.getElementById('archivo-doc').click()}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8335 1.66675H5.00016C4.55814 1.66675 4.13421 1.84234 3.82165 2.1549C3.50909 2.46746 3.3335 2.89139 3.3335 3.33341V16.6667C3.3335 17.1088 3.50909 17.5327 3.82165 17.8453C4.13421 18.1578 4.55814 18.3334 5.00016 18.3334H15.0002C15.4422 18.3334 15.8661 18.1578 16.1787 17.8453C16.4912 17.5327 16.6668 17.1088 16.6668 16.6667V7.50008M10.8335 1.66675L16.6668 7.50008M10.8335 1.66675L10.8335 7.50008H16.6668" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </button>
                    </div>
                </div>
                
           
          

                
                 {/* Botón guardar */}
                <div className='save-container'>
                    <span>Crear ---</span>
                    <button className='save-btnn' onClick={handleCreate}>
                        <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 10.6667V21.3334M10.6667 16.0001H21.3333M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63621 29.3334 2.66667 23.3639 2.66667 16.0001C2.66667 8.63628 8.63621 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                    
            
          
               
            

            <span className='info'>El archivo puede pesar un máximo de 10MB. Solo podras subir documentos tipo: (.pdf,.doc,.docx,.odt,.txt,.rtf,.xls,.xlsx, .ods,.ppt,.pptx,.odp,.jpg,.jpeg,.png,.gif, .zip,.rar,.7z). El documento se subirá en la categoria seleccionada.</span>
        </div>
    );
}