import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

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
            <h1>Veja as nossas oficinas mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value)} />
                <button className="btn btn-dark">Pesquisar</button>
            </form>
            <div className={styles.postDetail}>
                {loading && <p>Carregando...</p>}
                {oficinas && oficinas.map((oficina) => <PostDetail key={oficina.id} oficina={oficina} />)}
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
