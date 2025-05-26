import './ConfigPage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePage from '../../pages/ProfilePage/ProfilePage.jsx';
import AulaEdit from '../../classComponents/AulaEdit/AulaEdit.jsx';

export default function ConfigPage({ aula }) {
    const navigate = useNavigate(); 
    const [activeTab, setActiveTab] = useState('perfil'); // Estado para la pestaña activa

    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            // console.log("islogged", loggedIn);

            if (!loggedIn) {
                
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        verifyAuth();
    }, [aula, navigate]);

    const handleTabChange = (tab) => {
        setActiveTab(tab); // Cambia la pestaña activa
    };

    return (
        <div className='dashboard-option-container'>
            <div className='class-header-container'>
                <h1 className='class-title-header'>Configuración</h1>
            </div>
            
                    <div className='tab-container-config'>
                    <button
                                className={`tab-button tab-config-btn ${activeTab === 'perfil' ? 'active' : ''}`}
                                onClick={() => handleTabChange('perfil')}
                            >
                                Perfil
                            </button>
                            <button
                                className={`tab-button tab-config-btn ${activeTab === 'aula' ? 'active' : ''}`}
                                onClick={() => handleTabChange('aula')}
                            >
                                Aula
                            </button>
                       
                    </div>

            <div className='class-horizontal-separator'></div>
                    <div>
                        {activeTab === 'perfil' && <ProfilePage/>}
                        {activeTab === 'aula' && <AulaEdit aula={aula}/>}
                    
                    
                    </div>
           
            
        </div>
    );
}