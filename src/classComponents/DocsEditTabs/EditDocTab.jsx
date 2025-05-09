import { useState, useEffect } from 'react';
import './DocTabs.css';
import DocumentosModel from '../../classModels/DocumentosModel';
import { useAlert } from '../../utils/AlertProvider';
import { useConfirm } from '../../utils/ConfirmProvider';

export default function EditDocTab({ course, categoria, apartado }) {
    const [nombreDocumento, setNombreDocumento] = useState('');
    const [archivo, setArchivo] = useState(null);
    const showAlert = useAlert();
    const showConfirm = useConfirm();
    const [documentos, setDocumentos] = useState([]); // Lista de documentos
    const [selectedDocumento, setSelectedDocumento] = useState(null); // Documento seleccionado

    const handleFileChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleSave = async () => {
        if (nombreDocumento.length < 3) {
            showAlert("El nombre del documento debe tener al menos 3 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (nombreDocumento.length > 30) {
            showAlert("El nombre del documento no puede tener más de 30 caracteres.");
            return; // Detener la ejecución si la validación falla
        }


        const response = await DocumentosModel.updateDocumento(selectedDocumento.id, nombreDocumento, archivo);
        if (response) {
            showAlert("Documento actualizado y subido correctamente");
            fetchDocumentosBycategoriaId();
            setArchivo(null);
        } else {
            showAlert("Error al actualizar el documento");
        }
    };
    const fetchDocumentosBycategoriaId = async () => {
            if (!categoria?.id) return;
            try {
                const data = await DocumentosModel.getDocumentosByCategoriaId(categoria.id);
                if (data) {
                    setDocumentos(data);
                    console.log("Documentos de la categoria:", data);
                } else {
                    console.log("Este apartado aún no tiene documentos:");
                    setDocumentos([]);
                }
            } catch (error) {
                console.error("Error al obtener los documentos de la categoria:", error);
            }
        };

    useEffect(() => {
        const fetchDocumentosBycategoriaId = async () => {
            if (!categoria?.id) return;
            try {
                const data = await DocumentosModel.getDocumentosByCategoriaId(categoria.id);
                if (data) {
                    setDocumentos(data);
                    console.log("Documentos de la categoria:", data);
                } else {
                    console.log("Este apartado aún no tiene documentos:");
                    setDocumentos([]);
                }
            } catch (error) {
                console.error("Error al obtener los documentos de la categoria:", error);
            }
        };

        fetchDocumentosBycategoriaId();
    }, [categoria]);

    const handleDelete = async () => {
        const confirmed = await showConfirm(
            "¿Estas seguro que quieres eliminar el documento? Se eliminara el y todo lo relacionado con el mismo."
        );

        if(!confirmed){
            showAlert("Eliminación cancelada correctamente.");
        }else{
            const response = await DocumentosModel.deleteDocumento(selectedDocumento.id);
            if (response) {
                showAlert("Documento eliminado con éxito");     
                // Restablece los estados
                setSelectedDocumento(null); // Deselecciona el apartado
                setNombreDocumento(""); // Limpia el nombre del apartado

                // Vuelve a cargar los apartados
                fetchDocumentosBycategoriaId();;
                
            } else {
                showAlert("Error al eliminar el documento");
            }
        }
    };

    const handleView = () => {
    if (selectedDocumento && selectedDocumento.url) {
        window.open(selectedDocumento.url, '_blank', 'noopener,noreferrer');
    } else {
        showAlert("No hay un documento seleccionado o no tiene una URL válida.");
    }
};

   const handleDocumentoChange = (e) => {
    const selectedId = parseInt(e.target.value); // Convertir el valor a número
    const documento = documentos.find((doc) => doc.id === selectedId); // Buscar el documento

    if (documento) {
        setSelectedDocumento(documento); // Actualizar el documento seleccionado
        setNombreDocumento(documento.nombre); // Actualizar el nombre del documento
        console.log("Documento seleccionado:", documento);
    } else {
        setSelectedDocumento(null); // Reiniciar el documento seleccionado si no se encuentra
        setNombreDocumento(''); // Reiniciar el nombre del documento
        console.log("No se encontró un documento con el ID seleccionado.");
    }
};

    return (
        <div className='tab-info-container'>
            <div className='dropdownDoc-container'>
                <label className='edit-input-label' htmlFor="documento-select">Selecciona el documento a editar:</label>
                <div className='options-container'>
                    <select
                        id="documento-select"
                        onChange={handleDocumentoChange}
                        className="course-dropdown"
                        value={selectedDocumento ? selectedDocumento.id : ""}
                    >
                        <option value="">Documentos</option>
                        {documentos.map((documento) => (
                            <option key={documento.id} value={documento.id}>
                                {documento.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <label className='edit-input-label'>Nombre visible del documento:</label>
            <input
                disabled={!selectedDocumento}
                type="text"
                className='edit-input'
                placeholder='Nombre del documento'
                value={nombreDocumento || '...'}
                onChange={(e) => setNombreDocumento(e.target.value)}
            />

            <label className='edit-input-label'>Selecciona el nuevo documento:</label>
            <div className='input-file-container'>
                <span className='file-selected-text'>
                    {archivo ? `Archivo: ${archivo.name}` : 'Ningún archivo seleccionado'}
                </span>
                <div>
                    <input
                        disabled={!selectedDocumento}
                        id='archivo-doc'
                        type="file"
                        className='file-input-hidden'
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.odt,.txt,.rtf,.xls,.xlsx,.ods,.ppt,.pptx,.odp,.jpg,.jpeg,.png,.gif,.zip,.rar,.7z"
                    />
                    <button
                        disabled={!selectedDocumento}
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

            <div className='save-container'>

                    <span>Ver documento actual</span>
                    <button className='save-btnn' disabled={!selectedDocumento} onClick={handleView}>
                        <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 24C2 24 10 8 24 8C38 8 46 24 46 24C46 24 38 40 24 40C10 40 2 24 2 24Z" stroke="#56D02A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" stroke="#56D02A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </button>
                        
                </div>

            <div className='save-cancel-container'>
                <div className='save-container'>

                    <span>Guardar cambios ---</span>
                    <button className='save-btnn' disabled={!selectedDocumento} onClick={handleSave}>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                        
                </div>

                <div className='cancel-container'>

                    <span>Eliminar ---</span>
                    <button className='delete-btn' disabled={!selectedDocumento} onClick={handleDelete}>
                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                </div>  
            </div>
                            

            <span className='info'>El archivo puede pesar un máximo de 10MB. Solo podrás subir documentos tipo: (.pdf,.doc,.docx,.odt,.txt,.rtf,.xls,.xlsx,.ods,.ppt,.pptx,.odp,.jpg,.jpeg,.png,.gif,.zip,.rar,.7z). El documento se subirá en la categoría seleccionada.</span>
        </div>
    );
}