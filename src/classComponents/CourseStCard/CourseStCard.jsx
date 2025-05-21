import './CourseStCard.css';
import { useNavigate } from 'react-router-dom'; 


export default function CourseStCard({ course, aula }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/bridgeto/${aula.nombre}/class/course?id=${course.id}`);
    };

    return (
        <div onClick={handleClick} className="course-card">
            <img src={course.img_url} alt={`${course.nombre}`} className="course-card-image" />
        <div className='course-card-text-container'>
            <h3>{course.nombre}</h3>
            <p>{course.nombre_apartado}</p>
            
        </div>

        <div className='course-card-svg-container-one'>
            <div className='course-card-svg-container'>
                Entrar
            </div>
        </div>
        
        

        </div>
    );
}