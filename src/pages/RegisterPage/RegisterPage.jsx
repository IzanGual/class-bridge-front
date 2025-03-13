export default function RegisterPage() {
  

  return (
    <div className="registro-container">
      <h2>Formulario de Registro</h2>
      <form>
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Tu nombre"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Tu correo"
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Tu contraseña"
          required
        />

        <button type="submit" className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
}