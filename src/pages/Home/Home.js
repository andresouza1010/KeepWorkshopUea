import styles from "./Home.module.css"; 
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import 'font-awesome/css/font-awesome.min.css';

const Home = () => {
    const [selectedCategories, setSelectedCategories] = useState([]); // Array para armazenar as categorias selecionadas
    const { documents: oficinas, loading } = useFetchDocuments("oficinas");
    //const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(cat => cat !== category) // Remove a categoria se já estiver selecionada
                : [...prev, category] // Adiciona a nova categoria
        );
    };

    // Filtrando oficinas com base nas categorias selecionadas
    const filteredOficinas = oficinas?.filter(oficina => 
        selectedCategories.length === 0 || selectedCategories.includes(oficina.category)
    ) || [];

    return (
        <div className={styles.home}>
            <div className={styles.filter_bar}>
                <div className={styles.filter_dropdown}>
                    <button 
                        type="button" 
                        className={styles.filter_button}
                    >
                        Filtrar Categorias
                        <i className={`fa fa-angle-down ${styles.icon_down}`}></i> {/* Ícone de seta */}
                    </button>

                    {/* Dropdown com categorias */}
                    <div className={styles.filter_menu}>
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
            </div>

            <div className={styles.postDetail}>
                {loading && <p>Carregando...</p>}
                {filteredOficinas && filteredOficinas.map((oficina) => (
                    <div key={oficina.id}>
                        <PostDetail oficina={oficina} />
                    </div>
                ))}
                {filteredOficinas.length === 0 && (
                    <div className={styles.noposts}>
                         <p className={styles.message}>Oficinas não encontradas</p>
                         <Link to="/oficinas/create" className={`${styles.btn} btn`}>Criar Primeira Oficina</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
