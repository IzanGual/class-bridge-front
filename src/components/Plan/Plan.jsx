import './Plan.css';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../../utils/auth.js';
import { getUserRole } from '../../utils/auth'; // Asegúrate de tener esta función
export default function Plan({ fullPlan }) {
  const navigate = useNavigate();

  const handleSeleccionarPlan = async () => {
    const loggedIn = await checkAuthStatus();
    if (!loggedIn) {
      navigate('/register?loc=plan');
    } 
    else {
        const role = getUserRole(); // Obtén el rol del usuario
        if (role === "teacher") {
            console.log("El usuario es profesor");
            console.log(`Plan seleccionado: ${fullPlan.id} pero no puede voler a contrratar nada` );
          }else{
            navigate(`/planSelection?planId=${fullPlan.id}`);

          }
     
    }
  };

  return (
    <div className="plan-card">
      <h4 className="plan-title">{fullPlan.nombre}</h4>
      <p className="plan-price">Precio: {fullPlan.precio}€</p>
      <ul className="plan-benefits">
        {fullPlan.beneficios.split(';').map((beneficio, index) => (
          <li key={index}>
            <span className="check">✓</span> {beneficio.trim()}
          </li>
        ))}
      </ul>
      <button className="btn-seleccionar" onClick={handleSeleccionarPlan}>
        Seleccionar Plan
      </button>
    </div>
  );
}
