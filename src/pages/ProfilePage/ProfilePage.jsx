import React, { useEffect, useState, useRef } from 'react';
import './ProfilePage.css';
import { getUserId } from '../../utils/GetUserId';
import UsersModel from '../../models/UsersModel';
import { validateName, validateEmail, getPasswordStrength } from '../../utils/validationUtils';
import { useLogout } from "../../utils/LogOut";
import SubscriptionStatus from '../../components/SubscriptionStatus/SubscriptionStatus';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [editingField, setEditingField] = useState(null); 
    const [updatedData, setUpdatedData] = useState({});
    const [emailVerificationStep, setEmailVerificationStep] = useState("idle"); // idle | code_sent | verified
    const [verificationCode, setVerificationCode] = useState("");
    const [passwordStrength, setPasswordStrength] = useState({ level: "Vacía", score: 0 });
    const fileInputRef = useRef(null); 
    const userId = getUserId();
    const logOut = useLogout(); // Llamar dentro del componente
    const navigate = useNavigate();



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

    /* UTILS */

    const handleChange = (field, value) => {
        setUpdatedData((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangePhotoClick = () => {
        fileInputRef.current.click(); // Simula el clic en el input de archivo
    };

    const handleCancelEdit = () => {
        setUpdatedData({});
        setEditingField(null);
    };

    const handlePasswordChange = (value) => {
        handleChange('password', value);
        const strength = getPasswordStrength(value);
        setPasswordStrength(strength);
    };


    const getStrengthColor = (level) => {
        switch (level) {
            case "Débil":
                return "red";
            case "Media":
                return "orange";
            case "Fuerte":
                return "green";
            default:
                return "gray";
        }
    };

    const handleProtectedZoneClose = () => {
        setEmailVerificationStep("idle");
    }


    /* IMG CODE */
    
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



    
    /* NAME UPLOAD */
    const handleSaveName = async () => {

        const error = validateName(updatedData.nombre);
        if (error) {
            alert(error);
        return;
        }

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

    
    /* PASS UPLOAD */
    const handleSavePassword = async () => {
    
        const response = await UsersModel.uploadUserPassword(updatedData.password);
        if (response) {
            alert("Contraseña actualizada correctamente.");
        } else {
            alert("Error al actualizar la contraseña.");
        }
        setEditingField(null);
    };


    /* EMAIL UPLOAD */
    const handleSaveEmail = async () => {

        const error = validateEmail(updatedData.email);
        if (error) {
            alert(error);
        return;
        }

        const response = await UsersModel.uploadUserMail(updatedData.email);
        if (response === "mailSuccessfullyUpdated") {
            alert("Correo actualizado correctamente.");
            setUserData((prev) => ({ ...prev, email: updatedData.email }));
            setEditingField(null);
            //setEmailVerificationStep("idle");
        }
         if(response === "emailDup"){
            alert("EL EMAIL YA EXISTE; PRUEBA CON OTRO");
            setEditingField(null);
         }
        if(response === "NotPosibleToUpdateEmail"){
            alert("Error al actualizar el correo.");
            setEditingField(null);  
        }
        
    };

    /* PROFILE DELETION*/
    
    const handleProfileDeletion = async () => {

        if(!window.confirm("Estas realemnte seguro de que quieres eliminar tu cuenta? Todos tus servicios se suspenderan y se perdera cualquer informacion relacionada con la cuenta.")){
            alert("Cancelado");
        }else{
            const response = await UsersModel.deleteUserProfile();
                if (response) {
                    alert("Cuenta eliminada con exito");
                    logOut();
                    navigate('/');
                    
                }else{
                    alert("Ocurrio u error eliminado la cueta prueba mas tarde");

                }
  
        }

        
        
    };

    


    /*Codigo de verificacion*/

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
                            <form>
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


                    {/* Apartado protegido para correo y contraseña */}
                    <div className="protected-section">
                        <h2>Zona protegida</h2>
                        {emailVerificationStep === "idle" && (
                            <>
                                <p>Para editar tu correo o contraseña, verifica tu identidad.</p>
                                <button className="btn" onClick={handleSendVerificationCode}>Enviar código de verificación</button>
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
                                {/* Correo */}
                                <div className="profile-field">
                                    <button onClick={handleProtectedZoneClose}>EXIT</button>
                                    <label>Correo electrónico:</label>
                                    {editingField === 'email' ? (
                                        <>
                                            <input 
                                                type="email" 
                                                value={updatedData.email || userData.email} 
                                                onChange={(e) => handleChange('email', e.target.value)}
                                            />
                                            <button className="btn" onClick={handleSaveEmail}>Guardar</button>
                                            <button className="btn" onClick={handleCancelEdit}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <p>{userData.email}</p>
                                            <button className="btn" onClick={() => {
                                                setEditingField('email');
                                                setUpdatedData({ email: userData.email });
                                            }}>
                                                Editar
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Contraseña */}
                                <div className="profile-field">
                                    <label>Contraseña:</label>
                                    {editingField === 'password' ? (
                                        <>
                                            <input 
                                                type="password" 
                                                placeholder="Nueva contraseña" 
                                                value={updatedData.password || ''} 
                                                onChange={(e) => handlePasswordChange(e.target.value)}
                                            />
                                            <input 
                                                type="password" 
                                                placeholder="Confirma la nueva contraseña" 
                                                value={updatedData.confirmPassword || ''} 
                                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                            />
                                            {/* Barra de seguridad */}
                                            <div className="password-strength">
                                                <div 
                                                    className="strength-bar" 
                                                    style={{ width: `${passwordStrength.score}%`, backgroundColor: getStrengthColor(passwordStrength.level) }}
                                                ></div>
                                                <p>{passwordStrength.level}</p>
                                            </div>
                                            <button 
                                                className="btn" 
                                                onClick={() => {
                                                    if (updatedData.password !== updatedData.confirmPassword) {
                                                        alert("Las contraseñas no coinciden.");
                                                        return;
                                                    }
                                                    handleSavePassword();
                                                }}
                                            >
                                                Guardar
                                            </button>
                                            <button className="btn" onClick={handleCancelEdit}>Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <p>********</p>
                                            <button className="btn" onClick={() => {
                                                setEditingField('password');
                                                setUpdatedData({ password: '', confirmPassword: '' });
                                            }}>
                                                Editar
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}

                    
                    </div>
                    <SubscriptionStatus subscriptionState={userData.estado_suscripcion}></SubscriptionStatus>
                    <div id='logout-closeAccoint-container'>
                    <button onClick={logOut}>Log Out</button>
                    <button onClick={handleProfileDeletion}>ELIMINAR CUENTA</button>
                    </div>
                    
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}

        
        </div>
    );
}
