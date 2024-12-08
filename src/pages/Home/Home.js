// Importa o módulo CSS para estilização do componente Home
import styles from "./Home.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { useAuthentication } from "../../hooks/useAuthentication";
import 'font-awesome/css/font-awesome.min.css';

// Importa imagens utilizadas no componente
import imagemDeteste from "../Imagens/imagemdeteste3.jpg";
import filterInfo from "../Imagens/filter.png";
import categoriaInfo from "../Imagens/classification.png";
import acessibilidadeInfo from "../Imagens/public-service.png";

// Importa um componente alternativo para exibir detalhes quando o usuário não está logado
import PostDetailUsuarioNaoLogado from '../../components/PostDetailUsuarioNaoLogado';

// Importa o ícone de filtro da biblioteca react-icons
import { FaFilter } from 'react-icons/fa';

// Define o componente funcional Home
const Home = () => {
    // Extrai o objeto auth do hook de autenticação
    const { auth } = useAuthentication();
    // Verifica se o usuário está logado
    const isLoggedIn = !!auth.currentUser;

    // Define estados para filtros de categoria, idade, acessibilidade e visibilidade de filtros
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAges, setSelectedAges] = useState([]);
    const [selectedAccessibility, setSelectedAccessibility] = useState([]);
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);
    const [showAgeFilter, setShowAgeFilter] = useState(false);
    const [showAccessibilityFilter, setShowAccessibilityFilter] = useState(false);
    // Busca documentos da coleção "oficinas" e define estado para loading
    const { documents: oficinas, loading } = useFetchDocuments("oficinas");

    // Estado para controlar a visibilidade do dropdown de filtros
    const [showDropdown, setShowDropdown] = useState(false);

    // Função para alternar seleção de categoria
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    };

    // Função para alternar seleção de idade
    const handleAgeChange = (age) => {
        setSelectedAges(prev =>
            prev.includes(age)
                ? prev.filter(a => a !== age)
                : [...prev, age]
        );
    };

    // Função para alternar seleção de acessibilidade
    const handleAccessibilityChange = (accessibility) => {
        setSelectedAccessibility(prev =>
            prev.includes(accessibility)
                ? prev.filter(a => a !== accessibility)
                : [...prev, accessibility]
        );
    };

  

    // Alterna a visibilidade do filtro de categorias
    const toggleCategoryFilter = () => {
        setShowCategoryFilter(prev => !prev);
    };

    // Alterna a visibilidade do filtro de idades
    const toggleAgeFilter = () => {
        setShowAgeFilter(prev => !prev);
    };

    // Alterna a visibilidade do filtro de acessibilidade
    const toggleAccessibilityFilter = () => {
        setShowAccessibilityFilter(prev => !prev);
    };
      // Filtra oficinas por opções de acessibilidade selecionadas
    const filteredOficinas =
    oficinas?.filter((oficina) => {
    // Filtrar por acessibilidade
    const matchesAccessibility = selectedAccessibility.length === 0
        ? true
        : selectedAccessibility.every((selected) =>
            oficina.accessibilityOptions?.includes(selected)
        );

  // Filtrar por categoria
  const matchesCategory = selectedCategories.length === 0
    ? true
    : selectedCategories.includes(oficina.category);

  // Filtrar por idade

  const matchesAge = selectedAges.length === 0
  ? true
  : selectedAges.some((selectedAge) =>
      oficina.targetAudience === selectedAge
    );

  // Retornar apenas oficinas que atendem a todos os critérios
  return matchesAccessibility && matchesCategory && matchesAge;
}) || [];
 

    // Renderiza o componente
    return (
        <div>
            {/* Exibe conteúdo para usuários não logados */}
            {!isLoggedIn && (
                <>
                 <div className={styles.heroSection}>
                        <FaFilter className={styles.filterIcon2} onClick={() => setShowDropdown(!showDropdown)} />
                        {showDropdown && (
                            <div className={styles.dropdown2}>
                                <div className={styles.dropdownColumn}>
                                    <p className={styles.dropdownTitle}>Categorias</p>
                                    {["Eletrônica", "Programação","Desplugada", "Mecânica", "Robótica", "Engenharia", "Arte e design", "Reciclagem e sustentabilidade", "Edição de vídeo e voz"].map((category) => (
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
                                <div className={styles.dropdownColumn}>
                                    <p className={styles.dropdownTitle}>Idades</p>
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
                                <div className={styles.dropdownColumn}>
                                    <p className={styles.dropdownTitle}>Acessibilidade</p>
                                    {["Pessoas no espectro do autismo", "Pessoas com TDAH", "Pessoas com deficiência auditiva", "Pessoas com deficiência visual"].map((accessibility) => (
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
                    </div>
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
                    
                    <div className={styles.heroSection}>
                        <h2 className={styles.titlep}>Filtre as oficinas</h2>
                    </div>

                    {/* Painéis de Benefícios */}
                    <div className={styles.benefitsContainer}>
                        {/* Painel de filtro por idade */}
                        <div className={styles.benefitPanel} onClick={toggleAgeFilter}>
                            <img src={filterInfo} alt="Filtros por Idade" className={styles.benefitImage} />
                            <h3>Por Idade</h3>
                            <p>Filtre rapidamente oficinas recomendadas para diferentes faixas etárias.</p>
                        </div>

                        {/* Painel de filtro por categoria */}
                        <div className={styles.benefitPanel} onClick={toggleCategoryFilter}>
                            <img src={categoriaInfo} alt="Filtros por Categoria" className={styles.benefitImage} />
                            <h3>Por Categorias</h3>
                            <p>Encontre oficinas específicas, desde robótica até artesanato e muito mais.</p>
                        </div>

                        {/* Painel de filtro por acessibilidade */}
                        <div className={styles.benefitPanel} onClick={toggleAccessibilityFilter}>
                            <img src={acessibilidadeInfo} alt="Oficinas Acessíveis" className={styles.benefitImage} />
                            <h3>Por público-alvo</h3>
                            <p>Encontre oficinas inclusivas com recursos adaptados e instruções detalhadas.</p>
                        </div>
                    </div>
                </>
            )}

           
            {/* Conteúdo para usuários logados */}
            {isLoggedIn && (
                <>
                    {/* Filtro de Categorias */}
                    {showCategoryFilter && (
                        <div className={styles.filter_bar}>
                            <div className={styles.filter_text}>
                                <span>Filtrar por Categoria:</span>
                                {["Eletrônica", "Programação","Desplugada", "Mecânica", "Robótica", "Engenharia", "Arte e design", "Reciclagem e sustentabilidade", "Edição de vídeo e voz"].map((category) => (
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
                                {["Pessoas no espectro do autismo", "Pessoas com TDAH", "Pessoas com deficiência auditiva", "Pessoas com deficiência visual", "Outro público"].map((accessibility) => (
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

                    {/* Ícone de Filtro (Dropdown) */}
                    <div className={styles.heroSection}>
                        <FaFilter className={styles.filterIcon} onClick={() => setShowDropdown(!showDropdown)} />
                        {showDropdown && (
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownColumn}>
                                    <p className={styles.dropdownTitle}>Categorias</p>
                                    {["Eletrônica", "Programação", "Desplugada","Mecânica", "Robótica", "Engenharia", "Arte e design", "Reciclagem e sustentabilidade", "Edição de vídeo e voz"].map((category) => (
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
                                <div className={styles.dropdownColumn}>
                                    <p className={styles.dropdownTitle}>Idades</p>
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
                                <div className={styles.dropdownColumn}>
                                    <p className={styles.dropdownTitle}>Acessibilidade</p>
                                    {["Pessoas no espectro do autismo", "Pessoas com TDAH", "Pessoas com deficiência auditiva", "Pessoas com deficiência visual", "Outro público"].map((accessibility) => (
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
                    </div>
                </>
            )}
            
            {/*USUARIO NAO LOGADO*/}
            {/* Exibição das oficinas filtradas */}
            <div className={styles.postDetail}>
                {loading && <p>Carregando...</p>}
                {filteredOficinas && filteredOficinas.map((oficina) => (
                    <div key={oficina.id}>
                        {isLoggedIn ? (
                            <PostDetail oficina={oficina} />
                        ) : (
                            <PostDetailUsuarioNaoLogado oficina={oficina} />
                        )}
                    </div>
                ))}
                {filteredOficinas.length === 0 && (
                    <div className={styles.oficinasNao}>
                        <p className={styles.message}>Oficinas não encontradas</p>
                        <Link to="CriarOficina" className={`${styles.btn} btn`}>Criar Primeira Oficina</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

// Exporta o componente Home
export default Home;
