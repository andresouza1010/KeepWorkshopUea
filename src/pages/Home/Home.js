// Importa o módulo CSS para estilização do componente Home
import styles from "./Home.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { useAuthentication } from "../../hooks/useAuthentication";
import 'font-awesome/css/font-awesome.min.css';
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
// Importa imagens utilizadas no componente

import PostDetailUsuarioNaoLogado from '../../components/PostDetailUsuarioNaoLogado';// Importa o ícone de filtro da biblioteca react-icons


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
    
    // Busca documentos da coleção "oficinas" e define estado para loading
    const { documents: oficinas, loading } = useFetchDocuments("oficinas");

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isAcessibilidadeOpen, setIsAcessibilidadeOpen] = useState(false);
    const [isAgesOpen, setIsAgesOpen] = useState(false);

    const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
    const toggleAcessibilidade = () => setIsAcessibilidadeOpen(!isAcessibilidadeOpen);
    const toggleAges = () => setIsAgesOpen(!isAgesOpen);
            
    
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
      <div className={styles.filter_principal}>
  {/* Filtro único com 3 opções fixas */}
  <div className={styles.filter_barDeUsuariosLogados}>
    <div className={styles.filter_textDeUsuariosLogados}>
      <span className={styles.spantextDeUsuariosLogados}>Filtrar:</span>
      
      {/* Filtro de Categorias */}
      <div className={styles.filterOption}>
        <div className={styles.filterHeader} onClick={toggleCategories}>
          <p className={styles.filterTitle}>Categorias</p>
          {isCategoriesOpen ? (
            <FaChevronUp className={styles.arrowIcon} />
          ) : (
            <FaChevronDown className={styles.arrowIcon} />
          )}
        </div>
        {isCategoriesOpen && (
          <div className={styles.filterContent}>
            {[
              "Eletrônica",
              "Programação",
              "Desplugada",
              "Mecânica",
              "Robótica",
              "Engenharia",
              "Arte e design",
              "Reciclagem e sustentabilidade",
              "Edição de vídeo e voz",
            ].map((category) => (
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
        )}
      </div>

      {/* Filtro de Público (Acessibilidade) */}
      <div className={styles.filterOption}>
        <div className={styles.filterHeader} onClick={toggleAcessibilidade}>
          <p className={styles.filterTitle}>Acessibilidade</p>
          {isAcessibilidadeOpen ? (
            <FaChevronUp className={styles.arrowIcon} />
          ) : (
            <FaChevronDown className={styles.arrowIcon} />
          )}
        </div>
        {isAcessibilidadeOpen && (
          <div className={styles.filterContent}>
            {[
              "Não possui",
              "Transtorno do espectro do autismo",
              "Transtorno do déficit de atenção com hiperatividade",
              "Deficiência visual",
              "Deficiência auditiva",
              "Outro público",
            ].map((categoriaDoPublico) => (
              <label key={categoriaDoPublico} className={styles.checkbox_label}>
                <input
                  className={styles.inputDeUsuariosLogados}
                  type="checkbox"
                  value={categoriaDoPublico}
                  checked={selectedCategoriaDoPublico.includes(categoriaDoPublico)}
                  onChange={() => handleCategoriaDoPublicoChange(categoriaDoPublico)}
                />
                {categoriaDoPublico}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filtro de Idades */}
      <div className={styles.filterOption}>
        <div className={styles.filterHeader} onClick={toggleAges}>
          <p className={styles.filterTitle}>Idades</p>
          {isAgesOpen ? (
            <FaChevronUp className={styles.arrowIcon} />
          ) : (
            <FaChevronDown className={styles.arrowIcon} />
          )}
        </div>
        {isAgesOpen && (
          <div className={styles.filterContent}>
            {["4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 15 anos", "16 anos ou mais"].map((age) => (
              <label key={age} className={styles.checkbox_label}>
                <input
                  className={styles.inputDeUsuariosLogados}
                  type="checkbox"
                  value={age}
                  checked={selectedAges.includes(age)}
                  onChange={() => handleAgeChange(age)}
                />
                {age}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Exibição das categorias selecionadas */}
  <div className={styles.selectedCategories}></div>

  {/* Exibição das categorias de Acessibilidade selecionadas */}
  <div className={styles.selectedCategories}></div>

  {/* Exibição das faixas de Idade selecionadas */}
  <div className={styles.selectedCategories}></div>

  {/* Exibição das oficinas filtradas */}
  <div className={styles.postDetail}>
    {loading && <p>Carregando...</p>}
    {filteredOficinas && filteredOficinas.map((oficina) => (
      <div key={oficina.id}>
        {/* Aqui, o conteúdo das oficinas pode ser o mesmo para usuários logados ou não */}
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
