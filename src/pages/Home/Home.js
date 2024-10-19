import styles from "./Home.module.css"; 
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import 'font-awesome/css/font-awesome.min.css';

const Home = () => {
    const [query, setQuery] = useState("");
    const { documents: oficinas, loading } = useFetchDocuments("oficinas");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    return (
        <div className={styles.home}>
           
            <form onSubmit={handleSubmit} className={styles.search_form}>
            <button type="button" className={`${styles.btn} ${styles.btnFilter}`}>
                 <i className="fa fa-filter"></i> {/* Aqui está o ícone de filtro */}
            </button>

                <input
                    type="text"
                    placeholder="Ou busque por título..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className={`${styles.btn} ${styles.btnSearch}`}>
    <i className="fa fa-search"></i> {/* Aqui está o ícone de lupa */}
</button>

            </form>
            <div className={styles.postDetail}>
                {loading && <p>Carregando...</p>}
                {oficinas && oficinas.map((oficina) => (
                    <PostDetail key={oficina.id} oficina={oficina} />
                ))}
                {oficinas && oficinas.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Oficinas não encontradas</p>
                        <Link to="/oficinas/create" className="btn">Criar Primeira Oficina</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
