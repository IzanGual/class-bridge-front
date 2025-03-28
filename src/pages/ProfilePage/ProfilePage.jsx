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
                            <button className="btn" onClick={handlePhotoDeletion}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </button>
                            <button id='btn' className="btn" onClick={handleChangePhotoClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            </button>
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

                    <div className="separator"></div>

                    {/* Nombre */}
                    <div className="profile-field">
                        <label>Nombre</label>

                        <div id='nameFiledContainer'>
                                {editingField === 'nombre' ? (
                                    <>
                                        <input 
                                            type="text" 
                                            value={updatedData.nombre || userData.nombre} 
                                            onChange={(e) => handleChange('nombre', e.target.value)}
                                        />
                                        <button className="save-btn" onClick={handleSaveName}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                        </button>
                                        <button className="cancel-btn" onClick={handleCancelEdit}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>{userData.nombre}</p>
                                        <button className="edit-btn" onClick={() => {
                                            setEditingField('nombre');
                                            setUpdatedData({ nombre: userData.nombre });
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            </button>
                                    </>
                                )}
                        </div>

                    </div>


                    {/* Apartado protegido para correo y contraseña */}
                    <div className="protected-section">
                        {emailVerificationStep === "idle" && (
                            <>  
                            <label>Correo electrónico</label>
                                <p>{userData.email}</p>
                                <label>Contraseña</label>
                                <p>***********</p>
                                <p id='info'>Para editar tu correo o contraseña, verifica tu identidad.</p>
                                <button className="send-code-btn" onClick={handleSendVerificationCode}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1d1d1d"><path d="m720-160-56-56 63-64H560v-80h167l-63-64 56-56 160 160-160 160ZM160-280q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h520q33 0 56.5 23.5T760-760v204q-10-2-20-3t-20-1q-10 0-20 .5t-20 2.5v-147L416-520 160-703v343h323q-2 10-2.5 20t-.5 20q0 10 1 20t3 20H160Zm58-480 198 142 204-142H218Zm-58 400v-400 400Z"/></svg>
                                </button> 
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
                                <button className="verify-btn" onClick={handleVerifyCode}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1d1d1d"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg>
                                </button>
                            </>
                        )}

                        {emailVerificationStep === "verified" && (
                            <>
                                {/* Correo */}
                                <div className="profile-field">
                                    <button className='cancel-btn' onClick={handleProtectedZoneClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>                                    </button>
                                    <label>Correo electrónico</label>
                                    {editingField === 'email' ? (
                                        <>
                                            <input 
                                                type="email" 
                                                value={updatedData.email || userData.email} 
                                                onChange={(e) => handleChange('email', e.target.value)}
                                            />
                                            <div className='btn-container'>
                                                <button className="save-btn" onClick={handleSaveEmail}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                                </button>
                                                <button className="cancel-btn" onClick={handleCancelEdit}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                                </button>
                                            </div>
                                            
                                        </>
                                    ) : (
                                        <>
                                            <p>{userData.email}</p>
                                            <button className="edit-btn" onClick={() => {
                                                setEditingField('email');
                                                setUpdatedData({ email: userData.email });
                                            }}>
                                                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className='separator'></div>

                                {/* Contraseña */}
                                <div className="profile-field">
                                    <label>Contraseña</label>
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
                                            </div>
                            
                                            <p id='strLevel'>{passwordStrength.level}</p>

                                            <div className='btn-container'>
                                                <button 
                                                    className="save-btn" 
                                                    onClick={() => {
                                                        if (updatedData.password !== updatedData.confirmPassword) {
                                                            alert("Las contraseñas no coinciden.");
                                                            return;
                                                        }
                                                        handleSavePassword();
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                                </button>
                                                <button className="cancel-btn" onClick={handleCancelEdit}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                                </button>
                                            </div>
                                            
                                        </>
                                    ) : (
                                        <>
                                            <p>********</p>
                                            <button className="edit-btn" onClick={() => {
                                                setEditingField('password');
                                                setUpdatedData({ password: '', confirmPassword: '' });
                                            }}>
                                                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}

                    
                    </div>
                   
                    <SubscriptionStatus subscriptionState={userData.estado_suscripcion}></SubscriptionStatus>
                    <div id='logout-closeAccoint-container'>
                    <button className='logOut' onClick={logOut}>Cerrar sesión</button>
                    <button className='deleteAccount' onClick={handleProfileDeletion}>Eliminar cuenta
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                    </button>
                    </div>
                    
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}

        
        </div>
    );
}
