import "./ProfileIcon.css";
import { useNavigate } from "react-router-dom";

export default function ProfileIcon() {
    const navigate = useNavigate();
  return (
    <div className="profile-icon-comntainer" onClick={() => navigate('myprofile')}> 
            <img id="text-logo" src="/assets/images/profile-icon.png" alt="" />
    </div>
  );
}
