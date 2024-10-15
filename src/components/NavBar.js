import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Keep <span>Workshop</span>
            </NavLink>

            <ul className={styles.links_list}>
                {/* Links disponíveis para todos */}
                {!user && (
                    <>
                        <li>
                            <NavLink
                                to="/Login"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Register"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}

                {/* Links exclusivos para usuários logados */}
                {user && (
                    <>
                        <li>
                            <NavLink
                                to="/oficinas/create"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Nova Oficina
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Dashboard"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                Minhas Oficinas
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={logout}>Sair legal</button>
                        </li>
                    </>
                )}
            </ul>

            {user && (
                <div className={styles.profile}>
                    <NavLink
                        to="/Perfil"
                        className={({ isActive }) =>
                            isActive ? styles.active : ""
                        }
                    >
                        Perfil
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
