import { useSearchParams, useNavigate } from "react-router-dom";
import './OrderCompleted.css';

export default function OrderCompleted() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // Hook para redirigir
    const classroomName = searchParams.get("classroomName"); // Obtiene el parámetro de la URL
    const classLink = `/bridgeto/${classroomName}`; // Suponiendo que el aula tiene un dashboard

    const handleTutorialRedirect = () => {
        navigate('/tutorial'); // Redirige a /tutorial
    };

    return (
        <div  className='landing-option-container mg-top'>
            <h1 id='order-completed-message'>SERVICIO CONTRATADO CON ÉXITO</h1>

            <p className='question'>¿Y ahora qué?</p>

            <p className='normal-text'>
                Puedes acceder al panel administrativo de tu aula iniciando sesión con tu usuario de class-bridge desde el siguiente enlace:   
                <a href={classLink}> {classroomName}</a>
            </p>

            <p className='normal-text'>
                Desde allí podrás empezar a utilizar class-bridge creando tus primeros alumnos y tus primeros cursos.
            </p>

            <p className='question'>¿Cómo funciona?</p>

            <button className='black-btn' onClick={handleTutorialRedirect}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3">
                    <path d="M424-320q0-81 14.5-116.5T500-514q41-36 62.5-62.5T584-637q0-41-27.5-68T480-732q-51 0-77.5 31T365-638l-103-44q21-64 77-111t141-47q105 0 161.5 58.5T698-641q0 50-21.5 85.5T609-475q-49 47-59.5 71.5T539-320H424Zm56 240q-33 0-56.5-23.5T400-160q0-33 23.5-56.5T480-240q33 0 56.5 23.5T560-160q0 33-23.5 56.5T480-80Z"/>
                </svg>
            </button>
        </div>
    );
}