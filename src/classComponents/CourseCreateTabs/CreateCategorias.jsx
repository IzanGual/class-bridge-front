import './CreateTabs.css';
import { useEffect, useState } from 'react';
import ApartadosModel from '../../classModels/ApartadosModel';
import CategoriasModel from '../../classModels/CategoriasModel'; // Importa el modelo de categorías
import { useAlert } from '../../utils/AlertProvider';

export default function CreateCategorias({ newCourseId }) {
    const [apartados, setApartados] = useState([]); // Lista de apartados
    const [selectedApartado, setSelectedApartado] = useState(null); // Apartado seleccionado
    const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState("");
    const showAlert = useAlert();



    useEffect(() => {
        const fetchApartadosByCourseId = async () => {
            if (!newCourseId) return;
            try {
                const data = await ApartadosModel.getApartadosByCourseId(newCourseId);
                if (data) {
                    setApartados(data);
                    // console.log("Apartados del curso:", data);
                } else {
                    // console.log("Este curso aún no tiene apartados:");
                    setApartados([]);
                }
            } catch (error) {
                console.error("Error al obtener los apartados del curso:", error);
            }
        };
        
        fetchApartadosByCourseId();
    }, [newCourseId]);

    
    const handleApartadoChange = (event) => {
        const apartadoId = parseInt(event.target.value, 10); 
        const apartado = apartados.find((a) => a.id === apartadoId); 
        setSelectedApartado(apartado);
       
    };


    const handleCreate = async () => {
        if (nombreNuevaCategoria.length < 3) {
            showAlert("El nombre de la categoria debe tener al menos 3 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (nombreNuevaCategoria.length > 100) {
            showAlert("El nombre de la categoria no puede tener más de 100 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        //// console.log("NOMBRE DEL NUEVO categoria:", nombreNuevaCategoria)

        const response = await CategoriasModel.createCategoria(nombreNuevaCategoria, newCourseId, selectedApartado.id);
            if (response) {
                showAlert("Categoria creada correctamente");
                setNombreNuevaCategoria("");
                
                
            } else {
                showAlert("Error al actualizar la categoria");
            }
    };

    return (
        <div className='tab-info-container'>
            <label className='edit-input-label' htmlFor="apartado-select">Selecciona el apartado para crear categorias en el:</label>
            <div className='options-container'>
                <select
                    disabled={!newCourseId}
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

            



            <label className='edit-input-label' htmlFor="course-name-edit">Crea una nueva categoría:</label>
            <div className='inputPlusBtn-container'>
            <input
                id='course-name-create'
                type="text"
                className='edit-input'
                placeholder='Nombre del la categoria'
                value={nombreNuevaCategoria}
                onChange={(e) => setNombreNuevaCategoria(e.target.value)}
                disabled={!newCourseId || !selectedApartado}
            />
                <div className='save-container'>

                <span>Crear ---</span>
                <button className='save-btnn' onClick={handleCreate} disabled={!newCourseId || !selectedApartado}>
                <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 10.6667V21.3334M10.6667 16.0001H21.3333M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63621 29.3334 2.66667 23.3639 2.66667 16.0001C2.66667 8.63628 8.63621 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                </button>
                    
            
            </div>
            </div>
            
            <span className='info'>La categoria se creará automaticamente en el apartado seleccionado arriva.</span>
            
        </div>
    );
}