import './Tabs.css';
import { useEffect, useState } from 'react';
import ApartadosModel from '../../classModels/ApartadosModel';
import { useAlert } from '../../utils/AlertProvider';
import { useConfirm } from '../../utils/ConfirmProvider'; // Importar el hook useConfirm

export default function ApartadosTab({ course }) {
    const [apartados, setApartados] = useState([]); // Lista de apartados
    const [selectedApartado, setSelectedApartado] = useState(null); // Apartado seleccionado
    const [nombreApartado, setNombreApartado] = useState(""); // Lista de apartados
    const [nombreNuevoApartado, setNombreNuevoApartado] = useState(""); // Lista de apartados
    const showAlert = useAlert();
    const showConfirm = useConfirm(); 

    useEffect(() => {
        if (selectedApartado?.nombre) {
            setNombreApartado(selectedApartado.nombre);
        } else {
            setNombreApartado("...");
        }
    }, [selectedApartado]);

    const fetchApartadosByCourseId = async () => {
        if (!course?.id) return;
        try {
            const data = await ApartadosModel.getApartadosByCourseId(course.id);
            if (data) {
                setApartados(data);
                console.log("Apartados del curso:", data);
            } else {
                console.log("Este curso aún no tiene apartados:");
                setApartados([]);
            }
        } catch (error) {
            console.error("Error al obtener los apartados del curso:", error);
        }
    };

    useEffect(() => {
        const fetchApartadosByCourseId = async () => {
            if (!course?.id) return;
            try {
                const data = await ApartadosModel.getApartadosByCourseId(course.id);
                if (data) {
                    setApartados(data);
                    console.log("Apartados del curso:", data);
                } else {
                    console.log("Este curso aún no tiene apartados:");
                    setApartados([]);
                }
            } catch (error) {
                console.error("Error al obtener los apartados del curso:", error);
            }
        };
        
        fetchApartadosByCourseId();
        setNombreApartado("...");
    }, [course]);

    const handleApartadoChange = (event) => {
        const apartadoId = parseInt(event.target.value, 10); // Convierte el valor a número
        const apartado = apartados.find((a) => a.id === apartadoId); // Busca el apartado por ID
        setSelectedApartado(apartado);
        console.log("Apartado seleccionado:", apartado); // Log con el ID y el nombre
    };

 
    const handleCreate = async () => {
        if (nombreNuevoApartado.length < 3) {
            showAlert("El nombre del apartado debe tener al menos 3 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (nombreNuevoApartado.length > 100) {
            showAlert("El nombre del apartado no puede tener más de 100 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        //console.log("NOMBRE DEL NUEVO APARTADO:", nombreNuevoApartado)

        const response = await ApartadosModel.createApartado(nombreNuevoApartado, course.id);
            if (response) {
                showAlert("Apartado creado correctamente");
                setNombreNuevoApartado("");
                fetchApartadosByCourseId();
                
            } else {
                showAlert("Error al actualizar el apartado");
            }
    };


    const handleSave = async () => {
        if (nombreApartado.length < 3) {
            showAlert("El nombre del apartado debe tener al menos 3 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (nombreApartado.length > 100) {
            showAlert("El nombre del apartado no puede tener más de 100 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        const response = await ApartadosModel.uploadApartado(selectedApartado.id, nombreApartado);
            if (response) {
                showAlert("Apartado actualizado correctamente");
                fetchApartadosByCourseId();
                
            } else {
                showAlert("Error al actualizar el apartado");
            }
    };

    const handleApartadoDelete = async () => {
        const confirmed = await showConfirm(
            "¿Estas seguro que quieres eliminar el apartado del curso? Se eliminara el y todo lo relacionado con el mismo."
        );

        if(!confirmed){
            showAlert("Eliminación cancelada correctamente.");
        }else{
            const response = await ApartadosModel.deleteApartado(selectedApartado.id);
            if (response) {
                showAlert("Apartado eliminado con éxito");     
                // Restablece los estados
                setSelectedApartado(null); // Deselecciona el apartado
                setNombreApartado(""); // Limpia el nombre del apartado

                // Vuelve a cargar los apartados
                fetchApartadosByCourseId();
                
            } else {
                showAlert("Error al eliminar el apartado");
            }
        }
    };

    return (
        <div className='tab-info-container'>
            <label className='edit-input-label' htmlFor="apartado-select">Selecciona el apartado que quieras editar:</label>
            <div className='options-container'>
                <select
                    disabled={!course}
                    id="apartado-select"
                    onChange={handleApartadoChange}
                    className="course-dropdown"
                    value={selectedApartado ? selectedApartado.id : ""}
                >
                    <option value="">Apartados</option>
                    {apartados.map((apartado) => (
                        <option key={apartado.id} value={apartado.id}>
                            {apartado.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <label className='edit-input-label' htmlFor="course-name-edit">Nombre del apartado:</label>
            <input
                id='course-name-edit'
                type="text"
                className='edit-input'
                value={nombreApartado}
                onChange={(e) => setNombreApartado(e.target.value)}
                disabled={!selectedApartado || !course}
            />
            <div className='save-cancel-container'>
                <div className='save-container'>

                    <span>Guardar cambios ---</span>
                    <button className='save-btnn' disabled={!selectedApartado || !course} onClick={handleSave}>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                        
                </div>

                <div className='cancel-container'>

                    <span>Eliminar ---</span>
                    <button className='delete-btn' disabled={!selectedApartado || !course} onClick={handleApartadoDelete}>
                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                </div>  
            </div>
            <div className="class-horizontal-separator"></div>
            <label className='edit-input-label' htmlFor="course-name-edit">Crea un nuevo apartado:</label>
            <div className='inputPlusBtn-container'>
            <input
                id='course-name-create'
                type="text"
                className='edit-input'
                placeholder='Nombre del apartado'
                value={nombreNuevoApartado}
                onChange={(e) => setNombreNuevoApartado(e.target.value)}
                disabled={!course}
            />
                <div className='save-container'>

                <span>Crear ---</span>
                <button className='save-btnn' onClick={handleCreate} disabled={!course}>
                <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 10.6667V21.3334M10.6667 16.0001H21.3333M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63621 29.3334 2.66667 23.3639 2.66667 16.0001C2.66667 8.63628 8.63621 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                </button>
                    
            
            </div>
            </div>
            
            <span className='info'>El apartado se creará automaticamente en el curso seleccionado arriva.</span>
        </div>
    );
}