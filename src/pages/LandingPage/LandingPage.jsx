import "./LandingPage.css";

export default function LandingPage() {

  return (
    <div className="landing-container">
      <header className="hero">
        <h1>Bienvenido a </h1>
        <img id="text-logo" src="/assets/images/logos/text-logo.png" alt="" />
        <p>La plataforma de creacion de aulas virtuales que te permite enseñar a tu manera, olvidate de esa vieja impresora y de repartir papelitos..</p>
        <a href="#planes" className="btn-primary">Ver Planes</a>
      </header>

      <section id="nosotros" className="section">
        <h2>¿Por qué nosotros?</h2>
        <p>Ofrecemos calidad, garantía y servicio al cliente.</p>
      </section>

      <section id="planes" className="section">
        <h2>Nuestros Planes</h2>
        <div className="planes-container">
          PLANES
        </div>
      </section>

      <section id="faq" className="section">
        <h2>Preguntas Frecuentes</h2>
        <p>Resolvemos tus dudas antes de comprar.</p>
      </section>

      <section id="contacto" className="section">
        <h2>Contacto</h2>
        <p>Habla con nuestros asesores para más información.</p>
      </section>
    </div>
  );
}