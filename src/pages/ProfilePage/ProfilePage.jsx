import React, { useEffect, useState, useRef } from 'react';
import './ProfilePage.css';
import { getUserId } from '../../utils/GetUserId';
import UsersModel from '../../models/UsersModel';

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [editingField, setEditingField] = useState(null); 
    const [updatedData, setUpdatedData] = useState({});
    const [emailVerificationStep, setEmailVerificationStep] = useState("idle"); // idle | code_sent | verified
    const [verificationCode, setVerificationCode] = useState("");
    const fileInputRef = useRef(null); 
    const userId = getUserId();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await UsersModel.getUser(userId);
                if (data) {
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

        // Manejar la subida de imagen
        const handlePhotoDeletion = async () => {
            if(!window.confirm("Estas seguro que quieres eliminar la imagen de perfil?")){
                return;
            }else{
                const imageUrl = await UsersModel.deleteUserImage();
                if (!imageUrl) {
                    alert("Error al borrar la imagen");
                } else {
                    alert("Imagen borrada correctamente");
                    // Forzar la actualización de la imagen agregando un parámetro único
                    setUserData((prev) => ({ 
                        ...prev, 
                        img_url: `${imageUrl}?t=${new Date().getTime()}` 
                    }));
                }
            }
            
        };



    const handleCancelEdit = () => {
        setUpdatedData({});
        setEditingField(null);
        setEmailVerificationStep("idle"); // Reiniciar verificación de correo
    };

    const handleSaveName = async () => {
        if (updatedData.nombre) {
            const response = await UsersModel.uploadUserName(updatedData.nombre);
            if (response) {
                alert("Nombre guardado correctamente");
                setUserData((prev) => ({ ...prev, nombre: updatedData.nombre }));
            } else {
                alert("Error al guardar el nombre");
            }
        }
        setEditingField(null);
    };

    const handleSendVerificationCode = async () => {
        const response = await UsersModel.sendEmailVerificationCode(userData.email);

        if (response) {
            alert("Código enviado a tu correo.");
            setEmailVerificationStep("code_sent");
        } else {
            alert("Error al enviar el código.");
        }
    };

    const handleVerifyCode = async () => {
        const response = await UsersModel.verifyEmailCode(verificationCode);
        if (response) {
            alert("Código verificado. Ahora puedes cambiar tu correo.");
            setEmailVerificationStep("verified");
        } else {
            alert("Código incorrecto.");
        }
    };

    const handleSaveEmail = async () => {
        const response = await UsersModel.uploadUserMail(updatedData.email);
        if (response) {
            alert("Correo actualizado correctamente.");
            setUserData((prev) => ({ ...prev, email: updatedData.email }));
            setEditingField(null);
            setEmailVerificationStep("idle");
        } else {
            alert("Error al actualizar el correo.");
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
                            <button className="btn" onClick={handlePhotoDeletion}>Eliminar foto</button>
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
                            <>
                                <input 
                                    type="text" 
                                    value={updatedData.nombre || userData.nombre} 
                                    onChange={(e) => handleChange('nombre', e.target.value)}
                                />
                                <button className="btn" onClick={handleSaveName}>Guardar</button>
                                <button className="btn" onClick={handleCancelEdit}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                <p>{userData.nombre}</p>
                                <button className="btn" onClick={() => {
                                    setEditingField('nombre');
                                    setUpdatedData({ nombre: userData.nombre });
                                }}>
                                    Editar
                                </button>
                            </>
                        )}
                    </div>

                    {/* Correo */}
                    <div className="profile-field">
                        <label>Correo electrónico:</label>
                        {editingField === 'email' ? (
                            <>
                                {emailVerificationStep === "idle" && (
                                    <>
                                        <p>{userData.email}</p>
                                        <button className="btn" onClick={handleSendVerificationCode}>Enviar código</button>
                                    </>
                                )}

                                {emailVerificationStep === "code_sent" && (
                                    <>
                                        <input 
                                            type="text" 
                                            placeholder="Introduce el código" 
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                        />
                                        <button className="btn" onClick={handleVerifyCode}>Verificar</button>
                                    </>
                                )}

                                {emailVerificationStep === "verified" && (
                                    <>
                                        <input 
                                            type="email" 
                                            value={updatedData.email || userData.email} 
                                            onChange={(e) => handleChange('email', e.target.value)}
                                        />
                                        <button className="btn" onClick={handleSaveEmail}>Guardar</button>
                                        <button className="btn" onClick={handleCancelEdit}>Cancelar</button>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <p>{userData.email}</p>
                                <button className="btn" onClick={() => {
                                    setEditingField('email');
                                    setEmailVerificationStep("idle");
                                }}>
                                    Editar
                                </button>
                            </>
                        )}
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
