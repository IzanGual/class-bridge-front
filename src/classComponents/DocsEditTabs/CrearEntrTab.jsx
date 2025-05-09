import { useState } from 'react';
import './DocTabs.css';
import { useAlert } from '../../utils/AlertProvider';
import TasksModel from '../../classModels/TasksModel';

export default function CrearEntrTab({ course, categoria}) {
    const [nombreTarea, setNombreTarea] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const showAlert = useAlert();

    const handleSave = async () => {
        if (nombreTarea.length < 3) {
            showAlert("El eunciado de la tarea debe tener al menos 3 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (nombreTarea.length > 100) {
            showAlert("El enunciado de la tarea no puede tener más de 100 carácteres.");
            return; // Detener la ejecución si la validación falla
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


        // Log de los datos
        console.log("Nombre de la tarea:", nombreTarea);
        console.log("Fecha límite:", fechaLimite);
         const response = await TasksModel.createTask(nombreTarea, fechaLimite, course.id, categoria.id);
            if (response) {
                showAlert("Tarea creada y subida correctamente");
                setNombreTarea("");
                setFechaLimite("");
                
            } else {
                showAlert("Error al crear la tarea");
            }
    };

    return (
        <div className='tab-info-container'>
            <label className='edit-input-label'>Enunciado de la tarea:</label>
            <input
                type="text"
                className='edit-input'
                placeholder='Nombre de la tarea'
                value={nombreTarea}
                onChange={(e) => setNombreTarea(e.target.value)}
            />

            <label className='edit-input-label'>Fecha límite:</label>
            <input
                type="date"
                className='edit-input'
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
            />

            <div className='save-container'>
                <span>Guardar tarea</span>
                <button className='save-btnn' onClick={handleSave}>
                    <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 10.6667V21.3334M10.6667 16.0001H21.3333M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63621 29.3334 2.66667 23.3639 2.66667 16.0001C2.66667 8.63628 8.63621 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <span className='info'>Por favor, introduce el nombre de la tarea y selecciona una fecha límite.</span>
        </div>
    );
}