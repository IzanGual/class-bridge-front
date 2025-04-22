import './DashboardPage.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage({ aula}) {
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
        <div className='page-container'>
            <h1>DashboardPage</h1>
        </div>
    );
}