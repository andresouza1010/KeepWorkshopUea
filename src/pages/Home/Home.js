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
    const [selectedCategoriaDoPublico, setSelectedCategoriaDoPublico] = useState([]);
    const [selectedAges, setSelectedAges] = useState([]);
    const [showCategoryFilter] = useState(false);
    const [showCategoriaDoPublicoFilter] = useState(false);
    const [showAgeFilter] = useState(false);
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
    // Função para alternar seleção de categoria do publico
    const handleCategoriaDoPublicoChange = (categoriaDoPublico) => {
        setSelectedCategoriaDoPublico(prev =>
            prev.includes(categoriaDoPublico)
                ? prev.filter(cdp => cdp !== categoriaDoPublico)
                : [...prev, categoriaDoPublico]
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


      // Filtra oficinas por opções de acessibilidade selecionadas
    const filteredOficinas =
    oficinas?.filter((oficina) => {
   

  // Filtrar por categoria
  const matchesCategory = selectedCategories.length === 0
    ? true
    : selectedCategories.includes(oficina.category);

    // Filtrar por categoria
    const matchesCategoriaDoPublico = selectedCategoriaDoPublico.length === 0
    ? true
    : selectedCategoriaDoPublico.includes(oficina.categoriaDoPublico);


  // Filtrar por idade

  const matchesAge = selectedAges.length === 0
  ? true
  : selectedAges.some((selectedAge) =>
      oficina.targetAudience === selectedAge
    );

  // Retornar apenas oficinas que atendem a todos os critérios
  return matchesCategory && matchesAge && matchesCategoriaDoPublico;
}) || [];
 

    // Renderiza o componente
    return (
        <div >
            {/* Exibe conteúdo para usuários não logados */}
            {!isLoggedIn && (
                <>
                 <div className={styles.heroSectionUsuariosNaoLogados}>
                       
                        {showDropdown && (
                            <div className={styles.dropdown2}>
                                <div className={styles.dropdownColumnUsuariosNaoLogados}>
                                    <p className={styles.dropdownTitleUsuariosNaoLogados}>Categorias</p>
                                    {["Eletrônica", "Programação","Desplugada", "Mecânica", "Robótica", "Engenharia", "Arte e design", "Reciclagem e sustentabilidade", "Edição de vídeo e voz"].map((category) => (
                                        <label key={category} className={styles.checkbox_labelUsuariosNaoLogados}>
                                            <input
                                                className={styles.inputUsuariosNaoLogados}
                                                type="checkbox"
                                                value={category}
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                                <div className={styles.dropdownColumnUsuariosNaoLogados}>
                                    <p className={styles.dropdownTitleUsuariosNaoLogados}>Idades</p>
                                    {["4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 15 anos", "16 anos ou mais"].map((age) => (
                                        <label key={age} className={styles.checkbox_label}>
                                            <input
                                                className={styles.inputUsuariosNaoLogados}
                                                type="checkbox"
                                                value={age}
                                                checked={selectedAges.includes(age)}
                                                onChange={() => handleAgeChange(age)}
                                            />
                                            {age}
                                        </label>
                                    ))}
                                </div>
                                <div className={styles.dropdownColumnUsuariosNaoLogados}>
                                    <p className={styles.dropdownTitleUsuariosNaoLogados}>Acessibilidade</p>
                                    {["Não", "Pessoas no espectro do autismo","Pessoas com TDAH", "Pessoas com deficiência visual", "Pessoas com deficiência auditiva", "Outro público"].map((categoriaDoPublico) => (
                                        <label key={categoriaDoPublico} className={styles.checkbox_labelUsuariosNaoLogados}>
                                            <input
                                                 className={styles.inputUsuariosNaoLogados}
                                                type="checkbox"
                                                value={categoriaDoPublico}
                                                checked={selectedCategoriaDoPublico.includes(categoriaDoPublico)}
                                                onChange={() => handleCategoriaDoPublicoChange(categoriaDoPublico)}
                                            />
                                            {categoriaDoPublico}
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
                </>
            )}
            {/* Conteúdo para usuários logados */}
            {isLoggedIn && (
                <>
                    {/* Filtro de Categorias */}
                    {showCategoryFilter && (
                        <div className={styles.filter_barDeUsuariosLogados}>
                            <div className={styles.filter_textDeUsuariosLogados}>
                                <span className={styles.spantextDeUsuariosLogados}>Filtrar por Categoria:</span>
                                {["Eletrônica", "Programação","Desplugada", "Mecânica", "Robótica", "Engenharia", "Arte e design", "Reciclagem e sustentabilidade", "Edição de vídeo e voz"].map((category) => (
                                    <label key={category} className={styles.checkbox_labelDeUsuariosLogados}>
                                        <input
                                            className={styles.inputDeUsuariosLogados}
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

                    {/* Filtro de Categorias do publico */}
                    {showCategoriaDoPublicoFilter && (
                        <div className={styles.filter_barDeUsuariosLogados}>
                            <div className={styles.filter_textDeUsuariosLogados}>
                                <span className={styles.spantextDeUsuariosLogados}>Filtrar por Categoria do publico:</span>
                                {["Não", "Pessoas no espectro do autismo","Pessoas com TDAH", "Pessoas com deficiência visual", "Pessoas com deficiência auditiva", "Outro público"].map((categoriaDoPublico) => (
                                    <label key={categoriaDoPublico} className={styles.checkbox_label}>
                                        <input
                                            className={styles.inputDeUsuariosLogados}
                                            type="checkbox"
                                            value={categoriaDoPublico}
                                            checked={selectedCategories.includes(categoriaDoPublico)}
                                            onChange={() => handleCategoryChange(categoriaDoPublico)}
                                        />
                                        {categoriaDoPublico}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    

                    {/* Filtro de Idades */}
                    {showAgeFilter && (
                        <div className={styles.filter_barDeUsuariosLogados}>
                            <div className={styles.filter_textDeUsuariosLogados}>
                                <span className={styles.inputDeUsuariosLogadosDeUsuariosLogados}>Filtrar por Idade:</span>
                                {["4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 15 anos", "16 anos ou mais"].map((age) => (
                                    <label key={age} className={styles.checkbox_label}>
                                        <input
                                            className={styles.spantextDeUsuariosLogados}
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

                   
                    

                    {/* Ícone de Filtro (Dropdown) */}
                    <div className={styles.heroSectionDelogados}>
                    <span className={styles.filterLabel} onClick={() => setShowDropdown(!showDropdown)}>
                        Filtrar por:
                        <FaFilter className={styles.filterIconDelogados} />
                    </span>
                    {/* Exibição das categorias selecionadas */}
                    <div className={styles.selectedCategories}>
                        {selectedCategories.map((category) => (
                            <span key={category} className={styles.selectedCategory}>
                                {category}
                                <button
                                    className={styles.removeCategoryButton}
                                    onClick={() => handleCategoryChange(category)} // Remove ao clicar
                                    aria-label={`Remover ${category}`}
                                >
                                    ✖
                                </button>
                            </span>
                        ))}
                    </div>
                    {/* Exibição das categorias de Acessibilidade selecionadas */}
                    <div className={styles.selectedCategories}>
                        {selectedCategoriaDoPublico.map((categoriaDoPublico) => (
                            <span key={categoriaDoPublico} className={styles.selectedCategory}>
                                {categoriaDoPublico}
                                <button
                                    className={styles.removeCategoryButton}
                                    onClick={() => handleCategoriaDoPublicoChange(categoriaDoPublico)} // Remove ao clicar
                                    aria-label={`Remover ${categoriaDoPublico}`}
                                >
                                    ✖
                                </button>
                            </span>
                        ))}
                   </div>

                        {/* Exibição das faixas de Idade selecionadas */}
                    <div className={styles.selectedCategories}>
                        {selectedAges.map((age) => (
                            <span key={age} className={styles.selectedCategory}>
                                {age}
                                <button
                                    className={styles.removeCategoryButton}
                                    onClick={() => handleAgeChange(age)} // Remove ao clicar
                                    aria-label={`Remover ${age}`}
                                >
                                    ✖
                                </button>
                            </span>
                        ))}
                        </div>
                    
                        {showDropdown && (
                            <div className={styles.dropdownDeLogados}>

                                <div className={styles.dropdownColumnDeLogados}>
                                    <p className={styles.dropdownTitleDeLogados}>Categorias</p>
                                    {["Eletrônica", "Programação", "Desplugada","Mecânica", "Robótica", "Engenharia", "Arte e design", "Reciclagem e sustentabilidade", "Edição de vídeo e voz"].map((category) => (
                                        <label key={category} className={styles.checkbox_label}>
                                            <input
                                                className={styles.spantextDeUsuariosLogados}
                                                type="checkbox"
                                                value={category}
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>

                                <div className={styles.dropdownColumnDeLogados}>
                                    <p className={styles.dropdownTitleDeLogados}>Acessibilidade</p>
                                    {["Não", "Pessoas no espectro do autismo","Pessoas com TDAH", "Pessoas com deficiência visual", "Pessoas com deficiência auditiva", "Outro público"].map((categoriaDoPublico) => (
                                        <label key={categoriaDoPublico} className={styles.checkbox_label}>
                                            <input
                                                className={styles.spantextDeUsuariosLogados}
                                                type="checkbox"
                                                value={categoriaDoPublico}
                                                checked={selectedCategoriaDoPublico.includes(categoriaDoPublico)}
                                                onChange={() => handleCategoriaDoPublicoChange(categoriaDoPublico)}
                                            />
                                            {categoriaDoPublico}
                                        </label>
                                    ))}
                                </div>

                                <div className={styles.dropdownColumnDeLogados}>
                                    <p className={styles.dropdownTitleDeLogados}>Idades</p>
                                    {["4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 15 anos", "16 anos ou mais"].map((age) => (
                                        <label key={age} className={styles.checkbox_label}>
                                            <input
                                                className={styles.spantextDeUsuariosLogados}
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
