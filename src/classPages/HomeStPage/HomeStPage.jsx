import './HomeStPage.css';
import { checkStudentAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TasksModel from "../../classModels/TasksModel";
import CoursesModel from "../../classModels/CoursesModel";
import ClassUnDeliveredTask from '../../classComponents/ClassUnDeliveredTask/ClassUnDeliveredTask'; // Importa el componente
import CourseCard from '../../classComponents/CourseCard/CourseCard.jsx';
import { getUserId } from '../../utils/GetUserId';



export default function HomeStPage({ aula }) {
    const navigate = useNavigate(); 
        const [tasks, setTasks] = useState([]); 
        const [courses, setCourses] = useState([]);
        const alumno_id = getUserId(); // Obtener el ID del alumno desde el localStorage
    
        useEffect(() => {
            const verifyAuth = async () => {
                const loggedIn = await checkStudentAuthStatus(aula.id);
                console.log("islogged", loggedIn);
    
                if (!loggedIn) {
                    
                    navigate(`/bridgeto/${aula.nombre}`);
                }
            };
    
            const fecthUnDoneTasks = async () => {
                try {
                    const data = await TasksModel.getUnDeliveredTasks(aula.id, alumno_id); 
                    if (data) {
                        setTasks(data); 
                        console.log("Tasks sin corregir:", data);
                        //console.log("Tasks sin corregir de TASKS:", tasks);
                    }else{
                        console.log("Huvo un error cosiguiendo las tareas:", data.error);

                    }
                    
                  } catch (error) {
                    console.error("Error al obtener las tareas sin corregir:", error);
                  }
            };



            const fecthOwnCourses = async () => {
                try {
                    const data = await CoursesModel.getStudentCourses(aula.id, alumno_id); 
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
            
            verifyAuth();

            fecthUnDoneTasks();
            fecthOwnCourses();
            
        }, [aula, navigate, alumno_id]);

        const userName = localStorage.getItem('userName');
                        


    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Holaaa {userName}!!</h1>
                <p className='class-subtitle-header'>Bienvenido a {aula.nombre}, etregale las tareas a tu profe antes de que se enfade !</p>
            </div>
            
            <h2 id='mar-top' className='section-header'>Tareas por entregar</h2>
            <div className='class-horizontal-mini-separator'></div>
            <div className='section-container'>
                
                <div className='stuff-container'>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <ClassUnDeliveredTask key={task.id} task={task} aula={aula} />
                        ))
                    ) : (
                        <p className='noTAny'
                        >Sin tareas por entregar !!</p>
                    )}
                </div>
            </div>
            <div id='less-margin' className='class-horizontal-mini-separator'></div>

            <div className='section-container'>
                <h2 className='section-header'>Tus Cursos</h2>
            </div>
            <div className='course-card-container'>
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <CourseCard key={course.id} course={course} aula={aula} />
                        ))
                    ) : (
                        <p className='noTAny'>Tu profe no te ha asignado ningu curso :(</p>
                    )}
            </div>

            
        </div>
    );
}