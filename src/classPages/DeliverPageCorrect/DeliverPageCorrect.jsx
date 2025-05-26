import './DeliverPageCorrect.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EntregasModel from '../../classModels/EntregasModel'; // Importamos el modelo de entregas
import { useAlert } from '../../utils/AlertProvider';
export default function DeliverPageCorrect({ aula }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [entrega, setEntrega] = useState(null); // Estado para almacenar la entrega
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const [notaEntrega, setNotaEntrega] = useState(''); // Estado para la nota de la entrega
    const [comentarioEntrega, setComentarioEntrega] = useState(''); // Estado para el comentario de la entrega
    const showAlert = useAlert();

    const handleNotaChange = (event) => {
        const value = event.target.value;
        if (value === '' || (Number(value) >= 0 && Number(value) <= 10)) {
            setNotaEntrega(value); // Solo permite valores entre 0 y 10
        }
    };

    const handleComentarioChange = (event) => {
        setComentarioEntrega(event.target.value);
    };


    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            if (!loggedIn) {
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        const fetchEntrega = async () => {
            const entregaId = searchParams.get('id'); // Obtiene el ID de la entrega desde la URL
            if (!entregaId) {
                console.error("No se proporcionó un ID de entrega en la URL.");
                navigate(`/bridgeto/${aula.nombre}/dashboard/deliveries`); // Redirige si no hay ID
                return;
            }

            try {
                const data = await EntregasModel.getEntregaById(entregaId); // Llama al modelo para obtener la entrega
                if (data) {
                    setEntrega(data); // Guarda la entrega en el estado
                    setComentarioEntrega(data.comentario); 
                    setNotaEntrega(data.nota);
                    // console.log("Entrega obtenida:", data);
                } else {
                    console.error("Error al obtener la entrega:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener la entrega:", error);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        verifyAuth();
        fetchEntrega();
    }, [aula, navigate, searchParams]);

    if (loading) {
        return <p>Cargando entrega...</p>; // Muestra un mensaje mientras se carga la entrega
    }

    if (!entrega) {
        return <p>No se encontró la entrega.</p>; // Muestra un mensaje si no se encuentra la entrega
    }

    const diferenciaDias = entrega.fecha_entrega
    ? Math.ceil((new Date(entrega.fecha_entrega) - new Date(entrega.fecha_limite_tarea)) / (1000 * 60 * 60 * 24))
    : null;

    const handleDownload = () => {
    if (entrega.archivo_url) {
        // Abrir la URL en una nueva pestaña para dispositivos móviles
        window.open(entrega.archivo_url, '_blank');
    } else {
        console.error("No hay archivo disponible para descargar.");
    }
    
};

const handleSave = async () => {
    // Validar que la nota exista
    if (!notaEntrega) {
        showAlert("La nota es obligatoria.");
        return;
    }

    // Validar que el comentario tenga entre 5 y 200 caracteres
    if (comentarioEntrega.length < 5 || comentarioEntrega.length > 200) {
        showAlert("El comentario debe tener entre 5 y 200 caracteres.");
        return;
    }


     const dataToSave = {
            entregaId: entrega.id,
            notaEntrega: notaEntrega,
            comentarioEntrega: comentarioEntrega,
            accion: "correctEntrega",
        };

        // console.log('Datos a guardar:', dataToSave);

        try {
            const response = await EntregasModel.correctEntrega(dataToSave);

            if (!response) {
                showAlert("Error al crear al guardar el feedback");
                
            } else {
                showAlert("Retroacción guardada correctamente");
                
                
            }
        } catch (error) {
            console.error("Error al crear el curso:", error);
            showAlert("Ocurrió un error al intentar crear el curso.");
        }
};

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Entrega</h1>
                <p className='class-subtitle-header'>Información de la entrega seleccionada.</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <h2 id='marg-bt' className='section-header'>Entrega de la tarea: <strong>{entrega.nombre_tarea}</strong></h2>
                <div className='entrega-info-container'>
                    <p id='marg-bt'>Esta tarea pertenece a tu alumno/a:<strong> {entrega.nombre_alumno}</strong></p>
                    <div className='input-file-container' id='max-h'>
                    <div className='infut-text-cotainer'>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.8335 1.66675H5.00016C4.55814 1.66675 4.13421 1.84234 3.82165 2.1549C3.50909 2.46746 3.3335 2.89139 3.3335 3.33341V16.6667C3.3335 17.1088 3.50909 17.5327 3.82165 17.8453C4.13421 18.1578 4.55814 18.3334 5.00016 18.3334H15.0002C15.4422 18.3334 15.8661 18.1578 16.1787 17.8453C16.4912 17.5327 16.6668 17.1088 16.6668 16.6667V7.50008M10.8335 1.66675L16.6668 7.50008M10.8335 1.66675L10.8335 7.50008H16.6668" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Abrir entrega
                    </div>
                    
                    <button className='save-btnn' disabled={!entrega.fecha_entrega} onClick={handleDownload}>
                        <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 24C2 24 10 8 24 8C38 8 46 24 46 24C46 24 38 40 24 40C10 40 2 24 2 24Z" stroke="#56D02A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" stroke="#56D02A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    </div>
                    <p id='marg-bt'>La fecha de la entrega tiene el limita el:<strong> {entrega.fecha_limite_tarea}</strong></p>

                    {entrega.fecha_entrega && (
                    <p id='marg-bt'>
                        La entrega se realizó un:<strong> {entrega.fecha_entrega}</strong>
                    </p>
                    )}
                    
                    {/* Nuevo párrafo para mostrar la diferencia de días */}
                    <p id='marg-bt'>
                        {diferenciaDias === null
                            ? 'No entregada'
                            : diferenciaDias === 0
                            ? 'Entregada el mismo día del límite'
                            : diferenciaDias > 0
                            ? `Entregada ${diferenciaDias} días después del límite`
                            : `Entregada ${Math.abs(diferenciaDias)} días antes del límite`}
                    </p>


                    
                </div>

                <div className='class-horizontal-separator'></div>
                    <div className='tab-info-container-user' id='no-marg'>
                    <div className='input-group'>
                        <label className='edit-input-label' htmlFor="nota-entrega">Nota (sobre 10):</label>
                        <input
                            id='nota-entrega'
                            type="number"
                            className='edit-input'
                            placeholder='Ingresa la nota'
                            value={notaEntrega}
                            onChange={handleNotaChange}
                            min="0"
                            max="10"
                        />
                    </div>

                    <div className='input-group'>
                        <label className='edit-input-label' htmlFor="comentario-entrega">Comentario:</label>
                        <textarea
                            id='comentario-entrega'
                            className='edit-input'
                            placeholder='Escribe un comentario sobre la entrega'
                            value={comentarioEntrega}
                            onChange={handleComentarioChange}
                            rows="4"
                        />
                    </div>
                </div>

                <div className='save-container' >

                    <span>Guardar reatroacción ---</span>
                    <button className='save-btnn' onClick={handleSave}>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                        
                </div>
                <span className='info'>
                    La nota siempre deberá ser sobre 10. Tanto ella como el comentario son obligatorios.
                </span>

            </div>
        </div>
    );
}