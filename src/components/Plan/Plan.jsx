import './Plan.css';
import { useNavigate } from 'react-router-dom';

export default function Plan({ fullPlan }) {
  const navigate = useNavigate();

  const handleSeleccionarPlan = () => {
    const usuario = false; // Aquí debes obtener el usuario de la sesión y validar si existe
    if (!usuario) {
      navigate('/register?loc=plan'); // Redirigir al login si no hay sesión
    } else {
      console.log(`Plan seleccionado: ${fullPlan.nombre}`);
      // Aquí puedes manejar la lógica para asignar el plan al usuario
    }
  };

  return (
    <div className="plan-card">
      <h3>{fullPlan.nombre}</h3>
      <p><strong>Precio:</strong> ${fullPlan.precio}</p>
      <p>{fullPlan.descripcion}</p>
      <p>{fullPlan.beneficio}</p>
      <button className="btn-seleccionar" onClick={handleSeleccionarPlan}>
        Seleccionar Plan
      </button>
    </div>
  );
}
