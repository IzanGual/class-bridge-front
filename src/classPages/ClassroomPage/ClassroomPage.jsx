import './ClassroomPage.css';
import { useSearchParams } from 'react-router-dom'; // Cambia esto
import { useEffect, useState } from 'react';
import CoursesModel from '../../classModels/CoursesModel.js';
import { checkStudentAuthStatus } from '../../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const ClassRoomPage = ( {aula} ) => {
    const [searchParams] = useSearchParams(); 

  const id = searchParams.get('id');        
  const [curso, setCurso] = useState(null);
  const navigate = useNavigate();

  console.log("Aula en ClassroomPage id:", id);

  useEffect(() => {

    const verifyAuth = async () => {
                const loggedIn = await checkStudentAuthStatus(aula.id);
                console.log("islogged", loggedIn);
    
                if (!loggedIn) {
                    
                    navigate(`/bridgeto/${aula.nombre}`);
                }
            };

    const fetchCourseFullInfo = async () => {
      try {
        const data = await CoursesModel.getFullCourseInfo(id);
        if (data) {
          setCurso(data);
          console.log("Curso:", data);
        } else {
          console.log("Hubo un error consiguiendo la info del curso:", data);
        }
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      }
    };

    verifyAuth();

    if (id) fetchCourseFullInfo();
  }, [id, aula.id, aula.nombre, navigate]);

  

  if (!curso) return <div>...</div>;

  return (
    <div className="dashboard-option-container">
      <div className='course-header-container'>
        <h2 className='section-header'>{curso.nombre}</h2>
        <div className='portadaCurso-container'>
          <img src={curso.img_url} alt={`Banner de ${curso.nombre}`} className="curso-banner" />
        </div>
      </div>

      {curso.apartados.map((apartado) => (
        <div key={apartado.id} className="apartado hoverable">
          <h3>{apartado.nombre}</h3>

          {apartado.categorias && apartado.categorias.length > 0 ? (
            apartado.categorias.map((categoria) => (
              <div key={categoria.id} className="categoria">
                <h4>{categoria.nombre}</h4>

                {/* Documentos */}
                {categoria.documentos && categoria.documentos.length > 0 ? (
                  <ul className="documentos">
                    {categoria.documentos.map((doc) => (
                      <li key={doc.id} className="documento" onClick={() => window.open(doc.url, "_blank")}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8335 1.66675H5.00016C4.55814 1.66675 4.13421 1.84234 3.82165 2.1549C3.50909 2.46746 3.3335 2.89139 3.3335 3.33341V16.6667C3.3335 17.1088 3.50909 17.5327 3.82165 17.8453C4.13421 18.1578 4.55814 18.3334 5.00016 18.3334H15.0002C15.4422 18.3334 15.8661 18.1578 16.1787 17.8453C16.4912 17.5327 16.6668 17.1088 16.6668 16.6667V7.50008M10.8335 1.66675L16.6668 7.50008M10.8335 1.66675L10.8335 7.50008H16.6668" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {doc.nombre}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="space"></p>
                )}

                {/* Entregas */}
                {categoria.tareas && categoria.tareas.length > 0 ? (
                  <ul className="entregas">
                    {categoria.tareas.map((tarea) => (
                      <li key={tarea.id} className="entrega" onClick={() => navigate(`/bridgeto/${aula.nombre}/class/submit?id=${tarea.id}`)}
>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {tarea.nombre}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="space"></p>
                )}
              </div>
            ))
          ) : (
            <p className="space"></p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClassRoomPage;