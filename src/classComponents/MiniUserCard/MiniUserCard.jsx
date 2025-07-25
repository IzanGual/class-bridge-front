import React from 'react';
import './MiniUserCard.css';
import { useNavigate } from 'react-router-dom'; 


export default function MiniUserCard({ user, aula }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/bridgeto/${aula.nombre}/dashboard/users/edit?id=${user.id}`);
    };

    return (
        <div onClick={handleClick} className="mini-user-card">
            <img src={user.img_url} alt={`${user.nombre}`} className="mini-user-image" />
        <div className='mini-user-card-text-container'>
            <h3>{user.nombre}</h3>
            <p>{user.email}</p>
            
        </div>

        <div className='mini-user-card-svg-container-one'>
            <div className='mini-user-card-svg-container'>
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z"  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
        
        

        </div>
    );
}