import './Tabs.css';
import { useEffect, useState } from 'react';
import CoursesModel from '../../classModels/CoursesModel';
import UsersModel from '../../models/UsersModel';

export default function GeneralTab({ course , aula}) {
    const [courseUsers, setCourseUsers] = useState([]);
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        const fecthUsersByCourseId = async () => {
            if (!course?.id) return; // Verifica si course.id existe antes de continuar
            try {
                const data = await CoursesModel.getUsersByCourseId(course.id);
                if (data) {
                    setCourseUsers(data);
                    console.log("Usuarios con permisos en el curso::", data);
                } else {
                    console.log("Hubo un error consiguiendo los courseUsers:", data.error);
                }
            } catch (error) {
                console.error("Error al obtener los courseUsers:", error);
            }
        };

        const fecthOwnUsers = async () => {
            try {
                const data = await UsersModel.getOwnUsers(aula.id); 
                if (data) {
                    setUsers(data); 
                    console.log("Todos los usuarios del el aula:", data);
                }else{
                    console.log("Huvo un error cosiguiendo los usuarios:", data.error);
                }
                
              } catch (error) {
                console.error("Error al obtener los usuarios:", error);
              }
        };

        fecthUsersByCourseId();
        fecthOwnUsers();
    }, [course?.id]); // Incluye course.id como dependencia

    return (
        <div className='tab-info-container'>
            <label className='edit-input-label' htmlFor="course-name-edit">Nombre del curso:</label>
            <input
                id='course-name-edit'
                type="text"
                className='edit-input'
                placeholder='Nombre del curso'
                defaultValue={course ? course.nombre : 'Selecciona un curso'} // Muestra un valor predeterminado si no hay course
            />

            <label className='edit-input-label' htmlFor="course-img-edit">Portada del curso:</label>
            <div className='portada-container'>
                <img
                    className='portada-img-edit'
                    src={course ? course.img_url : '/assets/images/default-banner.png'} // Muestra una imagen predeterminada si no hay course
                    alt="Portada del curso"
                />
            </div>
            <input id='course-img-edit' type="file" className='edit-input' />

            <label className='edit-input-label' htmlFor="course-users-edit">Usuarios del curso:</label>
            <input
                id='course-users-edit'
                type="text"
                className='edit-input'
                placeholder='Usuarios del curso'
                defaultValue={courseUsers.length > 0 ? courseUsers.join(', ') : 'Sin usuarios'} // Muestra un valor predeterminado si no hay usuarios
            />
        </div>
    );
}