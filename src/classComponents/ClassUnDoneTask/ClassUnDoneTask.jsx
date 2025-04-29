import React from 'react';
import './ClassUnDoneTask.css';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate


export default function ClassUnDoneTask({ task, aula }) {

    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const handleClick = () => {
        // Redirige a la URL deseada con el ID de la tarea, alli aun no se cotrola
        navigate(`/bridgeto/${aula.nombre}/dashboard/tasks?id=${task.id}`);
    };
    return (
        <div onClick={handleClick} className="class-undone-task">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3333 6.66664H6.66667C5.78261 6.66664 4.93477 7.01783 4.30964 7.64295C3.68452 8.26807 3.33333 9.11592 3.33333 9.99997V33.3333C3.33333 34.2174 3.68452 35.0652 4.30964 35.6903C4.93477 36.3154 5.78261 36.6666 6.66667 36.6666H30C30.8841 36.6666 31.7319 36.3154 32.357 35.6903C32.9821 35.0652 33.3333 34.2174 33.3333 33.3333V21.6666M30.8333 4.16664C31.4964 3.5036 32.3957 3.1311 33.3333 3.1311C34.271 3.1311 35.1703 3.5036 35.8333 4.16664C36.4964 4.82968 36.8689 5.72896 36.8689 6.66664C36.8689 7.60432 36.4964 8.5036 35.8333 9.16664L20 25L13.3333 26.6666L15 20L30.8333 4.16664Z" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        <div className='undone-task-text-container'>
            <h3>{task.nombre}</h3>
            <div className='subheader-action-container'>
                <span>{task.fecha_limite}</span>
                <div className='svg-correct-container'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8_46)">
                    <path d="M18.3333 1.66663L9.16666 10.8333M18.3333 1.66663L12.5 18.3333L9.16666 10.8333M18.3333 1.66663L1.66666 7.49996L9.16666 10.8333" stroke="#8BDD6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_8_46">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

                </div>
            </div>
            
        </div>
            
        </div>
    );
}