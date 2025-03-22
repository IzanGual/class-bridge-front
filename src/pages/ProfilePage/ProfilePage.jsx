import React, { useEffect, useState, useRef } from 'react';
import './ProfilePage.css';
import { getUserId } from '../../utils/GetUserId';
import UsersModel from '../../models/UsersModel';

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [editingField, setEditingField] = useState(null); 
    const [updatedData, setUpdatedData] = useState({});
    const fileInputRef = useRef(null); // Referencia para el input de archivo

    useEffect(() => {
        const fetchData = async () => {
            const userId = getUserId();
    
            try {
                let data = await UsersModel.getUser(userId);
                if (data) {
                    // Forzar que la imagen no se cargue desde caché
                    setUserData({
                        ...data,
                        img_url: data.img_url ? `${data.img_url}?t=${new Date().getTime()}` : null
                    });
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleChange = (field, value) => {
        setUpdatedData((prev) => ({ ...prev, [field]: value }));
    };


    // Manejar clic en "Cambiar foto"
    const handleChangePhotoClick = () => {
        fileInputRef.current.click(); // Simula el clic en el input de archivo
    };

    // Manejar la subida de imagen
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const userId = getUserId();
        const imageUrl = await UsersModel.uploadUserImage(userId, file);
    
        if (!imageUrl) {
            alert("Error al subir la imagen");
        } else {
            alert("Imagen subida correctamente");
            // Forzar la actualización de la imagen agregando un parámetro único
            setUserData((prev) => ({ 
                ...prev, 
                img_url: `${imageUrl}?t=${new Date().getTime()}` 
            }));
        }
    };
    

    return (
        <div className="page-container">
            <h1>Tu perfil</h1>

            {userData ? (
                <div className="profile-card">
                    {/* Foto de perfil */}
                    <div className="profile-photo-section">
                        <img src={userData.img_url} alt="Foto de perfil" className="profile-photo" />
                        <div className="photo-buttons">
                            <button className="btn">Eliminar foto</button>
                            <button className="btn" onClick={handleChangePhotoClick}>Cambiar foto</button>
                            <form enctype="multipart/form-data">
                            <input
                                name='file' 
                                type="file" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                            /></form>
                            
                        </div>
                    </div>

                    {/* Nombre */}
                    <div className="profile-field">
                        <label>Nombre:</label>
                        {editingField === 'nombre' ? (
                            <input 
                                type="text" 
                                value={updatedData.nombre} 
                                onChange={(e) => handleChange('nombre', e.target.value)}
                            />
                        ) : (
                            <p>{userData.nombre}</p>
                        )}
                        <button className="btn" onClick={() => setEditingField(editingField === 'nombre' ? null : 'nombre')}>
                            {editingField === 'nombre' ? 'Guardar' : 'Editar'}
                        </button>
                    </div>

                    {/* Correo */}
                    <div className="profile-field">
                        <label>Correo electrónico:</label>
                        {editingField === 'email' ? (
                            <input 
                                type="email" 
                                value={updatedData.email} 
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        ) : (
                            <p>{userData.email}</p>
                        )}
                        <button className="btn" onClick={() => setEditingField(editingField === 'email' ? null : 'email')}>
                            {editingField === 'email' ? 'Guardar' : 'Editar'}
                        </button>
                    </div>

                    {/* Contraseña */}
                    <div className="profile-field">
                        <label>Contraseña:</label>
                        <p>********</p>
                        <button className="btn">Editar</button>
                    </div>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
}
