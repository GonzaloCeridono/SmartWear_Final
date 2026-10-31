import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carrito from "./Carrito";
// 1. Cambiamos la importación al nuevo slice de autenticación
import { logout } from "../features/auth/authSlice";
import styles from "../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const handleLogout = () => {
    dispatch(logout()); // 3. Usamos la nueva acción 'logout'
    setMenuAbierto(false);
  };

  const goToLogin = () => {
    navigate("/login");
    setMenuAbierto(false);
  };

  const [abrirCarrito, setAbrirCarrito] = useState(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.logoLink}>SmartWear</h1>

      <button
        className={styles.btnMenuLabel}
        aria-label="Abrir menú"
        onClick={toggleMenu}
      >
        <img src="./assets/icons/menu.png" alt="Ícono de menú" />
      </button>

      <nav
        className={`${styles.barraNavegacion} ${
          menuAbierto ? styles.menuAbierto : ""
        }`}
      >
        <Link to="/" onClick={() => setMenuAbierto(false)}>
          Inicio
        </Link>
        <Link to="/nosotros" onClick={() => setMenuAbierto(false)}>
          Nosotros
        </Link>
        <Link to="/catalogo" onClick={() => setMenuAbierto(false)}>
          Catálogo
        </Link>
        <Link to="/contacto" onClick={() => setMenuAbierto(false)}>
          Contacto
        </Link>

        {isAuthenticated ? (
          <button onClick={handleLogout} className={styles.btnLoginMobile}>
            Cerrar sesión ({user?.nombre})
          </button>
        ) : (
          <button onClick={goToLogin} className={styles.btnLoginMobile}>
            Iniciar sesión
          </button>
        )}
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.abrirCarrito}
          onClick={() => setAbrirCarrito(true)}
        >
          <img
            src="./assets/icons/carrito.png"
            alt="Ícono de carrito"
            className={styles.iconoCarrito}
          />
          <span className={styles.cartCount}>{items.length}</span>
        </button>

        {isAuthenticated ? (
          <button onClick={handleLogout} className={styles.btnLogin}>
            Cerrar sesión ({user?.nombre})
          </button>
        ) : (
          <button onClick={goToLogin} className={styles.btnLogin}>
            <img
              src="./assets/icons/user.png"
              alt="Ícono de usuario"
              className={styles.iconoUsuario}
            />
            Iniciar sesión
          </button>
        )}
      </div>

      {abrirCarrito && <Carrito onClose={() => setAbrirCarrito(false)} />}
    </header>
  );
}
