import { NavLink, useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import styles from "./NavBar.module.css";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Keep <strong>Workshop</strong>
      </NavLink>

      <form onSubmit={handleSearch} className={styles.search_form}>
      
      
          <input
            type="text"
            placeholder="Busque a sua Oficina..."
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search_input}
          />
          <button className={styles.search_button}>
            <i className="fa fa-search"></i>
          </button>
        
      </form>

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
              <NavLink to="/oficinas/create" className={({ isActive }) => (isActive ? styles.active : "")}>
                Nova Oficina
              </NavLink>
            </li>
            <li>
              <NavLink to="/Dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
                Minhas Oficinas
              </NavLink>
            </li>
            <li>
              <NavLink to="/favoritas" className={({ isActive }) => (isActive ? styles.active : "")}>
                Favoritas
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {user && (
        <div className={styles.profile}>
          <button onClick={toggleDropdown} className={styles.profileButton}>
            <FaUser />
          </button>
          {dropdownOpen && (
            <div className={styles.dropdown}>
              <NavLink to="/Opcoes" className={styles.dropdownOption}>
                Opções
              </NavLink>
              <button onClick={logout} className={styles.logoutButton}>
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
