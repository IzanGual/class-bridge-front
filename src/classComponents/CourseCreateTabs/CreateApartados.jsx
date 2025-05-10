import './CreateTabs.css';
import { useState } from 'react';
import ApartadosModel from '../../classModels/ApartadosModel';
import { useAlert } from '../../utils/AlertProvider';

export default function CreateApartados({ newCourseId }) {

    const [nombreNuevoApartado, setNombreNuevoApartado] = useState(""); // Lista de apartados
    const showAlert = useAlert();
   

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

        const response = await ApartadosModel.createApartado(nombreNuevoApartado, newCourseId);
            if (response) {
                showAlert("Apartado creado correctamente");
                setNombreNuevoApartado("");
                
            } else {
                showAlert("Error al actualizar el apartado");
            }
    };



   

    return (
        <div className='tab-info-container'>
            <label className='edit-input-label-h' htmlFor="course-name-create">El apartado se creará automáticamente en el curso anteriormente creado.</label>


            <label className='edit-input-label' htmlFor="course-name-create">Nombre del apartado:</label>
            <div className='inputPlusBtn-container'>
            <input
                id='course-name-create'
                type="text"
                className='edit-input'
                placeholder='Nombre del apartado'
                value={nombreNuevoApartado}
                onChange={(e) => setNombreNuevoApartado(e.target.value)}
                disabled={!newCourseId}
            />
                <div className='save-container'>

                <span>Crear ---</span>
                <button className='save-btnn' onClick={handleCreate} disabled={!newCourseId}>
                <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 10.6667V21.3334M10.6667 16.0001H21.3333M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63621 29.3334 2.66667 23.3639 2.66667 16.0001C2.66667 8.63628 8.63621 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                </button>
                    
            
            </div>
            </div>
            
            <span className='info'>Para crearlo, simplemente introduzca un nombre de no menos de 3 dijitos ni mas de 100 y dele al botón de crear.</span>
        </div>
    );
}