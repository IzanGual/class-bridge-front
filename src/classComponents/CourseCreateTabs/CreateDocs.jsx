import './CreateTabs.css';
import { useEffect, useState } from 'react';
import ApartadosModel from '../../classModels/ApartadosModel';
import CategoriasModel from '../../classModels/CategoriasModel'; // Importa el modelo de categorías
import SubirDocTab from '../DocsEditTabs/SubirDocTab';
import CrearEntrTab from '../DocsEditTabs/CrearEntrTab';

export default function CreateDocs({ newCourseId }) {
    const [apartados, setApartados] = useState([]); // Lista de apartados
    const [selectedApartado, setSelectedApartado] = useState(null); // Apartado seleccionado
    const [categorias, setCategorias] = useState([]); // Lista de categorías
    const [selectedCategoria, setSelectedCategoria] = useState(null); // Categoría seleccionada

    const [activeTab, setActiveTab] = useState('subirDoc'); // Estado para la pestaña activa


    const handleTabChange = (tab) => {
            setActiveTab(tab); // Cambia la pestaña activa
    };

    // Obtener categorías por apartado
    const fetchCategoriasByApartadoId = async (apartadoId) => {
        if (!apartadoId) return;
        try {
            const data = await CategoriasModel.getCategoriasByApartadoId(apartadoId);
            if (data) {
                setCategorias(data);
                console.log("Categorías del apartado:", data);
            } else {
                console.log("Este apartado aún no tiene categorías:");
                setCategorias([]);
            }
        } catch (error) {
            console.error("Error al obtener las categorías del apartado:", error);
        }
    };

    useEffect(() => {
        const fetchApartadosByCourseId = async () => {
            if (!newCourseId) return;
            try {
                const data = await ApartadosModel.getApartadosByCourseId(newCourseId);
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
    }, [newCourseId]);

    
    const handleApartadoChange = (event) => {
        const apartadoId = parseInt(event.target.value, 10); 
        const apartado = apartados.find((a) => a.id === apartadoId); 
        setSelectedApartado(apartado);
        setCategorias([]); 
        setSelectedCategoria(null); 
       
        if (apartado) {
            fetchCategoriasByApartadoId(apartado.id); 
        }
    };


    const handleCategoriaChange = (event) => {
        const categoriaId = parseInt(event.target.value, 10); 
        const categoria = categorias.find((c) => c.id === categoriaId); 
        setSelectedCategoria(categoria);
    };




    return (
        <div className='tab-info-container' id='container-doc'>
            <div className='drop-docs-container'>
                        <div className='dropdownDoc-container'>
                            <label className='edit-input-label' htmlFor="apartado-select">Selecciona el apartado:</label>
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
                        </div>
                        

                        <div className='dropdownDoc-container'>
                                <label className='edit-input-label' htmlFor="categoria-select">Selecciona la categoría:</label>
                                <div className='options-container'>
                                    <select
                                        id="categoria-select"
                                        onChange={handleCategoriaChange}
                                        className="course-dropdown"
                                        value={selectedCategoria ? selectedCategoria.id : ""}
                                        disabled={!selectedApartado || !newCourseId}

                                    >
                                        <option value="">Categorías</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                        </div>

            </div>

            <div className="class-horizontal-separator"></div>
            
            <div className='editOptions-container-dos'>
                                <div className='tab-container'>
                                <button      
                                            id='bigger'
                                            className={`tab-button ${activeTab === 'subirDoc' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('subirDoc')}
                                        >
                                            Subir Documento
                                        </button>
                                        <button
                                            id='bigger'
                                            className={`tab-button ${activeTab === 'crearEntr' ? 'active' : ''}`}
                                            onClick={() => handleTabChange('crearEntr')}
                                        >
                                            Crear Tarea
                                        </button>
                                      
                                   
                                </div>
            
                                   {activeTab === 'subirDoc' && (
                                        selectedCategoria ? (
                                            <SubirDocTab apartado={selectedApartado} course={{ id: newCourseId }} categoria={selectedCategoria}/> 
                                        ) : (
                                            <div className='margin-top' style={{ opacity: 0.6 }}>Selecciona una categoría para subir un documento</div>
                                        )
                                    )}

                                    {activeTab === 'crearEntr' && (
                                        selectedCategoria ? (
                                            <CrearEntrTab apartado={selectedApartado} course={{ id: newCourseId }} categoria={selectedCategoria} />
                                        ) : (
                                            <div className='margin-top' style={{ opacity: 0.6 }}>Selecciona una categoría para crear una entrega</div>
                                        )
                                    )}

     
                                
                                
                            </div>

            
            
        </div>
    );
}