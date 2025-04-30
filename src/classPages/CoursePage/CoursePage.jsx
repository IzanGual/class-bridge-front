import './CoursePage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoursePage({ aula }) {
    const navigate = useNavigate(); 

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
                        <p>Crear un nuevo curso SVG</p>
                    </div>
                    <div className='option-container'>
                        <p>Edita un curso existente SVG</p>
                    </div>
                </div>
                <div className='stuff-container'>
                    will be stuff here
                </div>
            </div>
            
        </div>
    );
}