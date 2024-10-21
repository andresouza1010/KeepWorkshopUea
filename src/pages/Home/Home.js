import styles from "./Home.module.css"; 
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import 'font-awesome/css/font-awesome.min.css';

const Home = () => {
    const [query, setQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]); // Array para armazenar as categorias selecionadas
    const [dropdownVisible, setDropdownVisible] = useState(false); // Estado para controlar a visibilidade do dropdown
    const { documents: oficinas, loading } = useFetchDocuments("oficinas");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(cat => cat !== category) // Remove a categoria se já estiver selecionada
                : [...prev, category] // Adiciona a nova categoria
        );
    };

    // Filtrando oficinas com base nas categorias selecionadas
    const filteredOficinas = oficinas?.filter(oficina => 
        selectedCategories.length === 0 || selectedCategories.includes(oficina.category) // Filtra apenas pelas categorias selecionadas
    ) || []; // Adiciona fallback para um array vazio

    return (
        <div className={styles.home}>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <button 
                    type="button" 
                    className={`${styles.btn} ${styles.btnFilter}`}
                    onClick={() => setDropdownVisible(prev => !prev)} // Alterna a visibilidade do dropdown
                >
                    <i className="fa fa-filter"></i> {/* Ícone de filtro */}
                </button>

                {/* Dropdown de categorias */}
                {dropdownVisible && (
                    <div className={styles.category_filter}>
                        <h4>Categorias:</h4>
                        <div className={styles.checkbox_group}>
                            {["Eletrônica", "Programação", "Mecânica", "Robótica", "Engenharia", "Arte e design", "Reciclagem e sustentabilidade", "Edição de vídeo e voz"].map((category) => (
                                <label key={category} className={styles.checkbox_label}>
                                    <input 
                                        type="checkbox" 
                                        value={category} 
                                        checked={selectedCategories.includes(category)} 
                                        onChange={() => handleCategoryChange(category)} 
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Ou busque por título..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className={`${styles.btn} ${styles.btnSearch}`}>
                    <i className="fa fa-search"></i> {/* Ícone de lupa */}
                </button>
            </form>
            
            <div className={styles.postDetail}>
                {loading && <p>Carregando...</p>}
                {filteredOficinas && filteredOficinas.map((oficina) => (
                    <PostDetail key={oficina.id} oficina={oficina} />
                ))}
                {filteredOficinas.length === 0 && (
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
