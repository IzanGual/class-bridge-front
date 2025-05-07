import './CoursePageEdit.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Importa useSearchParams
import CoursesModel from "../../classModels/CoursesModel";
import GeneralTab from '../../classComponents/CourseEditTabs/GeneralTab.jsx';
import ApartadosTab from '../../classComponents/CourseEditTabs/ApartadosTab.jsx';
import CategoriasTab from '../../classComponents/CourseEditTabs/CategoriasTab.jsx';
import DocsTab from '../../classComponents/CourseEditTabs/DocsTab.jsx';

export default function CoursePageEdit({ aula }) {
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams(); // Hook para obtener parámetros de la URL
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null); // Estado para el curso seleccionado
    const [activeTab, setActiveTab] = useState('general'); // Estado para la pestaña activa


    const handleTabChange = (tab) => {
        setActiveTab(tab); // Cambia la pestaña activa
    };

    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            console.log("islogged", loggedIn);

            if (!loggedIn) {
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        const fecthOwnCourses = async () => {
            try {
                const data = await CoursesModel.getOwnCourses(aula.id); 
                if (data) {
                    setCourses(data); 
                    console.log("Courses:", data);

                    // Detecta el parámetro `id` en la URL
                    const courseId = searchParams.get('id');
                    if (courseId) {
                        const course = data.find((c) => c.id === parseInt(courseId, 10));
                        if (course) {
                            setSelectedCourse(course); // Autoselecciona el curso
                        }
                    }
                } else {
                    console.log("Hubo un error consiguiendo los cursos:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los cursos:", error);
            }
        };

        fecthOwnCourses();
        verifyAuth();
    }, [aula, navigate, searchParams]);

    const handleCourseChange = (event) => {
        const courseId = parseInt(event.target.value, 10); // Convierte el valor a número
        const course = courses.find((c) => c.id === courseId); // Busca el curso por ID
        setSelectedCourse(course);
        console.log("Curso seleccionado:", course);
    };

    const updateCourseUpdatedData = async (preserveSelectedId = null) => {
        try {
            const data = await CoursesModel.getOwnCourses(aula.id); 
            if (data) {
                setCourses(data); 
    
                // Si preserveSelectedId es -1, no seleccionamos ningún curso
                const courseId = preserveSelectedId === -1 ? null : preserveSelectedId || searchParams.get('id');
                if (courseId) {
                    const course = data.find((c) => c.id === parseInt(courseId, 10));
                    if (course) {
                        setSelectedCourse(course);
                    }
                } else {
                    // Si no hay courseId (cuando preserveSelectedId es -1 o no hay id en la URL), deseleccionamos cualquier curso seleccionado
                    setSelectedCourse(null);
                }
            } else {
                console.log("Hubo un error consiguiendo los cursos:", data.error);
            }
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
        }
    };
    

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Cursos</h1>
                <p className='class-subtitle-header'>Crea, elimina y administra tus cursos!</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <h2 className='section-header'>Edición de curso</h2>
                <h3 className='editCourse-h3'>Selecciona el curso que quieras editar</h3>
                <div className='options-container'>
                    
                    {/* Dropdown para seleccionar un curso */}
                    <select 
                        onChange={handleCourseChange} 
                        className="course-dropdown" 
                        value={selectedCourse ? selectedCourse.id : ""}
                    >
                        <option value="">Cursos</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.nombre}
                            </option>
                        ))}
                    </select>
                </div>
        
        <div className='courseEdit-wrapper'>
                <div className='editOptions-container'>
                    <div className='tab-container'>
                    <button
                                className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
                                onClick={() => handleTabChange('general')}
                            >
                                General
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'apartados' ? 'active' : ''}`}
                                onClick={() => handleTabChange('apartados')}
                            >
                                Apartados
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'categorias' ? 'active' : ''}`}
                                onClick={() => handleTabChange('categorias')}
                            >
                                Categorías
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'docs' ? 'active' : ''}`}
                                onClick={() => handleTabChange('docs')}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M12 18V12M9 15H15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                       
                    </div>

                        {activeTab === 'general' && <GeneralTab course={selectedCourse} aula={aula}  onCourseUpdated={(id) => updateCourseUpdatedData(id)}/>}
                        {activeTab === 'apartados' && <ApartadosTab/>}
                        {activeTab === 'categorias' && <CategoriasTab/>}
                        {activeTab === 'docs' && <DocsTab/>}
                    
                    
                </div>

                <div className='vertical-separator'></div>

                <div className='classPreview-container'>

                </div>
        </div>

                
            </div>
        </div>
    );
}