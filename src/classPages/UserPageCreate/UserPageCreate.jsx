import './UserPageCreate.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesModel from '../../classModels/CoursesModel';
import { useAlert } from '../../utils/AlertProvider'; // Importamos el hook para usar el sistema de alertas
import UsersModel from '../../models/UsersModel.js';

export default function UserPageCreate({ aula }) {
    const navigate = useNavigate();
    const showAlert = useAlert(); // Hook para mostrar alertas
    const [nombreAlumno, setNombreAlumno] = useState('');
    const [correoAlumno, setCorreoAlumno] = useState('');
    const [contrasenaAlumno, setContrasenaAlumno] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);


    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            console.log("islogged", loggedIn);

            if (!loggedIn) {
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        verifyAuth();
    }, [aula, navigate]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await CoursesModel.getOwnCourses(aula.id);
                if (data) {
                    setCourses(data);
                    console.log("Cursos disponibles:", data);
                } else {
                    console.log("Error al obtener los cursos:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        fetchCourses();
    }, [aula.id]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
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

    const validateInputs = () => {
        // Validación del nombre
        if (!nombreAlumno.trim()) {
            showAlert("El nombre es requerido.");
            return false;
        }
        if (nombreAlumno.length < 3 || nombreAlumno.length > 50) {
            showAlert("El nombre debe tener entre 3 y 50 caracteres.");
            return false;
        }

        // Validación del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoAlumno.trim()) {
            showAlert("El correo es requerido.");
            return false;
        }
        if (!emailRegex.test(correoAlumno)) {
            showAlert("El correo no tiene un formato válido.");
            return false;
        }

        // Validación de la contraseña
        if (!contrasenaAlumno.trim()) {
            showAlert("La contraseña es requerida.");
            return false;
        }
        if (contrasenaAlumno.length < 3 || contrasenaAlumno.length > 50) {
            showAlert("La contraseña debe tener entre 3 y 50 caracteres.");
            return false;
        }

        return true; // Si pasa todas las validaciones
    };

    const handleSave = async () => {
        if (validateInputs()) {
            console.log({
                nombre: nombreAlumno,
                correo: correoAlumno,
                contrasena: contrasenaAlumno,
                cursos: selectedCourses,
            });
            try {
            const response = await UsersModel.registerStudent(nombreAlumno, correoAlumno, contrasenaAlumno, selectedCourses, aula.id);

            switch(response){
                case "insertCorrect":
                    showAlert('Usuario registrado con éxito');
                    setNombreAlumno("");
                    setCorreoAlumno("");
                    setContrasenaAlumno("");
                    setDropdownOpen(false)
                    setSearchTerm("");
                    setSelectedCourses([]);
    
                    break;
                case "emailDup":
                    showAlert('El email ya está registrado');
                    break;
                case "insertError":
                    showAlert('Error al registrar el usuario');
                    break;
                default:
                    showAlert('Error al registrar el usuario por defecto');
                    break;
            }

        } catch (error) {
            console.error(`Error: ${error.message}`);
        }

        }
    };

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Usuarios</h1>
                <p className='class-subtitle-header'>Crea, elimina y administra tus usuarios!</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <h2 className='section-header'>Creación de nuevos usuarios / alumnos</h2>

                <div className='tab-info-container-user'>
                    <div className='input-group'>
                        <label className='edit-input-label' htmlFor="user-name">Nombre del alumno:</label>
                        <input
                            id='user-name'
                            type="text"
                            className='edit-input'
                            placeholder='Nombre del alumno'
                            value={nombreAlumno}
                            onChange={(e) => setNombreAlumno(e.target.value)}
                        />
                    </div>

                    <div className='input-group'>
                        <label className='edit-input-label' htmlFor="user-email">Correo electrónico:</label>
                        <input
                            id='user-email'
                            type="email"
                            className='edit-input'
                            placeholder='Correo electrónico del alumno'
                            value={correoAlumno}
                            onChange={(e) => setCorreoAlumno(e.target.value)}
                        />
                    </div>

                    <div className='input-group'>
                        <label className='edit-input-label' htmlFor="user-password">Contraseña:</label>
                        <input
                            id='user-password'
                            type="password"
                            className='edit-input'
                            placeholder='Contraseña del alumno'
                            value={contrasenaAlumno}
                            onChange={(e) => setContrasenaAlumno(e.target.value)}
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

                <div className='save-container' id='margin-top'>

                    <span>Guardar usuario ---</span>
                    <button className='save-btnn' onClick={handleSave}>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                        
                </div>
                <span className='info'>
                    Para crear nuevos alumnos deberas introducir su <strong>nombre</strong>, <strong>contraseña</strong> y su <strong>correo</strong> (La contraseña la elije el profesor, puede ser algo sencillo como 1234). Luego dicho usuario podrá iniciar sesión en tu aula utilizado dicho <strong>correo</strong> y <strong>contraseña</strong>. Seguidamente el mismo podrá editar esa misma información y añadir una foto de perfil en cualquier momento desde su perfil.
                </span>
            </div>
        </div>
    );
}