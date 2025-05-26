import './UserPageEdit.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UsersModel from '../../models/UsersModel';
import CoursesModel from '../../classModels/CoursesModel'; // Importamos el modelo de cursos
import { useAlert } from '../../utils/AlertProvider'; // Importamos el hook para usar el sistema de alertas
import { useConfirm } from '../../utils/ConfirmProvider'; // Importar el hook useConfirm

export default function UserPageEdit({ aula }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [courses, setCourses] = useState([]); // Cursos disponibles
    const [userCourses, setUserCourses] = useState([]); // Cursos de el usuario x disponibles
    const [selectedCourses, setSelectedCourses] = useState([]); // Cursos seleccionados
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const showAlert = useAlert(); // Hook para mostrar alertas
    const showConfirm = useConfirm(); // Hook para mostrar confirmaciones

    const fetchUsers = async () => {
            try {
                const data = await UsersModel.getOwnUsers(aula.id);
                if (data) {
                    setUsers(data);
                    // console.log("Usuarios disponibles:", data);

                    // Detecta el parámetro `id` en la URL
                    const userId = searchParams.get('id');
                    if (userId) {
                        const user = data.find((u) => u.id === parseInt(userId, 10));
                        if (user) {
                            setSelectedUser(user); // Autoselecciona el usuario
                            setNombre(user.nombre);
                            setCorreo(user.email);
                            setContrasena(''); // No mostramos la contraseña actual
                            setSelectedCourses(user.courses || []); // Cursos actuales del usuario
                            // console.log("Usuario seleccionado:", user);
                        }
                    }
                } else {
                    // console.log("Hubo un error consiguiendo los usuarios:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            // console.log("islogged", loggedIn);

            if (!loggedIn) {
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        const fetchCoursesByUserId = async (userID) => {
            try {
                const data = await CoursesModel.getCoursesByUserId(userID);
                if (data) {
                    setUserCourses(data); // Cursos del usuario
                    setSelectedCourses(data); // Selecciona automáticamente los cursos
                    // console.log("Cursos dispoibles:", data);
                    // console.log("Cursos del usuario:", userCourses);
                } else {
                    // console.log("Error al obtener los cursos del usuario:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los cursos del usuario:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const data = await UsersModel.getOwnUsers(aula.id);
                if (data) {
                    setUsers(data);
                    // console.log("Usuarios disponibles:", data);

                    // Detecta el parámetro `id` en la URL
                    const userId = searchParams.get('id');
                    if (userId) {
                        const user = data.find((u) => u.id === parseInt(userId, 10));
                        if (user) {
                            setSelectedUser(user); // Autoselecciona el usuario
                            setNombre(user.nombre);
                            setCorreo(user.email);
                            setContrasena(''); // No mostramos la contraseña actual
                            fetchCoursesByUserId(user.id);
                            // console.log("Usuario seleccionado:", user);
                        }
                    }
                } else {
                    // console.log("Hubo un error consiguiendo los usuarios:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        const fetchCourses = async () => {
            try {
                const data = await CoursesModel.getOwnCourses(aula.id);
                if (data) {
                    setCourses(data);
                    // console.log("Cursos disponibles:", data);
                } else {
                    // console.log("Error al obtener los cursos:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        

        verifyAuth();
        fetchUsers();
        fetchCourses();
    }, [aula, navigate, searchParams]);

    const handleUserChange = (event) => {
        const userId = parseInt(event.target.value, 10); // Convierte el valor a número
        const user = users.find((u) => u.id === userId); // Busca el usuario por ID


                const fetchCoursesByUserId = async () => {
            try {
                const data = await CoursesModel.getCoursesByUserId(user.id);
                if (data) {
                    setUserCourses(data); // Cursos del usuario
                    setSelectedCourses(data); // Selecciona automáticamente los cursos
                    // console.log("Cursos dispoibles:", data);
                    // console.log("Cursos del usuario:", userCourses);
                } else {
                    // console.log("Error al obtener los cursos del usuario:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los cursos del usuario:", error);
            }
        };

        setSelectedUser(user);
        if (user) {
            setNombre(user.nombre);
            setCorreo(user.email);
            setContrasena(''); // No mostramos la contraseña actual
            setSelectedCourses(user.courses || []); // Cursos actuales del usuario
            fetchCoursesByUserId();
        }
        // console.log("Usuario seleccionado:", user);
    };

    const handleCheckboxChange = (courseId) => {
        setSelectedCourses((prev) => {
            if (prev.includes(courseId)) {
                return prev.filter((id) => id !== courseId);
            } else {
                return [...prev, courseId];
            }
        });
    };

    const filteredCourses = courses.filter((course) =>
        course.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

   const handleSave = async () => {
    // Validación del nombre
    if (!nombre.trim() || nombre.length < 3 || nombre.length > 50) {
        showAlert("El nombre debe tener entre 3 y 50 caracteres.");
        return;
    }

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.trim() || correo.length < 3 || correo.length > 50) {
        showAlert("El correo debe tener entre 3 y 50 caracteres.");
        return;
    }
    if (!emailRegex.test(correo)) {
        showAlert("El correo no tiene un formato válido.");
        return;
    }

    // Validación de la contraseña (solo si no está vacía)
    if (contrasena.trim() && (contrasena.length < 3 || contrasena.length > 50)) {
        showAlert("La contraseña debe tener entre 3 y 50 caracteres o estar vacía.");
        return;
    }

    // Si todas las validaciones pasan, muestra los datos en la consola
    // console.log({
     //   id: selectedUser.id,
     //   nombre,
     //   correo,
     //   contrasena,
     //   cursos: selectedCourses,
   // });

    const dataToSave = {
        id: selectedUser.id,
        nombre: nombre,
        correo: correo,
        pass: contrasena,
        cursos: selectedCourses, 
    };

    const response = await UsersModel.uploadStudent(dataToSave);

    if (response) {
        showAlert("Usuario actualizado correctamente");
        fetchUsers();
    } else {
        showAlert("Error al actualizar el usuario");
    }

};

const handleSudentDelete = async () => {
        const confirmed = await showConfirm(
            "¿Estas seguro que quieres eliminar el usuario? Se eliminaran permanentemente tanto el como cualquier información suya."
        );

        if(!confirmed){
            showAlert("No se elimiara el usuario, cancelado correctamente.");
            
        }
        else{

            const response = await UsersModel.deleteStudentProfile(selectedUser.id);
            if (response) {
                showAlert("Usuario eliminado con éxito");     
                
                setNombre("");
                setCorreo("");
                setContrasena(''); // No mostramos la contraseña actual
                setSelectedCourses([]); // Cursos actuales del usuario
                setSelectedUser(null); // Reinicia el usuario seleccionado
                fetchUsers();
                
            } else {
                showAlert("Error al eliminar el curso");
            }

        }
        
    };

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Usuarios</h1>
                <p className='class-subtitle-header'>Edita la información de tus usuarios!</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <h2 className='section-header'>Edición de usuarios</h2>
                <h3 className='editCourse-h3'>Selecciona el usuario que quieras editar</h3>
                <div className='options-container'>
                    {/* Dropdown para seleccionar un usuario */}
                    <select
                        onChange={handleUserChange}
                        className="course-dropdown"
                        value={selectedUser ? selectedUser.id : ""}
                    >
                        <option value="">Usuarios</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedUser ? (
                    <div className='user-info-container'>
                        <h3>Editar información del usuario:</h3>
                        <div className='tab-info-container-user'>
                            <div className='input-group'>
                                <label className='edit-input-label' htmlFor="user-name">Nombre:</label>
                                <input
                                    className='edit-input'
                                    id="user-name"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='edit-input-label' htmlFor="user-email">Correo:</label>
                                <input
                                    className='edit-input'
                                    id="user-email"
                                    type="email"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label className='edit-input-label' htmlFor="user-password">Nueva contraseña:</label>
                                <input
                                    className='edit-input'
                                    id="user-password"
                                    type="password"
                                    placeholder="Dejar en blanco para no cambiar"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='input-group'>
                            <label className='edit-input-label'>Selecciona los cursos a los que tendrá acceso:</label>
                            <div className="dropdown-container">
                                <button
                                    type="button"
                                    className="dropdown-toggle course-dropdown"
                                    onClick={toggleDropdown}
                                >
                                    {dropdownOpen ? 'Cursos' : 'Cursos'}
                                </button>
                                {dropdownOpen && (
                                    <div className="dropdown-content scrollable">
                                        <input
                                            type="text"
                                            placeholder="Buscar cursos..."
                                            className="dropdown-search"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        {filteredCourses.map((course) => (
                                            <div key={course.id} className="dropdown-item">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value={course.id}
                                                        checked={selectedCourses.includes(course.id)}
                                                        onChange={() => handleCheckboxChange(course.id)}
                                                    />
                                                    {course.nombre}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='save-cancel-container'>
                            <div className='save-container'>
                                <span>Guardar cambios ---</span>
                                <button className='save-btnn' onClick={handleSave}>
                                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className='cancel-container'>
                            <span>Eliminar ---</span>
                            <button className='delete-btn'  onClick={handleSudentDelete}>
                                <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                        </div>  
                        </div>
                    </div>
                ) : (
                    <div className='no-user-selected'>
                        <p>Selecciona un usuario para ver su información.</p>
                    </div>
                )}
            </div>
        </div>
    );
}