import './CreateTabs.css';
import { useState } from 'react';
import CoursesModel from '../../classModels/CoursesModel';
import UsersModel from '../../models/UsersModel';
import { useAlert } from '../../utils/AlertProvider';

export default function CreateGeneral({ aula, setNewCourseId , newCourseId, handleTabChange}) {
    const [courseUsers, setCourseUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [nombreCurso, setNombreCurso] = useState('');
    const showAlert = useAlert();

    // Obtener usuarios del aula
    const fetchOwnUsers = async () => {
        try {
            const data = await UsersModel.getOwnUsers(aula.id);
            if (data) {
                setUsers(data);
                // console.log("Usuarios del aula:", data);
            } else {
                // console.log("Error al obtener los usuarios del aula:", data.error);
            }
        } catch (error) {
            console.error("Error al obtener los usuarios del aula:", error);
        }
    };

    // Cargar usuarios al montar el componente
    useState(() => {
        fetchOwnUsers();
    }, [aula.id]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file ? file : null); // Guarda el archivo seleccionado
    };

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
            return;
        }

        if (nombreCurso.length > 100) {
            showAlert("El nombre del curso no puede tener más de 100 caracteres.");
            return;
        }

        //const dataToSave = {
        //    courseName: nombreCurso,
        //    selectedFile: selectedFile || null,
        //    selectedUsers: courseUsers,
        //};

        // console.log('Datos a guardar:', dataToSave);

        try {
            const response = await CoursesModel.createCourse({
                name: nombreCurso,
                img: selectedFile,
                users: courseUsers,
                aulaId: aula.id,
            });

            if (!response) {
                showAlert("Error al crear el curso");
                
            } else {
                showAlert("Curso creado correctamente");
                
                    setNewCourseId(response); 
                    setCourseUsers([]);
                    setNombreCurso("");
                    setSelectedFile(null);
                    handleTabChange('apartados');
                
            }
        } catch (error) {
            console.error("Error al crear el curso:", error);
            showAlert("Ocurrió un error al intentar crear el curso.");
        }
    };

    return (
        <div className='tab-info-container'>
            <label className='edit-input-label' htmlFor="course-name-edit">Nombre del curso:</label>
            <input
                disabled={newCourseId}
                id='course-name-edit'
                type="text"
                className='edit-input'
                placeholder='Nombre del curso'
                value={nombreCurso}
                onChange={(e) => setNombreCurso(e.target.value)}
            />

            <label className='edit-input-label' htmlFor="course-img-edit">Portada del curso:</label>
            <div className='portada-container'>
                <img
                    className='portada-img-edit'
                    src={
                        selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : '/assets/images/default-banner.png'
                    }
                    alt="Portada del curso"
                />
            </div>
            <div className='crud-Courseimg-container-create'>
                <input
                    disabled={newCourseId}
                    id='course-img-edit'
                    type="file"
                    className='file-input-hidden'
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <button
                    disabled={newCourseId}
                    type="button"
                    className='file-upload-btn'
                    onClick={() => document.getElementById('course-img-edit').click()}
                >
                    <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z" strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <span className='file-selected-text' id='noMargin'>
                    {selectedFile ? `Imagen: ${selectedFile.name}` : 'Ningún archivo seleccionado'}
                </span>
            </div>

            <label className='edit-input-label'>Selecciona los usuarios que tendrán acceso a este curso:</label>
            <div className="dropdown-container">
                <button
                    disabled={newCourseId}
                    type="button"
                    className="dropdown-toggle course-dropdown"
                    onClick={toggleDropdown}
                >
                    {dropdownOpen ? 'Usuarios' : 'Usuarios'}
                </button>
                {dropdownOpen && (
                    <div className="dropdown-content scrollable">
                        <input
                            disabled={newCourseId}
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
                                        checked={courseUsers.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                    />
                                    {user.nombre}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>


                <div className='save-container' id='margin-top'>

                    <span>Crear curso ---</span>
                    <button className='save-btnn' onClick={handleSave} disabled={newCourseId}>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                        
                </div>
            <span className='info'>Si no seleccionas ninguna portada se colocará una por defecto.</span>

        </div>
    );
}