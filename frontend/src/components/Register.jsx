import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>

      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          required
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={handleChange}
        />

        <input
          className="register__input"
          required
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />

        <button type="submit" className="register__button">
          Regístrate
        </button>
      </form>

      <p className="register__text">
        ¿Ya eres miembro?{" "}
        <Link to="/signin" className="register__link">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

export default Register;
