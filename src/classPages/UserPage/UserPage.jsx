import './UserPage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassFooter from '../../classComponents/ClassFooter/ClassFooter.jsx';

export default function UserPage({ aula }) {
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
                <h1 className='class-title-header'>Bienvenido UserPage</h1>
                <p className='class-subtitle-header'>Aquí puedes gestionar tu aula y acceder a todas las funcionalidades.</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <h2 className='section-header'>Tus usuarios</h2>
                <div className='stuff-container'>
                    will be stuff here
                </div>
            </div>
            <div className='section-container'>
                <h2 className='section-header'>Tus Cursos</h2>
            </div>
            <div className='stuff-container'>
                    will be stuff here
            </div>
            <ClassFooter></ClassFooter>
        </div>
    );
}