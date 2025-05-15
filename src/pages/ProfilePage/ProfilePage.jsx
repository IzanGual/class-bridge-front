import React, { useEffect, useState, useRef } from 'react';
import './ProfilePage.css';
import { getUserId } from '../../utils/GetUserId';
import UsersModel from '../../models/UsersModel';
import { validateName, validateEmail, getPasswordStrength } from '../../utils/validationUtils';
import { useLogout } from "../../utils/LogOut";
import SubscriptionStatus from '../../components/SubscriptionStatus/SubscriptionStatus';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../utils/AlertProvider';
import { useConfirm } from '../../utils/ConfirmProvider'; // Importar el hook useConfirm

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [editingField, setEditingField] = useState(null); 
    const [updatedData, setUpdatedData] = useState({});
    const [emailVerificationStep, setEmailVerificationStep] = useState("idle"); // idle | code_sent | verified
    const [verificationCode, setVerificationCode] = useState("");
    const [passwordStrength, setPasswordStrength] = useState({ level: "Vacía", score: 0 });
    const fileInputRef = useRef(null); 
    const userId = getUserId();
    const logOut = useLogout(); 
    const navigate = useNavigate();
    const showAlert = useAlert();
    const showConfirm = useConfirm(); 
        


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
    }, [userId]);

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
                showAlert("Error al subir la imagen");
            } else {
                showAlert("Imagen actualizada correctamente");
                // Forzar la actualización de la imagen agregando un parámetro único
                setUserData((prev) => ({ 
                    ...prev, 
                    img_url: `${imageUrl}?t=${new Date().getTime()}` 
                }));
            }
        };

        
        const handlePhotoDeletion = async () => {
            const confirmed = await showConfirm(
                "¿Estas seguro que quieres eliminar la imagen de perfil?"
            );
        
            if(!confirmed){
                return;
            }else{
                const imageUrl = await UsersModel.deleteUserImage();
                if (!imageUrl) {
                    showAlert("Error al eliminar la imagen");
                } else {
                    showAlert("Imagen eliminada correctamente");
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
            showAlert(error);
        return;
        }

        if (updatedData.nombre) {
            const response = await UsersModel.uploadUserName(updatedData.nombre);
            if (response) {
                showAlert("Nombre actualizado correctamente");
                setUserData((prev) => ({ ...prev, nombre: updatedData.nombre }));
            } else {
                showAlert("Error al actualizar el nombre");
            }
        }
        setEditingField(null);
    };

    
    /* PASS UPLOAD */
    const handleSavePassword = async () => {
    
        const response = await UsersModel.uploadUserPassword(updatedData.password);
        if (response) {
            showAlert("Contraseña actualizada correctamente.");
        } else {
            showAlert("Error al actualizar la contraseña.");
        }
        setEditingField(null);
    };


    /* EMAIL UPLOAD */
    const handleSaveEmail = async () => {

        const error = validateEmail(updatedData.email);
        if (error) {
            showAlert(error);
        return;
        }

        const response = await UsersModel.uploadUserMail(updatedData.email);
        if (response === "mailSuccessfullyUpdated") {
            showAlert("Correo actualizado correctamente.");
            setUserData((prev) => ({ ...prev, email: updatedData.email }));
            setEditingField(null);
            //setEmailVerificationStep("idle");
        }
         if(response === "emailDup"){
            showAlert("EL EMAIL YA EXISTE; PRUEBA CON OTRO");
            setEditingField(null);
         }
        if(response === "NotPosibleToUpdateEmail"){
            showAlert("Error al actualizar el correo.");
            setEditingField(null);  
        }
        
    };

    /* PROFILE DELETION*/
    
    const handleProfileDeletion = async () => {
        const confirmed = await showConfirm(
            "¿Estas realemnte seguro de que quieres eliminar tu cuenta? Todos tus servicios se suspenderan y se perdera cualquer informacion relacionada con la cuenta.?"
        );


        if(!confirmed){
            showAlert("Cancelado");
        }else{
            const response = await UsersModel.deleteUserProfile();
                if (response) {
                    showAlert("Cuenta eliminada con exito");
                    logOut();
                    navigate('/');
                    
                }else{
                    showAlert("Ocurrio un error eliminado la cueta prueba mas tarde");

                }
  
        }

        
        
    };

    


    /*Codigo de verificacion*/

    const handleSendVerificationCode = async () => {
        const response = await UsersModel.sendEmailVerificationCode(userData.email);

        if (response) {
            showAlert("Código enviado a tu correo.");
            setEmailVerificationStep("code_sent");
        } else {
            showAlert("Error al enviar el código.");
        }
    };

    const handleVerifyCode = async () => {
        const response = await UsersModel.verifyEmailCode(verificationCode);
        if (response) {
            showAlert("Código verificado. Ahora puedes cambiar tu correo.");
            setEmailVerificationStep("verified");
        } else {
            showAlert("Código incorrecto.");
        }
    };

    

    return (
        <div className="profile-container">
            <h2>Perfil</h2>

            {userData ? (
                <div className="profile-card">

                    <div className='photo-name-container'>
                    {/* Foto de perfil */}
                    <div className="profile-photo-section">
                        <img src={userData.img_url} alt="Foto de perfil" className="profile-photo" />
                        <div className="photo-buttons">
                            <button className="delete-btn" onClick={handlePhotoDeletion}>
                            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>                            </button>
                            <button id='btn' className="file-upload-btn" onClick={handleChangePhotoClick}>
                                <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z"  strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>                            
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

                    <div className="mini-vertical-separator"></div>

                    {/* Nombre */}
                    <div className="profile-field">
                        <label>Nombre</label>

                        <div className='FiledContainer'>
                                {editingField === 'nombre' ? (
                                    <>
                                        <input 
                                            type="text" 
                                            value={updatedData.nombre || userData.nombre} 
                                            onChange={(e) => handleChange('nombre', e.target.value)}
                                        />
                                        <div className='crud-Courseimg-container-text-profile'>
                                        <button className="file-upload-btn" onClick={handleSaveName}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56d02a"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                        </button>
                                        <button className="delete-btn" onClick={handleCancelEdit}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(211, 33, 36)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                        </button>
                                        </div>
                                        
                                    </>
                                ) : (
                                    <>
                                        <p>{userData.nombre}</p>
                                        <button className="file-upload-btn" onClick={() => {
                                            setEditingField('nombre');
                                            setUpdatedData({ nombre: userData.nombre });
                                        }}>
                                            <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z"  strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>                                          </button>
                                    </>
                                )}
                        </div>

                    </div>

                    </div>

                    <div className='class-horizontal-separator'></div>
                    


                    {/* Apartado protegido para correo y contraseña */}
                    <div className="protected-section">
                        {emailVerificationStep === "idle" && (
                            <>  
                            

                                <div className='FiledContainer'>
                                    <label>Correo electrónico</label>
                                    <p>{userData.email}</p>
                                    <div className='crud-Courseimg-container-text-profile' >
                                        <button className="file-upload-btn" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56d02a"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                        </button>
                                        <button className="delete-btn" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(211, 33, 36)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className='FiledContainer'>
                                <label>Contraseña</label>
                                <p>***********</p>
                                <div className='crud-Courseimg-container-text-profile' >
                                        <button className="file-upload-btn" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56d02a"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                        </button>
                                        <button className="delete-btn" disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(211, 33, 36)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                        </button>
                                    </div>
                                    </div>
                                    <div className='FiledContainer' id='mail-sender'>
                                    <p id='info'>Para editar tu correo o contraseña, verifica tu identidad.</p>
                                <button className="send-code-btn" onClick={handleSendVerificationCode}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m720-160-56-56 63-64H560v-80h167l-63-64 56-56 160 160-160 160ZM160-280q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h520q33 0 56.5 23.5T760-760v204q-10-2-20-3t-20-1q-10 0-20 .5t-20 2.5v-147L416-520 160-703v343h323q-2 10-2.5 20t-.5 20q0 10 1 20t3 20H160Zm58-480 198 142 204-142H218Zm-58 400v-400 400Z"/></svg>
                                </button> 
                                    </div>
                                
                            </>
                        )}

                        {emailVerificationStep === "code_sent" && (
                            <div className='profile-photo-section'>
                                <input 
                                    className="verification-code-input"
                                    type="text" 
                                    placeholder="Introduce el código" 
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                                <button className="verify-btn" onClick={handleVerifyCode}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1d1d1d"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg>
                                </button>
                            </div>
                        )}

                        {emailVerificationStep === "verified" && (
                            <>
                                {/* Correo */}
                                <div className="profile-field">
                                    
                                    <label>Correo electrónico</label>
                                    {editingField === 'email' ? (
                                        <>
                                            <input 
                                                type="email" 
                                                value={updatedData.email || userData.email} 
                                                onChange={(e) => handleChange('email', e.target.value)}
                                            />
                                            <div className='crud-Courseimg-container-text-profile'>
                                        <button className="file-upload-btn" onClick={handleSaveEmail}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56d02a"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                        </button>
                                        <button className="delete-btn" onClick={handleCancelEdit}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(211, 33, 36)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                        </button>
                                        </div>
                                            
                                            
                                        </>
                                    ) : (
                                        <>
                                            <p>{userData.email}</p>
                                            <button className="file-upload-btn" onClick={() => {
                                                setEditingField('email');
                                                setUpdatedData({ email: userData.email });
                                            }}>
                                            <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z"  strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>                                             </button>
                                        </>
                                    )}
                                </div>


                                {/* Contraseña */}
                                <div className="profile-field">
                                    <label>Contraseña</label>
                                    {editingField === 'password' ? (
                                        <>
                                            <input 
                                                id='marg-bt'
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
                                                    className="file-upload-btn" 
                                                    onClick={() => {
                                                        if (updatedData.password !== updatedData.confirmPassword) {
                                                            showAlert("Las contraseñas no coinciden.");
                                                            return;
                                                        }
                                                        handleSavePassword();
                                                    }}
                                                >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56d02a"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                                </button>
                                                <button className="delete-btn" onClick={handleCancelEdit}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(211, 33, 36)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                                </button>
                                            </div>
                                            
                                        </>
                                    ) : (
                                        <>
                                            <p>********</p>
                                            <button className="file-upload-btn" onClick={() => {
                                                setEditingField('password');
                                                setUpdatedData({ password: '', confirmPassword: '' });
                                            }}>
                                            <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.6667 3.99996C23.0169 3.64976 23.4326 3.37198 23.8902 3.18245C24.3477 2.99293 24.8381 2.89539 25.3333 2.89539C25.8286 2.89539 26.319 2.99293 26.7765 3.18245C27.2341 3.37198 27.6498 3.64976 28 3.99996C28.3502 4.35015 28.628 4.76588 28.8175 5.22343C29.007 5.68098 29.1046 6.17138 29.1046 6.66662C29.1046 7.16187 29.007 7.65226 28.8175 8.10981C28.628 8.56736 28.3502 8.9831 28 9.33329L10 27.3333L2.66667 29.3333L4.66667 22L22.6667 3.99996Z"  strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>                                             </button>
                                        </>
                                    )}
                                </div>
                                <button id='goback' onClick={handleProtectedZoneClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FAFAF5"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>
                                </button>
                            </>
                            
                        )}


                    </div>

                    <div className='class-horizontal-separator'></div>
                        
                    <div className='sub-info'>
                    <SubscriptionStatus subscriptionState={userData.estado_suscripcion}></SubscriptionStatus>

                    <div className='mini-vertical-separator-dos'></div>

                    <div id='logout-closeAccoint-container'>
                    
                    <div className='fake-group'>
                        <label> Cerrar sesión</label>
                    <button className="delete-btn" onClick={logOut}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D32124"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>                         
                    </button>
                    </div>  
                    
                <div className='fake-group'>
                    <label> Eliminar cuenta</label>
                    <button className="delete-btn" onClick={handleProfileDeletion}>
                            <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 5.00008H4.16667M4.16667 5.00008H17.5M4.16667 5.00008L4.16667 16.6667C4.16667 17.1088 4.34226 17.5327 4.65482 17.8453C4.96738 18.1578 5.39131 18.3334 5.83333 18.3334H14.1667C14.6087 18.3334 15.0326 18.1578 15.3452 17.8453C15.6577 17.5327 15.8333 17.1088 15.8333 16.6667V5.00008M6.66667 5.00008V3.33341C6.66667 2.89139 6.84226 2.46746 7.15482 2.1549C7.46738 1.84234 7.89131 1.66675 8.33333 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1577 2.46746 13.3333 2.89139 13.3333 3.33341V5.00008M8.33333 9.16675V14.1667M11.6667 9.16675V14.1667" stroke="#D32124" strokeOpacity="0.86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>                            
                    </button>
                    </div>
                    </div>

                    </div>
                    

                    
                    
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}

        
        </div>
    );
}
