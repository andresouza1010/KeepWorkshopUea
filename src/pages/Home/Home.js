import styles from "./Home.module.css"; 
import { Link } from "react-router-dom"; 
import { useState } from "react"; 
import { useFetchDocuments } from "../../hooks/useFetchDocuments"; 
import PostDetail from "../../components/PostDetail"; 
import { useAuthentication } from "../../hooks/useAuthentication"; 
import 'font-awesome/css/font-awesome.min.css';
import imagemDeteste from './imagemdeteste.jpg';

const Home = () => {
    const { auth } = useAuthentication(); 
    const isLoggedIn = !!auth.currentUser; 
    const [selectedCategories, setSelectedCategories] = useState([]); 
    const { documents: oficinas, loading } = useFetchDocuments("oficinas");

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(cat => cat !== category) 
                : [...prev, category] 
        );
    };

    const filteredOficinas = oficinas?.filter(oficina => 
        selectedCategories.length === 0 || selectedCategories.includes(oficina.category)
    ) || [];

    return (
        <div className={styles.home}>
            {!isLoggedIn && ( 
                <div className={styles.hero}>
                    <div className={styles.heroContent} style={{ backgroundImage: `url(${imagemDeteste})` }}>
                        <h1>Bem-vindo ao nosso site de Oficinas!</h1>
                        <button>
                            <Link to="/register">Acesse aqui</Link>
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.filter_bar}>
                <div className={styles.filter_text}>
                    <span>Filtrar por:</span>
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

            <div className={styles.postDetail}>
                {loading && <p>Carregando...</p>}
                {filteredOficinas && filteredOficinas.map((oficina) => (
                    <div key={oficina.id}>
                        <PostDetail oficina={oficina} />
                    </div>
                ))}
                {filteredOficinas.length === 0 && (
                    <div className={styles.oficinasNao}>
                        <p className={styles.message}>Oficinas não encontradas</p>
                        <Link to="/oficinas/create" className={`${styles.btn} btn`}>Criar Primeira Oficina</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
