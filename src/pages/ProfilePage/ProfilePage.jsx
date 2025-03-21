import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { getUserId } from '../../utils/GetUserId';
import UsersModel from '../../models/UsersModel';

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userId = getUserId();

            try {
                // Usamos await para esperar que la promesa se resuelva
                let data = await UsersModel.getUser(userId);
                console.log("datooos", data);
                
                if (data) {
                    setUserData(data);  // Si los datos existen, actualizamos el estado
                } else {
                    console.log("No se encontraron datos");
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchData();  // Llamamos a la función asincrónica
    }, []);  // Solo se ejecuta una vez al montar el componente

    return (
        <div className="page-container">
            <h1>Aquí irá tu perfil</h1>
            {userData ? (
                <div>
                    <h2>{userData.nombre}</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Tipo:</strong> {userData.tipo}</p>
                    <p><strong>Estado de Suscripción:</strong> {userData.estado_suscripcion}</p>
                    <p><strong>ID:</strong> {userData.id}</p>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
    
}
