import { useState, useEffect } from "react";
import "./LandingPage.css";
import PlansModel from "../../models/PlansModel";
import Plan from "../../components/Plan/Plan";
import { useNavigate } from "react-router-dom";

export default function LandingPage({aulas}) {
  const [planes, setPlanes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const data = await PlansModel.getAllPlans(); 
        setPlanes(data); 
        // console.log("Planes:", data);
      } catch (error) {
        console.error("Error al obtener los planes:", error);
      }
    };

    window.scrollTo(0, 0);

    fetchPlanes();
  }, []);

  const handleGoToAula = (aula) => {
      navigate(`/bridgeto/${aula.nombre}`);
  }

  return (
    <div className="landing-option-container mg-top">
      {/* Header/Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-text">
                Transforma la educación con <span className="class-name">classbridge</span>
              </h1>
              <p className="landing-sub">
                Plataforma de gestión de aprendizaje que conecta profesores y estudiantes en un entorno digital
                estructurado y eficiente.
              </p>
          <a href="#planes" className="btn-primary">
            Ver Plan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="34px"
              fill="currentColor"
            >
              <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
            </svg>
          </a>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <img src="/assets/images/landing/hero.webp" alt="preview" />
          </div>
        </div>
      </header>

      {/* Logos de clientes dinámicos según aulas */}
      <p className="testimonial-description">
                Todas estas aulas han confiado en class-bridge :)
      </p>
      <div className="client-logos">
        {aulas && aulas.length > 0 ? (
          aulas.map((aula, idx) => (
            <div onClick={() => handleGoToAula(aula)} className="logo-placeholder" key={aula.id || idx}>
              {aula.nombre}
            </div>
          ))
        ) : (
          <>
            <div className="logo-placeholder">guali</div>
            <div className="logo-placeholder">eliroad</div>
            <div className="logo-placeholder">repasoSandra</div>
          </>
        )}
      </div>

      {/* Por qué nosotros */}
      <section id="nosotros" className="section features-section">
        <div className="section-header">
          <h2>¿Por qué nosotros?</h2>
          <p className="section-description">
            Diseñado para transformar la experiencia educativa tanto para profesores como para estudiantes
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3>Aulas virtuales intuitivas</h3>
            <p>Crea y gestiona aulas virtuales con una interfaz intuitiva que facilita la organización del contenido educativo.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Gestión de usuarios</h3>
            <p>Gestiona quien puede o no acceder a tus cursos dando, quitando permisos y creando los usuarios de tus propios alumnos.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>Contenido interactivo</h3>
            <p>Crea lecciones interactivas con diversos tipos de contenido multimedia para mejorar la experiencia de aprendizaje.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3>Personalización</h3>
            <p>Personaliza tu aula con el color que más te represente, comparte el QR de tu aula con tus alumnos.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>Evaluaciones</h3>
            <p>Califica a tus alumnos de forma intuitiva, ahorrando tiempo y proporcionando retroalimentación inmediata.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h3>Habla con guali</h3>
            <p>Tanto tu como tus alumnos contareis con una IA especializada en la enseñanza que puede ayudarte a cualquer cosa.</p>
          </div>
        </div>
      </section>

      {/* Plataforma Preview */}
      <section className="section platform-preview">
        <div className="section-header">
          <h2>Una plataforma completa para la educación moderna</h2>
          <p className="section-description">
            Diseñada para satisfacer todas las necesidades de la enseñanza digital
          </p>
        </div>
        <div className="platform-image">
          <div className="large">

              <div className="large-img-container">
                <img src="/assets/images/landing/heroView.webp" alt="preview" />   
              </div>
              <div className="large-img-container">
                <img src="/assets/images/landing/heroConf.webp" alt="preview" />   
              </div>
              <div className="large-img-container">
                <img src="/assets/images/landing/heroPhone.webp" alt="preview" />   
              </div>

          </div>
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="section plans-section">
        <div className="section-header">
          <h2>Nuestro Plan</h2>
          <p className="section-description">
            Prueba nuestro servicio de forma gratuita por tiempo ILIMITADO.
          </p>
        </div>
        <div className="planes-container">
          {planes.length > 0 ? (
            planes.map((plan, index) => (
              <Plan key={index} fullPlan={plan} />
            ))
          ) : (
            <div className="loading-plans">
              sin planes ahora mismo :(
            </div>
          )}
        </div>
      </section>

      {/* Testimonios */}
      <section className="section testimonials-section">
        <div className="section-header">
          <h2>Lo que dicen nuestros usuarios</h2>
          <p className="section-description">
            Miles de educadores confían en nuestra plataforma para transformar su enseñanza
          </p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar-placeholder"></div>
              <div className="testimonial-author">
                <h4>María Rodríguez</h4>
                <p>Academia Borriol</p>
              </div>
            </div>
            <p className="testimonial-text">
              "Esta plataforma ha transformado mi forma de enseñar. Ahora puedo crear contenido interactivo que mantiene a mis estudiantes comprometidos y motivados."
            </p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar-placeholder"></div>
              <div className="testimonial-author">
                <h4>Carlos Martínez</h4>
                <p>Academia de inglés</p>
              </div>
            </div>
            <p className="testimonial-text">
              "La implementación de esta plataforma en nuestro centro ha mejorado significativamente la comunicación entre profesores y estudiantes, especialmente durante los periodos de enseñanza a distancia."
            </p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar-placeholder"></div>
              <div className="testimonial-author">
                <h4>Laura Sánchez</h4>
                <p>Profesora en eliroad</p>
              </div>
            </div>
            <p className="testimonial-text">
              "guali, nos ha sido de gran ayuda tanto a mi como a mis estudiantes, es una gran IA educatia si duda!"
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq-section">
        <div className="section-header">
          <h2>Preguntas Frecuentes</h2>
          <p className="section-description">
            Respuestas a las preguntas más comunes sobre nuestra plataforma
          </p>
        </div>
        <div className="faq-container">
          <div className="faq-item">
            <div className="faq-question">
              <h3>¿Qué es esta plataforma?</h3>
              <span className="faq-toggle">*</span>
            </div>
            <div className="faq-answer">
              <p>Es un sistema de gestión de aprendizaje (LMS) que permite a los profesores crear aulas virtuales, gestionar cursos y entregar contenido educativo a los estudiantes en un entorno digital estructurado.</p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <h3>¿Necesito conocimientos técnicos para usarla?</h3>
              <span className="faq-toggle">*</span>
            </div>
            <div className="faq-answer">
              <p>No, está diseñada con una interfaz intuitiva que no requiere conocimientos técnicos avanzados. Ofrecemos tutoriales y soporte para ayudarte a comenzar rápidamente.</p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <h3>¿Es realmente 100% gratuita?</h3>
              <span className="faq-toggle">*</span>
            </div>
            <div className="faq-answer">
              <p>Sí, ofrecemos esta opción ya que es una plataforma nueva, si la contratas ahora mismo sera gratuita para siempre. Aprovecha que la oferta no durara para siempre!</p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <h3>¿Cómo garantiza la privacidad de los datos?</h3>
              <span className="faq-toggle">*</span>
            </div>
            <div className="faq-answer">
              <p>Cumplimos con las normativas de protección de datos educativos, incluyendo GDPR y otras regulaciones internacionales. Todos los datos están encriptados y almacenados de forma segura.</p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <h3>¿La ia guali le resolvera los ejercicios a mis alumos?</h3>
              <span className="faq-toggle">*</span>
            </div>
            <div className="faq-answer">
              <p>No, es una ia especializada en ayudar a realizar ejercicios sin darle una respuesta concreta al alumno, asi que no te preocupes, el/la alumno/a aprenderá siempre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-header text-left">
              <h2>¿Listo para transformar tu enseñanza?</h2>
              <p className="section-description">
                Contacta con nuestro equipo para obtener más información o programar una demostración personalizada.
              </p>
            </div>
            
          </div>

          <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>izangualmart@gmail.com</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h4>Teléfono</h4>
                  <p>+34 622 7662 37</p>
                </div>
              </div>
            </div>

          

        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Comienza tu viaje con nosotros hoy</h2>
          <p>Únete a miles de educadores que ya están transformando su enseñanza con nuestra plataforma</p>
          <div className="cta-buttons">
            <a href="#planes" className="btn-seleccionar">Úneme</a>
          </div>
        </div>
      </section>
    </div>
  );
}