import './AulaEdit.css';
import { checkTeacherAuthStatus } from '../../utils/auth.js';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { QRCodeCanvas } from "qrcode.react";
import { useAlert } from '../../utils/AlertProvider';
import AulasModel from '../../models/AulasModel.js';



export default function AulaEdit({ aula }) {
    const navigate = useNavigate();
    const showAlert = useAlert();


    const aulaUrl = `${window.location.origin}/bridgeto/${aula.nombre}`;
    const [qrRef, setQrRef] = useState(null);

    const handleDownloadQR = () => {
        if (qrRef) {
            const url = qrRef.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = url;
            link.download = `qr-aula-${aula.nombre}.png`;
            link.click();
        }
    };



    // Convierte rgb(x, y, z) a #rrggbb
    const rgbToHex = (rgb) => {
        const result = rgb.match(/\d+/g);
        if (!result || result.length < 3) return "#000000";
        return (
            "#" +
            result
                .slice(0, 3)
                .map((x) => {
                    const hex = parseInt(x).toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                })
                .join("")
        );
    };

    // Convierte #rrggbb a rgb(x, y, z)
    const hexToRgb = (hex) => {
        const value = hex.replace("#", "");
        const r = parseInt(value.substring(0, 2), 16);
        const g = parseInt(value.substring(2, 4), 16);
        const b = parseInt(value.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    };

    const [selectedColor, setSelectedColor] = useState(rgbToHex(aula.color));

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

  
    const handleColorSave = async () => {
         // console.log("Nuevo color seleccionado:", hexToRgb(selectedColor));

        let color = hexToRgb(selectedColor);

        const response = await AulasModel.updateColor(aula.id, color);
            if (response) {
                showAlert("Color actualizado correctamente, para ver reflejados los cambios porfabor recarga la pagina.");
                
            } else {
                showAlert("Error al actualizar el apartado");
            }
    };

    const handleAulaNameSave = async () => {
        // console.log("Nuevo nombre de aula:", aulaName);

        const response = await AulasModel.updateAulaName(aula.id, aulaName);
            if (response === "nameDup") {
                showAlert("Este nombre de aula ya esta en uso, porfabor elija otro.");
                setAulaName(aula.nombre);
            }
             if (response === "aula_nameSuccessfullyUpdated") {
                showAlert("Nombre de aula actualizado correctamente, porfabor recarga la pagina e inicia sesión nuevamente en tu aula. Recuerda que la URL depende el nombre de la misma");
            }

            if (response === "nameNotUpdated") {
                showAlert("Huvo un error al actualizar el nombre de tu aula, porfabor intenta nuevamente.");
            }
            


    };



    useEffect(() => {
        const verifyAuth = async () => {
            const loggedIn = await checkTeacherAuthStatus(aula.id);
            // console.log("islogged", loggedIn);

            if (!loggedIn) {
                navigate(`/bridgeto/${aula.nombre}`);
            }
        };

   

        verifyAuth();
    }, [aula, navigate]);

    // Estado y handlers para el nombre del aula
    const [aulaName, setAulaName] = useState(aula.nombre || '');
    const handleAulaNameChange = (e) => {
        setAulaName(e.target.value);
    };
    



    return (
        <div className='section-container'>
            <h2 className='section-header'>Aula</h2>
            <div className='courseEdit-wrapper'>
                <div className='editOptions-container'>
                    <label className='aula-lbl'>Color predeterminado de tu aula</label>
                    <input
                    className='color-picker'
                        type="color"
                        value={selectedColor}
                        onChange={handleColorChange}
                    />
                    <div className='save-container' id='margin-top'>

                    <span>Guardar color ---</span>
                    <button className='save-btnn' onClick={handleColorSave}>
                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                        
                </div>
                <span className='info'>
                    Selecciona el color principal que desees para tu aula. Este estará visible en los botones primarios y e tus tareas.
                </span>
                </div>

                <div className='vertical-separator'></div>

                <div className='classPreview-container'>

                <div className='aula-info-conbtainer'>
                        <label className='edit-input-label'>Nombre de tu aula:</label>
                        <div className='save-container' id='no-margin'>
                            <input
                                id='no-margin'
                                type="text"
                                className='edit-input'
                                placeholder='Nombre del documento'
                                value={aulaName}
                                onChange={handleAulaNameChange}
                            />
                            <button className='save-btnn' onClick={handleAulaNameSave}>
                                <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.99996 9.16667V14.1667M7.49996 11.6667H12.5M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8451 17.0118C17.5326 17.3244 17.1087 17.5 16.6666 17.5H3.33329C2.89127 17.5 2.46734 17.3244 2.15478 17.0118C1.84222 16.6993 1.66663 16.2754 1.66663 15.8333V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H7.49996L9.16663 5H16.6666C17.1087 5 17.5326 5.17559 17.8451 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z" stroke="#56D02A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <span className='info'>
                            Cambiarlo, significa, que tambien cambiara el LINK de tu aula.
                        </span>
                    </div>

                <div className='aula-info-conbtainer'>
                    <label className="edit-input-label">Link directo a tu aula:</label>

                <div className="link-container">
                    <div>
                        <a
                        className="aula-url"
                        href={`${window.location.origin}/bridgeto/${aula.nombre}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        {`${window.location.origin}/bridgeto/${aula.nombre}`}
                        </a>
                    </div>
                    <button
                        className="copy-button"
                        onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/bridgeto/${aula.nombre}`);
                        showAlert('¡Link copiado!');
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 30H8C6.93913 30 5.92172 29.5786 5.17157 28.8284C4.42143 28.0783 4 27.0609 4 26V8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H26C27.0609 4 28.0783 4.42143 28.8284 5.17157C29.5786 5.92172 30 6.93913 30 8V10M22 18H40C42.2091 18 44 19.7909 44 22V40C44 42.2091 42.2091 44 40 44H22C19.7909 44 18 42.2091 18 40V22C18 19.7909 19.7909 18 22 18Z" stroke="#D9D9D9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </button>
                </div>
                </div>
                        


                <div className='aula-info-conbtainer'>
                <label className='edit-input-label'>Tu codigo QR para facilitar el acceso a tus nuevos alumnos:</label>
                <div className='qr-container'>
                    <QRCodeCanvas
                        value={aulaUrl}
                        size={180}
                        
                        ref={el => setQrRef(el)}
                    />
                </div>
                <div className='save-container' id='margin-top'>

                    <span>Descargar QR ---</span>
                    <button className='save-btnn' onClick={handleDownloadQR}>
                    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="#56D02A" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 30V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V30M14 20L24 30M24 30L34 20M24 30V6"  strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    </button>
                        
                </div>
               
            </div>


                </div>
            </div>
        </div>
    );
}