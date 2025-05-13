import './EntregaCard.css';
import { useNavigate } from 'react-router-dom';

export default function EntregaCard({ entrega, aula }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/bridgeto/${aula.nombre}/dashboard/tasks/correct?id=${entrega.id}`);
    };

    // Calcular la diferencia de días entre la fecha de entrega y la fecha límite
    const fechaEntrega = entrega.fecha_entrega ? new Date(entrega.fecha_entrega) : null;
    const fechaLimite = new Date(entrega.fecha_limite_tarea);
    const diferenciaDias = fechaEntrega
        ? Math.ceil((fechaEntrega - fechaLimite) / (1000 * 60 * 60 * 24)) // Diferencia en días
        : null;

    // Determinar el color del SVG según si se entregó antes o después de la fecha límite
    const fechaSvgColor = diferenciaDias !== null && diferenciaDias <= 0 ? '#56D02A' : '#FF0000'; // Verde si antes o el día límite, rojo si después
    const estadoSvgColor = entrega.estado_correccion === 'corregida' ? '#56D02A' : '#FF0000'; // Verde si corregida, rojo si no corregida

    return (
        <div onClick={handleClick} className="entrega-card">
            <div className="entrega-info">
                <h3 className="entrega-id">Entrega de la tarea: {entrega.nombre_tarea}</h3>
                <p className="entrega-alumno">Realizada por el/la alumno/a: <strong>{entrega.nombre_alumno}</strong></p>
                <div className="entrega-fecha-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke={fechaSvgColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                    <p className="entrega-fecha">
                        {fechaEntrega === null
                            ? 'No entregada'
                            : diferenciaDias === 0
                            ? 'Entregada el día límite'
                            : diferenciaDias > 0
                            ? `Entregada ${diferenciaDias} días después`
                            : `Entregada ${Math.abs(diferenciaDias)} días antes`}
                    </p>
                </div>
                       
                <div className="entrega-fecha-container">  
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8_46)">
                <path d="M18.3333 1.66663L9.16666 10.8333M18.3333 1.66663L12.5 18.3333L9.16666 10.8333M18.3333 1.66663L1.66666 7.49996L9.16666 10.8333" stroke={estadoSvgColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_8_46">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
                </svg>

                <p>
                    {entrega.estado_correccion}
                </p>
                </div>   
            </div>

            <div className="entrega-icono">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                        
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}