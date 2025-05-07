import './Tabs.css';
import { useEffect, useState } from 'react';
import CoursesModel from '../../classModels/CoursesModel';
import UsersModel from '../../models/UsersModel';
import { useAlert } from '../../utils/AlertProvider';
import { useConfirm } from '../../utils/ConfirmProvider'; // Importar el hook useConfirm

export default function GeneralTab({ course, aula, onCourseUpdated }) {
    const [courseUsers, setCourseUsers] = useState([]); 
    const [users, setUsers] = useState([]); 
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [nombreCurso, setNombreCurso] = useState('');
    const showAlert = useAlert();
    const showConfirm = useConfirm(); 

    useEffect(() => {
        if (course?.nombre) {
            setNombreCurso(course.nombre);
        } else {
            setNombreCurso("...");
        }
    }, [course]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file ? file : null); // Guarda el nombre del archivo seleccionado
    };

    useEffect(() => {
        const fetchUsersByCourseId = async () => {
            if (!course?.id) return;
            try {
                const data = await CoursesModel.getUsersByCourseId(course.id);
                if (data) {
                    setCourseUsers(data.map((user) => user.id));
                    console.log("Usuarios del curso:", data);
                } else {
                    console.log("Este curso au no tiene usuarios:")
                    setCourseUsers([]);
                }
            } catch (error) {
                console.error("Error al obtener los usuarios del curso:", error);
            }
        };

        const fetchOwnUsers = async () => {
            try {
                const data = await UsersModel.getOwnUsers(aula.id);
                if (data) {
                    setUsers(data);
                    console.log("Usuarios del aula:", data);
                } else {
                    console.log("Error al obtener los usuarios del aula:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los usuarios del aula:", error);
            }
        };

        fetchUsersByCourseId();
        fetchOwnUsers();
    }, [course?.id, aula.id]);

    useEffect(() => {
            setDropdownOpen(false)
    }, [course]);


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleCheckboxChange = (userId) => {
        setCourseUsers((prev) => {
            if (prev.includes(userId)) {
                // Si ya está seleccionado, lo deselecciona
                return prev.filter((id) => id !== userId);
            } else {
                // Si no está seleccionado, lo agrega
                return [...prev, userId];
            }
        });
    };

    const filteredUsers = users.filter((user) =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const handleSave = async () => {
        if (nombreCurso.length < 3) {
            showAlert("El nombre del curso debe tener al menos 3 caracteres.");
            return; // Detener la ejecución si la validación falla
        }

        if (nombreCurso.length > 20) {
            showAlert("El nombre del curso no puede tener más de 20 caracteres.");
            return; // Detener la ejecución si la validación falla
        }
        const dataToSave = {
            courseName: nombreCurso, 
            selectedFile: selectedFile || 'noFile', 
            selectedUsers: courseUsers || 'noUsers', 
        };
    
        console.log('Datos guardados:', dataToSave);

        const response = await CoursesModel.uploadCourse(course.id, dataToSave);
            if (response) {
                showAlert("Curso actualizado correctamente");
                if (onCourseUpdated) {
                    onCourseUpdated(course.id); // Esto forzará la recarga en el padre
                }
                
            } else {
                showAlert("Error al actualizar el curso");
            }
    };

    const handleBannerDelete = async () => {
        const confirmed = await showConfirm(
            "¿Estas seguro que quieres eliminar el banner del curso? Se sustituira por uno predeterminado."
        );

        if(!confirmed){
            showAlert("No se elimiara el banner.");
        }
        else{

            const response = await CoursesModel.deleteCourseBanner(course.id);
            if (response) {
                showAlert("Imagen eliminada correctamente");
                if (onCourseUpdated) {
                    onCourseUpdated(course.id); // Esto forzará la recarga en el padre
                }
                
            } else {
                showAlert("Error al eliminar la imagen");
            }

        }
        
    };

    const handleCourseDelete = async () => {
        const confirmed = await showConfirm(
            "¿Estas seguro que quieres eliminar el curso? Se eliminaran permanentemente tanto el curso como cualquier apartado, archio, tarea relacionada a el."
        );

        if(!confirmed){
            showAlert("No se elimiara el curso, cancelado correctamente.");
            
        }
        else{

            const response = await CoursesModel.deleteCourse(course.id);
            if (response) {
                showAlert("Curso eliminado con éxito");     
                onCourseUpdated(-1); // Esto seleccionara Cursos en el dropdown
                
            } else {
                showAlert("Error al eliminar el curso");
            }

        }
        
    };

    


    return (
        <div className='tab-info-container'>
            <label className='edit-input-label' htmlFor="course-name-edit">Nombre del curso:</label>
            <input
                id='course-name-edit'
                type="text"
                className='edit-input'
                placeholder='Nombre del curso'
                value={nombreCurso}
                onChange={(e) => setNombreCurso(e.target.value)}
                disabled={!course}
            />

            <label className='edit-input-label' htmlFor="course-img-edit">Portada del curso:</label>
            <div className='portada-container'>
            <img
                className='portada-img-edit'
                src={
                    course 
                    ? `${course.img_url}?${new Date().getTime()}`
                    : '/assets/images/default-banner.png'
                }
                alt="Portada del curso"
            />
            </div>
            <div className='crud-Courseimg-container'>
            {/* Input de archivo oculto */}
            <input
                    id='course-img-edit'
                    type="file"
                    className='file-input-hidden'
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={!course}
                />
                {/* Botón personalizado */}
                <button
                    type="button"
                    className='file-upload-btn'
                    onClick={() => document.getElementById('course-img-edit').click()}
                    disabled={!course}
                >
                    <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z"  strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>


                </button>
                {/* Texto que muestra el estado del archivo */}
                
            <button className='delete-btn' disabled={!course} onClick={handleBannerDelete}>
            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>
            
            </div>
            <span className='file-selected-text'>
                    {selectedFile ? `Imagen: ${selectedFile.name}` : 'Ningún archivo seleccionado'}
                </span>
            

            <label className='edit-input-label'>Selecciona los usuarios que tendrán acceso a este curso:</label>
            <div className="dropdown-container">
                <button
                    type="button"
                    className="dropdown-toggle course-dropdown"
                    onClick={toggleDropdown}
                    disabled={!course}
                >
                    {dropdownOpen ? 'Usuarios' : 'Usuarios'}
                </button>
                {dropdownOpen && (
                    <div className="dropdown-content scrollable">
                        <input
                            type="text"
                            placeholder="Buscar usuarios..."
                            className="dropdown-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="dropdown-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        value={user.id}
                                        checked={courseUsers.includes(user.id)} // Marca los usuarios seleccionados
                                        onChange={() => handleCheckboxChange(user.id)}
                                    />
                                    {user.nombre}
                                </label>
                            </div>
                        ))}
                    </div>
                    
                )}
                
            </div>
            <div className='save-cancel-container'>
                <div className='save-container'>

                    <span>Guardar cambios ---</span>
                    <button className='save-btnn' disabled={!course} onClick={handleSave}>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                        
                </div>

                <div className='cancel-container'>

                    <span>Eliminar ---</span>
                    <button className='delete-btn' disabled={!course} onClick={handleCourseDelete}>
                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                </div>  
            </div>
        </div>
    );
}