import './TutorialPage.css';
export default function TutorialPage() {
    return (
        <div className='dashboard-option-container'>
            <div id='tutorial' className='class-header-container'>
                <h1 className='class-title-header'>
                    Tutorial <span></span>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 24H36L30 42L18 6L12 24H4" stroke="#FF7E5F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </h1>
                <p className='class-subtitle-header'>
                    Este tutorial te guiará paso a paso en el uso de ClassBridge, una plataforma educativa diseñada para crear y gestionar aulas virtuales de manera eficiente.
                </p>
            </div>
            <div className='class-horizontal-separator'></div>
            <div className='section-container'>
                <div className='tutorial-text-container'>
                    <h2>1. Introducción a ClassBridge</h2>
                    <p>
                        ClassBridge es una plataforma que te permite crear tu propia aula virtual para enseñar a tu manera. Con ClassBridge podrás olvidarte de la vieja impresora y de repartir papelitos, ya que todo el contenido educativo estará organizado digitalmente.
                    </p>
                    <h3>La plataforma te ofrece</h3>
                    <ul>
                        <li>Gestión completa de cursos y contenidos educativos</li>
                        <li>Organización jerárquica del material didáctico</li>
                        <li>Asignación y seguimiento de tareas</li>
                        <li>Comunicación directa con tus estudiantes</li>
                    </ul>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/home.webp" alt="Logo" />
                    </div>

                    <h2>2. Primeros pasos</h2>
                    <p>
                        Para comenzar a utilizar ClassBridge:
                    </p>
                    <ul>
                        <li>Regístrate en la plataforma o inicia sesión con tus credenciales</li>
                        <li>Una vez dentro, accederás a tu panel principal</li>
                        <li>Familiarízate con el menú lateral que contiene todas las opciones:</li>
                        <ul>
                            <li>Hogar (Dashboard principal)</li>
                            <li>Cursos (Gestión de cursos)</li>
                            <li>Usuarios (Gestión de estudiantes)</li>
                            <li>Tareas (Gestión de asignaciones)</li>
                            <li>Configuración (Ajustes de tu aula)</li>
                        </ul>
                        <li>El menú lateral será tu punto de acceso a todas las funcionalidades de la plataforma.</li>
                    </ul>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/nav.webp" alt="Menú lateral" />
                    </div>

                    <h2>3. Estructura de contenido educativo</h2>
                    <p>
                        ClassBridge organiza tu contenido educativo en una estructura jerárquica que te permite mantener todo ordenado:
                    </p>
                    <ul>
                        <li><strong>Cursos:</strong> Son las unidades principales de organización (por ejemplo, "Matemáticas 1º ESO")</li>
                        <li><strong>Apartados:</strong> Dividen el curso en secciones temáticas (por ejemplo, "Álgebra", "Geometría")</li>
                        <li><strong>Categorías:</strong> Subdividen los apartados para una mejor organización (por ejemplo, "Ejercicios", "Teoría")</li>
                        <li><strong>Contenido:</strong> Documentos y tareas que compartes con tus estudiantes</li>
                    </ul>
                    <p>
                        Esta estructura te permite organizar tu material didáctico de forma lógica y accesible.
                    </p>

                    <h2>4. Creación y gestión de cursos</h2>
                    <p>
                        Para crear un nuevo curso:
                    </p>
                    <ul>
                        <li>Accede a la sección "Cursos" desde el menú lateral</li>
                        <li>Haz clic en "Crear un nuevo curso"</li>
                        <li>En la pantalla de creación, completa la información básica:</li>
                        <ul>
                            <li>Escribe el nombre del curso (debe tener al menos 3 caracteres)</li>
                            <li>Opcionalmente, sube una imagen de portada para el curso</li>
                            <li>Selecciona los usuarios que tendrán acceso al curso</li>
                        </ul>
                        <li>Haz clic en "Crear curso" para guardar</li>
                    </ul>
                    <p>
                        Recuerda que un curso bien estructurado facilita el aprendizaje de tus estudiantes.
                    </p>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/course.webp" alt="Creación de curso" />
                    </div>

                    <h2>5. Gestión de apartados y categorías</h2>
                    <p>
                        Una vez creado el curso, debes organizarlo en apartados y categorías:
                    </p>
                    <ul>
                        <li>En la página de edición del curso, selecciona la pestaña "Apartados"</li>
                        <li>Crea los apartados principales de tu curso:</li>
                        <ul>
                            <li>Escribe el nombre del apartado</li>
                            <li>Haz clic en "Crear"</li>
                        </ul>
                        <li>Luego, ve a la pestaña "Categorías" para crear categorías dentro de cada apartado:</li>
                        <ul>
                            <li>Selecciona el apartado donde quieres crear la categoría</li>
                            <li>Escribe el nombre de la categoría</li>
                            <li>Haz clic en "Crear"</li>
                        </ul>
                    </ul>
                    <p>
                        Esta organización te permitirá estructurar tu contenido de manera clara y accesible.
                    </p>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/cat.webp" alt="Apartados y categorías" />
                    </div>

                    <h2>6. Gestión de documentos</h2>
                    <p>
                        Para subir documentos a tu curso:
                    </p>
                    <ul>
                        <li>En la página de edición del curso, selecciona la pestaña "Docs"</li>
                        <li>Selecciona el apartado y la categoría donde quieres subir el documento</li>
                        <li>Haz clic en "Subir Doc"</li>
                        <li>Completa el formulario:</li>
                        <ul>
                            <li>Escribe un nombre descriptivo para el documento</li>
                            <li>Selecciona el archivo desde tu ordenador (máximo 10MB)</li>
                            <li>Verifica que el formato sea compatible (.pdf, .doc, .docx, .odt, .txt, .rtf, .xls, .xlsx, .ods, .ppt, .pptx, .odp, .jpg, .jpeg, .png, .gif, .zip, .rar, .7z)</li>
                        </ul>
                        <li>Haz clic en "Crear" para subir el documento</li>
                    </ul>
                    <p>
                        Los documentos estarán disponibles para los estudiantes que tengan acceso al curso.
                    </p>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/doc.webp" alt="Subida de documentos" />
                    </div>

                    <h2>7. Gestión de tareas</h2>
                    <p>
                        Para crear tareas para tus estudiantes:
                    </p>
                    <ul>
                        <li>En la página de edición del curso, selecciona la pestaña "Docs"</li>
                        <li>Selecciona el apartado y la categoría donde quieres crear la tarea</li>
                        <li>Haz clic en "Crear Tarea"</li>
                        <li>Completa el formulario:</li>
                        <ul>
                            <li>Escribe un nombre o descripción clara para la tarea</li>
                            <li>Establece una fecha límite de entrega</li>
                        </ul>
                        <li>Haz clic en "Crear" para añadir la tarea</li>
                    </ul>
                    <p>
                        Para revisar o modificar tareas existentes:
                    </p>
                    <ul>
                        <li>Selecciona la tarea de la lista desplegable</li>
                        <li>Modifica los campos necesarios</li>
                        <li>Guarda los cambios o elimina la tarea si es necesario</li>
                    </ul>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/tar.webp" alt="Creación de tareas" />
                    </div>

                    <h2>8. Panel de control del profesor</h2>
                    <p>
                        El dashboard principal te ofrece una visión general de tu aula:
                    </p>
                    <ul>
                        <li>Accede a "Hogar" desde el menú lateral</li>
                        <li>Aquí podrás ver:</li>
                        <ul>
                            <li>Tus cursos activos</li>
                            <li>Tareas pendientes de revisión</li>
                            <li>Actividad reciente de tus estudiantes</li>
                        </ul>
                        <li>Utiliza el botón de actualización para refrescar la información</li>
                    </ul>
                    <p>
                        Este panel te permite tener un control rápido de toda la actividad en tu aula virtual.
                    </p>

                    <h2>9. Interacción con estudiantes</h2>
                    <p>
                        ClassBridge te permite mantener una comunicación efectiva con tus estudiantes:
                    </p>
                    <ul>
                        <li>Revisa las entregas de tareas desde la sección "Tareas"</li>
                        <li>Proporciona retroalimentación y calificaciones a cada entrega</li>
                        <li>Responde a las dudas y comentarios de los estudiantes</li>
                        <li>Realiza un seguimiento del progreso individual</li>
                    </ul>
                    <p>
                        Una comunicación fluida mejora significativamente la experiencia de aprendizaje.
                    </p>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/entr.webp" alt="Revisión de tareas" />
                    </div>

                    <h2>10. Configuración avanzada</h2>
                    <p>
                        Personaliza tu aula según tus necesidades:
                    </p>
                    <ul>
                        <li>Accede a "Configuración" desde el menú lateral</li>
                        <li>Ajusta las opciones disponibles:</li>
                        <ul>
                            <li>Privacidad y permisos</li>
                            <li>Notificaciones</li>
                            <li>Apariencia de tu aula</li>
                        </ul>
                        <li>Gestiona los usuarios y sus roles</li>
                    </ul>
                    <p>
                        La configuración adecuada te ayudará a adaptar la plataforma a tu estilo de enseñanza.
                    </p>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/conf.webp" alt="Panel de configuración" />
                    </div>

                    <h2>11. Uso de Guali (asistente)</h2>
                    <p>
                        Guali es tu asistente virtual dentro de ClassBridge:
                    </p>
                    <ul>
                        <li>Encuentra el acceso a Guali en el menú lateral</li>
                        <li>Haz clic en el botón "Dale!" para iniciar una conversación</li>
                        <li>Pregunta cualquier duda sobre el funcionamiento de la plataforma</li>
                        <li>Utiliza comandos específicos para obtener ayuda rápida</li>
                    </ul>
                    <p>
                        Guali está diseñado para resolver tus dudas y ayudarte a aprovechar al máximo la plataforma.
                    </p>
                    <div className='tutorial-img-container'>
                        <img src="/assets/images/tutorial/guali.webp" alt="Conversación con Guali" />
                    </div>

                    <h2>12. Preguntas frecuentes y solución de problemas</h2>
                    <p>
                        Si tienes dudas o encuentras dificultades:
                    </p>
                    <ul>
                        <li>Accede a la sección "¿Cómo funciona?" desde el menú lateral</li>
                        <li>Consulta las preguntas frecuentes organizadas por categorías</li>
                        <li>Sigue las guías paso a paso para resolver problemas comunes</li>
                        <li>Si no encuentras solución, contacta con nuestro soporte técnico</li>
                    </ul>
                    <p>
                        Estamos comprometidos a brindarte la mejor experiencia posible en ClassBridge.
                    </p>

                    <h2>¡Felicidades!</h2>
                    <p>
                        Ahora estás listo para aprovechar todas las funcionalidades que ClassBridge tiene para ofrecerte. Recuerda que esta plataforma ha sido diseñada para facilitar tu labor docente, permitiéndote centrarte en lo que realmente importa: la enseñanza.
                    </p>
                </div>
            </div>
        </div>
    );
}