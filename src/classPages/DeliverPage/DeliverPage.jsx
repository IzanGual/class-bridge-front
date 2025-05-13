import './DeliverPage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntregasModel from '../../classModels/EntregasModel.js';
import EntregaCard from '../../classComponents/EntregaCard/EntregaCard'; // Importamos el componente EntregaCard
import TasksModel from '../../classModels/TasksModel.js';
import UsersModel from '../../models/UsersModel.js';

export default function DeliverPage({ aula }) {
    const navigate = useNavigate();
    const [entregas, setEntregas] = useState([]); // Estado para almacenar las entregas
    const [tareas, setTareas] = useState([]); // Estado para almacenar las tareas
    const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado
    const [selectedTask, setSelectedTask] = useState(null); // Tarea seleccionada

    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            if (!loggedIn) {
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        const fecthEntregas = async () => {
            try {
                const data = await EntregasModel.getEntregas();
                if (data) {
                    setEntregas(data);
                } else {
                    console.log("Hubo un error consiguiendo las entregas:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener las entregas:", error);
            }
        };

        const fecthTareas = async () => {
            try {
                const data = await TasksModel.getTasks();
                if (data) {
                    setTareas(data);
                } else {
                    console.log("Hubo un error consiguiendo las tareas:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener las tareas:", error);
            }
        };

        const fecthUsuarios = async () => {
            try {
                const data = await UsersModel.getOwnUsers(aula.id);
                if (data) {
                    setUsers(data);
                } else {
                    console.log("Hubo un error consiguiendo los usuarios:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        verifyAuth();
        fecthEntregas();
        fecthUsuarios();
        fecthTareas();
    }, [aula, navigate]);


    const fecthEntregas = async (usuario_id = "", tarea_id = "") => {
    // Normalizar los valores para evitar errores
    usuario_id = isNaN(usuario_id) || usuario_id == null ? "" : usuario_id;
    tarea_id = isNaN(tarea_id) || tarea_id == null ? "" : tarea_id;

    try {
        const data = await EntregasModel.getEntregas(usuario_id, tarea_id);
        if (data) {
            setEntregas(data);
        } else {
            console.log("Hubo un error consiguiendo las entregas:", data.error);
        }
    } catch (error) {
        console.error("Error al obtener las entregas:", error);
    }
};


    const handleUserChange = (event) => {
        const userId = parseInt(event.target.value, 10); // Convierte el valor a número
        setSelectedUser(userId);
        console.log("Usuario seleccionado:", userId); // Imprime el ID del usuario seleccionado
        fecthEntregas(userId, selectedTask); // Llama a fecthEntregas con el usuario seleccionado y la tarea actual
    };

    const handleTaskChange = (event) => {
        const taskId = parseInt(event.target.value, 10); // Convierte el valor a número
        setSelectedTask(taskId);
        console.log("Tarea seleccionada:", taskId); // Imprime el ID de la tarea seleccionada
        fecthEntregas(selectedUser, taskId); // Llama a fecthEntregas con la tarea seleccionada y el usuario actual
    };

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Entregas</h1>
                <p className='class-subtitle-header'>Califica y da retroacción a las entregas de tus alumnos.</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <h2 className='section-header' id='marg-bt'>Todas las entregas</h2>
                <p class="class-subtitle-header">Selecciona para filtrar por:</p>
                <div className='options-container'>
                    {/* Dropdown para seleccionar un usuario */}
                    <select
                        onChange={handleUserChange}
                        className="course-dropdown"
                        value={selectedUser || ""}
                    >
                        <option value="">Usuarios</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nombre}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown para seleccionar una tarea */}
                    <select
                        onChange={handleTaskChange}
                        className="course-dropdown"
                        value={selectedTask || ""}
                    >
                        <option value="">Tareas</option>
                        {tareas.map((tarea) => (
                            <option key={tarea.id} value={tarea.id}>
                                {tarea.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='stuff-container'>
                    {entregas.length > 0 ? (
                        entregas.map((entrega) => (
                            <EntregaCard key={entrega.id} aula={aula} entrega={entrega} />
                        ))
                    ) : (
                        <p className="mensaje-vacio">No existen entregas con los filtros especificados. </p>
                    )}
                </div>
            </div>
        </div>
    );
}