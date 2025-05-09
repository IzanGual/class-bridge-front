import { useState, useEffect } from 'react';
import './DocTabs.css';
import { useAlert } from '../../utils/AlertProvider';
import { useConfirm } from '../../utils/ConfirmProvider';
import TasksModel from '../../classModels/TasksModel';

export default function EditEntrTab({ course, categoria }) {
    const [tareas, setTareas] = useState([]); // Lista de tareas
    const [selectedTarea, setSelectedTarea] = useState(null); // Tarea seleccionada
    const [nombreTarea, setNombreTarea] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const showAlert = useAlert();
    const showConfirm= useConfirm();

    // Obtener las tareas de la categoría
    const fetchTareasByCategoriaId = async () => {
        if (!categoria?.id) return;
        try {
            const data = await TasksModel.getTasksByCategoriaId(categoria.id);
            if (data) {
                setTareas(data);
                console.log("Tareas de la categoría:", data);
            } else {
                console.log("Esta categoría aún no tiene tareas.");
                setTareas([]);
            }
        } catch (error) {
            console.error("Error al obtener las tareas de la categoría:", error);
        }
    };

    useEffect(() => {
        const fetchTareasByCategoriaId = async () => {
        if (!categoria?.id) return;
        try {
            const data = await TasksModel.getTasksByCategoriaId(categoria.id);
            if (data) {
                setTareas(data);
                console.log("Tareas de la categoría:", data);
            } else {
                console.log("Esta categoría aún no tiene tareas.");
                setTareas([]);
            }
        } catch (error) {
            console.error("Error al obtener las tareas de la categoría:", error);
        }
    };
        fetchTareasByCategoriaId();
    }, [categoria]);

    // Manejar el cambio de tarea seleccionada
    const handleTareaChange = (e) => {
        const selectedId = parseInt(e.target.value); // Convertir el valor a número
        const tarea = tareas.find((t) => t.id === selectedId); // Buscar la tarea

        if (tarea) {
            setSelectedTarea(tarea); // Actualizar la tarea seleccionada
            setNombreTarea(tarea.nombre); // Actualizar el nombre de la tarea
            setFechaLimite(tarea.fecha_limite); // Actualizar la fecha límite
            console.log("Tarea seleccionada:", tarea);
        } else {
            setSelectedTarea(null); // Reiniciar la tarea seleccionada si no se encuentra
            setNombreTarea(''); // Reiniciar el nombre de la tarea
            setFechaLimite(''); // Reiniciar la fecha límite
            console.log("No se encontró una tarea con el ID seleccionado.");
        }
    };

    // Guardar los cambios en la tarea seleccionada
    const handleSave = async () => {

        if (nombreTarea.length < 3) {
            showAlert("El enunciado de la tarea debe tener al menos 3 caracteres.");
            return;
        }

        if (nombreTarea.length > 100) {
            showAlert("El enunciado de la tarea no puede tener más de 100 caracteres.");
            return;
        }

        if (!fechaLimite) {
            showAlert("Es obligatorio seleccionar una fecha límite.");
            return;
        }

        // Validar que la fecha límite no sea anterior al día de hoy
        const hoy = new Date();
        const fechaSeleccionada = new Date(fechaLimite);
        hoy.setHours(0, 0, 0, 0); // Eliminar la hora para comparar solo la fecha
        if (fechaSeleccionada < hoy) {
            showAlert("La fecha límite no puede ser anterior al día de hoy.");
            return;
        }

        const response = await TasksModel.updateTask(selectedTarea.id, nombreTarea, fechaLimite);
        if (response) {
            showAlert("Tarea actualizada correctamente");
            fetchTareasByCategoriaId(); // Volver a cargar las tareas
        } else {
            showAlert("Error al actualizar la tarea");
        }
    };

    const handleDelete = async () => {
        const confirmed = await showConfirm(
            "¿Estas seguro que quieres eliminar la tarea? Se eliminara ellla y todo lo relacionado con la misma, incluyendo entregas de tus alumnos y sus respectivos documentos."
        );

        if(!confirmed){
            showAlert("Eliminación cancelada correctamente.");
        }else{
            const response = await TasksModel.deleteTask(selectedTarea.id);
            if (response) {
                showAlert("Tarea eliminado con éxito");     
                // Restablece los estados
                setSelectedTarea(null); // Deselecciona el apartado
                setNombreTarea(""); // Limpia el nombre del apartado

                // Vuelve a cargar los apartados
                fetchTareasByCategoriaId();
                
            } else {
                showAlert("Error al eliminar el documento");
            }
        }
    };

    return (
        <div className='tab-info-container'>
            {/* Dropdown para seleccionar una tarea */}
            <div className='dropdownDoc-container'>
                <label className='edit-input-label' htmlFor="tarea-select">Selecciona la tarea a editar:</label>
                <div className='options-container'>
                    <select
                        id="tarea-select"
                        onChange={handleTareaChange}
                        className="course-dropdown"
                        value={selectedTarea ? selectedTarea.id : ""}
                    >
                        <option value="">Tareas</option>
                        {tareas.map((tarea) => (
                            <option key={tarea.id} value={tarea.id}>
                                {tarea.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Input para editar el nombre de la tarea */}
            <label className='edit-input-label'>Nombre de la tarea:</label>
            <input
                disabled={!selectedTarea}
                type="text"
                className='edit-input'
                placeholder='Nombre de la tarea'
                value={nombreTarea}
                onChange={(e) => setNombreTarea(e.target.value)}
            />

            {/* Input para editar la fecha límite */}
            <label className='edit-input-label'>Fecha límite:</label>
            <input
                disabled={!selectedTarea}
                type="date"
                className='edit-input'
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
            />

            

            <div className='save-cancel-container'>
                {/* Botón para guardar los cambios */}
            <div className='save-container'>
                <span>Guardar cambios</span>
                <button className='save-btnn' disabled={!selectedTarea} onClick={handleSave}>
                    <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 10.6667V21.3334M10.6667 16.0001H21.3333M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63621 29.3334 2.66667 23.3639 2.66667 16.0001C2.66667 8.63628 8.63621 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

                <div className='cancel-container'>

                    <span>Eliminar ---</span>
                    <button className='delete-btn' disabled={!selectedTarea} onClick={handleDelete}>
                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                </div>  
            </div>

            <span className='info'>Selecciona una tarea para editar su nombre y fecha límite.</span>
        </div>
    );
}