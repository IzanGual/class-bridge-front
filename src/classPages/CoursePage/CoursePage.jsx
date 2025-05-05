import './CoursePage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesModel from "../../classModels/CoursesModel";
import CourseCard from '../../classComponents/CourseCard/CourseCard.jsx';

export default function CoursePage({ aula }) {
    const navigate = useNavigate(); 
    const [courses, setCourses] = useState([]);

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
                }else{
                    console.log("Huvo un error cosiguiendo los cursos:", data.error);
                }
                
              } catch (error) {
                console.error("Error al obtener los curspos:", error);
              }
        };

        fecthOwnCourses();
        verifyAuth();
    }, [aula, navigate]);

    const handleGoToEdit = () => {
        navigate(`/bridgeto/${aula.nombre}/dashboard/courses/edit`);
    }

    const handleGoToCreate = () => {
        navigate(`/bridgeto/${aula.nombre}/dashboard/courses/create`);

    }

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Cursos</h1>
                <p className='class-subtitle-header'>Crea, elimina y administra  tus cursos !</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <h2 className='section-header'>Todos tus cursos</h2>
                <div className='options-container'>
                    <div className='option-container'>
                        <p>Crear un nuevo curso </p>
                        <svg onClick={handleGoToCreate} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 10.6667V21.3334M10.6667 16.0001H21.3333M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63621 29.3334 2.66667 23.3639 2.66667 16.0001C2.66667 8.63628 8.63621 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </div>
                    <div className='option-container'>
                        <p>Edita un curso existente</p>
                        <div className='svg-container'>
                            <svg onClick={handleGoToEdit} width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z"  fill="none" stroke="#8BDD6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        
                    </div>
                </div>
                <div className='stuff-container'>
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} aula={aula} />
                    ))}
                </div>
            </div>
            
        </div>
    );
}