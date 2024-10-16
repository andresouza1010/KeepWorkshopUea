import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import styles from "./NavBar.module.css";
import { useState } from "react";

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar a visibilidade do dropdown

  // Função para alternar a visibilidade do dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
  <NavLink to="/" className={styles.brand}>
    Keep <strong>Workshop</strong>
  </NavLink>

  <ul className={styles.links_list}>
    {!user && (
      <>
        <li>
          <NavLink to="/Login" className={({ isActive }) => (isActive ? styles.active : "")}>
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink to="/Register" className={({ isActive }) => (isActive ? styles.active : "")}>
            Cadastrar
          </NavLink>
        </li>
      </>
    )}

    {user && (
      <>
        <li>
          <NavLink 
          to="/oficinas/create" 
          className={({ isActive }) => (isActive ? styles.active : "")}>
            Nova Oficina
          </NavLink>
        </li>
        <li>
          <NavLink to="/Dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
            Minhas Oficinas
          </NavLink>
        </li>
      </>
    )}
  </ul>

  {user && (
    <div className={styles.profile}>
      <button onClick={toggleDropdown} className={styles.profileButton}>
        Perfil
      </button>

      {dropdownOpen && (
        <div className={styles.dropdown}>
          <button onClick={logout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      )}
    </div>
  )}
</nav>
  );
}
export default NavBar;
