import './ConfigPage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfigPage({ aula }) {
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            console.log("islogged", loggedIn);

            if (!loggedIn) {
                // Redirige a la URL base de la clase si no está autenticado
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

        verifyAuth();
    }, [aula, navigate]);

    return (
        <div className='dashboard-option-container'>
            ConfigPage
        </div>
    );
}