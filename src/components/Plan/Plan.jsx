import './Plan.css';
import { useNavigate } from 'react-router-dom';
import {checkAuthStatus} from '../../utils/auth.js'
export default function Plan({ fullPlan }) {

  const navigate = useNavigate();

  const handleSeleccionarPlan = () => {
      const verifyAuth = async () => {
          const loggedIn = await checkAuthStatus();
          return loggedIn
      };
    if (!verifyAuth()) {
      navigate('/register?loc=plan'); 
    } else {

      console.log(`Plan seleccionado: ${fullPlan.id}`);
      navigate(`/planSelection?planId=${fullPlan.id}`);
      
    }
  };

  return (
    <div className="plan-card">
      <h3>{fullPlan.nombre}</h3>
      <p><strong>Precio:</strong> ${fullPlan.precio}</p>
      <p>{fullPlan.descripcion}</p>
      <p>{fullPlan.beneficios}</p>
      <button className="btn-seleccionar" onClick={handleSeleccionarPlan}>
        Seleccionar Plan
      </button>
    </div>
  );
}
