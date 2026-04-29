import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Inicia sesión</h2>

      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          required
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleChange}
        />

        <input
          className="login__input"
          required
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />

        <button type="submit" className="login__button">
          Inicia sesión
        </button>
      </form>

      <p className="login__text">
        ¿Aún no eres miembro?{" "}
        <Link to="/signup" className="login__link">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default Login;
