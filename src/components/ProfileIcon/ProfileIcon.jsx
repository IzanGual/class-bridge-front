import { useState } from "react";
import "./ProfileIcon.css";
import { useLogout } from "../../utils/LogOut";
import { useNavigate } from "react-router-dom";

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const logOut = useLogout(); // Llamar dentro del componente
    const navigate = useNavigate();
  return (
    <div className="dropdown">
      <button className="btn btn-light dropdown-toggle" onClick={() => setOpen(!open)}>
        &#128100;
      </button>
      {open && (
        <div className="dropdown-menu show">
          <button className="dropdown-item" onClick={() => navigate('myprofile')}>Perfil</button>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item text-danger" onClick={logOut}>Logout</button>
        </div>
      )}
    </div>
  );
}
