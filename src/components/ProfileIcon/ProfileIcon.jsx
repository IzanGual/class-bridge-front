import { useState } from "react";
import "./ProfileIcon.css";
import { useLogout } from "../../utils/LogOut";
import { useNavigate } from "react-router-dom";

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const logOut = useLogout(); // Llamar dentro del componente
    const navigate = useNavigate();
  return (
    <div className="profile-icon-comntainer" onClick={() => navigate('myprofile')}> 
            <img id="text-logo" src="/assets/images/profile-icon.png" alt="" />
    </div>
  );
}
