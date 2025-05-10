import './HomePage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TasksModel from "../../classModels/TasksModel";
import UsersModel from "../../models/UsersModel"; 
import CoursesModel from "../../classModels/CoursesModel";
import ClassUnDoneTask from '../../classComponents/ClassUnDoneTask/ClassUnDoneTask'; // Importa el componente
import MiniUserCard from '../../classComponents/MiniUserCard/MiniUserCard.jsx';
import CourseCard from '../../classComponents/CourseCard/CourseCard.jsx';
import ClassFooter from '../../classComponents/ClassFooter/ClassFooter.jsx';


export default function HomePage({ aula }) {
    const navigate = useNavigate(); 
        const [tasks, setTasks] = useState([]); 
        const [users, setUsers] = useState([]);
        const [courses, setCourses] = useState([]);
    
        useEffect(() => {
            const verifyAuth = async () => {
                const loggedIn = await checkTeacherAuthStatus(aula.id);
                console.log("islogged", loggedIn);
    
                if (!loggedIn) {
                    
                    navigate(`/bridgeto/${aula.nombre}`);
                }
            };
    
            const fecthUnDoneTasks = async () => {
                try {
                    const data = await TasksModel.getUnDoneTasks(); 
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

            const fecthOwnUsers = async () => {
                try {
                    const data = await UsersModel.getOwnUsers(aula.id); 
                    if (data) {
                        setUsers(data); 
                        console.log("Users:", data);
                    }else{
                        console.log("Huvo un error cosiguiendo los usuarios:", data.error);
                    }
                    
                  } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
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
            
            verifyAuth();

            fecthUnDoneTasks();
            fecthOwnUsers();
            fecthOwnCourses();
            
        }, [aula, navigate]);

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Bienvenido a tu aula: {aula.nombre} !!</h1>
                <p className='class-subtitle-header'>Aquí puedes gestionar tu aula y acceder a todas las funcionalidades.</p>
            </div>

            <div className='class-horizontal-mini-separator'></div>
            <div className='section-container'>
                <div className='stuff-container'>
                    {tasks.length > 0 ? (
                        tasks.slice(0, 4).map((task) => (
                            <ClassUnDoneTask key={task.id} task={task} aula={aula} />
                        ))
                    ) : (
                        <p id='noTasks'>Sin tareas para corregir !!</p>
                    )}
                </div>
            </div>
            <div id='less-margin' className='class-horizontal-mini-separator'></div>

            <div className='section-container'>
                <h2 className='section-header'>Tus usuarios</h2>
                <div className='stuff-container'>
                    {users.slice(0, 5).map((user) => (
                        <MiniUserCard key={user.id} user={user} aula={aula} />
                    ))}
                </div>
            </div>
            <div className='section-container'>
                <h2 className='section-header'>Tus Cursos</h2>
            </div>
            <div className='stuff-container'>
                    {courses.slice(0, 4).map((course) => (
                        <CourseCard key={course.id} course={course} aula={aula} />
                    ))}
            </div>

            <ClassFooter></ClassFooter>
        </div>
    );
}