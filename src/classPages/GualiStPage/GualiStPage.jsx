import { checkStudentAuthStatus } from '../../utils/auth.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Guali from '../../classComponents/Guali/Guali.jsx';

export default function GualiStPage({ aula }) {
    const navigate = useNavigate(); 

    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkStudentAuthStatus(aula.id);
            // console.log("islogged", loggedIn);

            if (!loggedIn) {
                
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        verifyAuth();
    }, [aula, navigate]);

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>
                    Chatea con <span className="guali-highlight">guali</span> 
                    <svg id='buble' width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16666 45.8332V8.33317C4.16666 7.18734 4.57464 6.20643 5.39061 5.39046C6.20659 4.57449 7.18749 4.1665 8.33332 4.1665H41.6667C42.8125 4.1665 43.7934 4.57449 44.6094 5.39046C45.4253 6.20643 45.8333 7.18734 45.8333 8.33317V33.3332C45.8333 34.479 45.4253 35.4599 44.6094 36.2759C43.7934 37.0919 42.8125 37.4998 41.6667 37.4998H12.5L4.16666 45.8332Z" fill="#1D1B20"/>
                    </svg>
                </h1>
                <p className='class-subtitle-header'>Preguntale cualquier cosa, desde ideas para crear nuevas tareas a pedirle recursos para tus alumnos.</p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <div className='stuff-container'>
                    <Guali/>
                </div>
            </div>
            
        </div>
    );
}