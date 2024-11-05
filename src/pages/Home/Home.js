import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { useAuthentication } from "../../hooks/useAuthentication";
import 'font-awesome/css/font-awesome.min.css';
import imagemDeteste from "../Imagens/imagemdeteste3.jpg";
import filterInfo from "../Imagens/filter.png";
import categoriaInfo from "../Imagens/classification.png";
import acessibilidadeInfo from "../Imagens/public-service.png";




const Home = () => {
    const { auth } = useAuthentication();
    const isLoggedIn = !!auth.currentUser;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAges, setSelectedAges] = useState([]);
    const [selectedAccessibility, setSelectedAccessibility] = useState([]); // Estado para opções de acessibilidade
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);
    const [showAgeFilter, setShowAgeFilter] = useState(false);
    const [showAccessibilityFilter, setShowAccessibilityFilter] = useState(false); // Estado para mostrar/ocultar filtro de acessibilidade
    const { documents: oficinas, loading } = useFetchDocuments("oficinas");

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    };

    const handleAgeChange = (age) => {
        setSelectedAges(prev =>
            prev.includes(age)
                ? prev.filter(a => a !== age)
                : [...prev, age]
        );
    };

    const handleAccessibilityChange = (accessibility) => {
        setSelectedAccessibility(prev =>
            prev.includes(accessibility)
                ? prev.filter(a => a !== accessibility)
                : [...prev, accessibility]
        );
    };

    const filteredOficinas = oficinas?.filter(oficina =>
        (selectedCategories.length === 0 || selectedCategories.includes(oficina.category)) &&
        (selectedAges.length === 0 || selectedAges.includes(oficina.ageGroup)) &&
        (selectedAccessibility.length === 0 || selectedAccessibility.includes(oficina.accessibility))
    ) || [];

    const toggleCategoryFilter = () => {
        setShowCategoryFilter(prev => !prev);
    };

    const toggleAgeFilter = () => {
        setShowAgeFilter(prev => !prev);
    };

    const toggleAccessibilityFilter = () => {
        setShowAccessibilityFilter(prev => !prev);
    };

    return (
        <div className={styles.home}>
            {!isLoggedIn && (
                <>
                    <div className={styles.hero}>
                        <div className={styles.heroContent} style={{ backgroundImage: `url(${imagemDeteste})` }}>
                            <h1>Bem-vindo ao Keep Workshop!</h1>
                            <p className={styles.description}>
                                Descubra e compartilhe oficinas makers em uma plataforma colaborativa.
                            </p>
                            <button className={styles.acessarButton}>
                                <Link to="/register" className={styles.acessarLink}>Acessar</Link>
                            </button>
                        </div>
                    </div>

                    {/* Painéis de Benefícios */}
                    <div className={styles.benefitsContainer}>
                        <div className={styles.benefitPanel} onClick={toggleAgeFilter}>
                            <img src={filterInfo} alt="Filtros por Idade" className={styles.benefitImage} />
                            <h3>Encontre Oficinas por Idade</h3>
                            <p>Filtre rapidamente oficinas recomendadas para diferentes faixas etárias.</p>
                        </div>
                        <div className={styles.benefitPanel} onClick={toggleCategoryFilter}>
                            <img src={categoriaInfo} alt="Filtros por Categoria" className={styles.benefitImage} />
                            <h3>Explore por Categorias</h3>
                            <p>Encontre oficinas específicas, desde robótica até artesanato e muito mais.</p>
                        </div>
                        <div className={styles.benefitPanel} onClick={toggleAccessibilityFilter}>
                            <img src={acessibilidadeInfo} alt="Oficinas Acessíveis" className={styles.benefitImage} />
                            <h3>Acesse Oficinas Acessíveis</h3>
                            <p>Encontre oficinas inclusivas com recursos adaptados e instruções detalhadas.</p>
                        </div>
                    </div>
                </>
            )}

            {/* Filtro de Categorias */}
            {showCategoryFilter && (
                <div className={styles.filter_bar}>
                    <div className={styles.filter_text}>
                        <span>Filtrar por Categoria:</span>
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

            {/* Filtro de Idades */}
            {showAgeFilter && (
                <div className={styles.filter_bar}>
                    <div className={styles.filter_text}>
                        <span>Filtrar por Idade:</span>
                        {["4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 15 anos", "16 anos ou mais"].map((age) => (
                            <label key={age} className={styles.checkbox_label}>
                                <input
                                    type="checkbox"
                                    value={age}
                                    checked={selectedAges.includes(age)}
                                    onChange={() => handleAgeChange(age)}
                                />
                                {age}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Filtro de Acessibilidade */}
            {showAccessibilityFilter && (
                <div className={styles.filter_bar}>
                    <div className={styles.filter_text}>
                        <span>Filtrar por Acessibilidade:</span>
                        {["Autismo", "TDAH", "Dislexia", "Deficiência Visual", "Deficiência Auditiva"].map((accessibility) => (
                            <label key={accessibility} className={styles.checkbox_label}>
                                <input
                                    type="checkbox"
                                    value={accessibility}
                                    checked={selectedAccessibility.includes(accessibility)}
                                    onChange={() => handleAccessibilityChange(accessibility)}
                                />
                                {accessibility}
                            </label>
                        ))}
                    </div>
                </div>
            )}
<div className={styles.heroSection}>
    <h2 className={styles.titlep}>Explore as oficinas</h2>
    <p className={styles.descriptionp}>Descubra oficinas criativas e participe de projetos que aprimoram suas habilidades!</p>
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
