import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ isLoggedIn, onLogout }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img src={logo} alt="logo" className="header__logo" />

      <nav className="header__nav">
        {isLoggedIn ? (
          <button onClick={onLogout}>Cerrar sesión</button>
        ) : location.pathname === "/signin" ? (
          <Link to="/signup">Registrarse</Link>
        ) : (
          <Link to="/signin">Iniciar sesión</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
