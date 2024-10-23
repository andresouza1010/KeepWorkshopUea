import React, { useState } from 'react';
import styles from './CreateOficina.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreateOficina = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [recursos, setRecursos] = useState("");
  const [description, setDescription] = useState(""); 
  const [descricaoIntro, setIntroduction] = useState(""); 
  const [descricaoOrganizacao, setOrganizacao] = useState(""); 
  const [descricaoPratica, setPratica] = useState(""); 
  const [descricaoApresentacao, setApresentacao] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [targetAudience, setTargetAudience] = useState(""); 
  const [duration, setDuration] = useState(""); 
  const [formError, setFormError] = useState("");
  


  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("oficinas");
  const navigate = useNavigate();

  // Novo estado para acessibilidade
  const [hasAccessibility, setHasAccessibility] = useState(false);
  const [accessibilityDescription, setAccessibilityDescription] = useState("");

  const handleImageUpload = (e, section) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    // Definindo a função onloadend com a closure correta
  reader.onloadend = () => {
    switch (section) {
      case 'intro':
        setImage(reader.result); // Para a introdução
        break;
      case 'organizacao':
        setImage2(reader.result); // Para a organização
        break;
      case 'pratica':
        setImage3(reader.result); // Para o momento prático
        break;
      case 'apresentacao':
        setImage4(reader.result); // Para a apresentação final
        break;
      default:
        break; // Caso não corresponda a nenhuma seção, não faz nada
    }
  };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate URL da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      return; 
    }

    // Checar todos os valores
    if (!title || !image || !image2 || !image3 || !image4 || !recursos || !category || !targetAudience || !duration || !description) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      image2,
      image3,
      image4,
      recursos,
      descricaoIntro,
      descricaoOrganizacao,
      descricaoPratica,
      descricaoApresentacao,
      description, 
      category, 
      targetAudience, 
      duration, 
      uid: user.uid,
      createdBy: user.displayName,
      hasAccessibility, 
      accessibilityDescription, 
    });

    // Redirecionar para a página inicial
    navigate("/");
  };
  

  return (
    <div className={styles.create_oficina}>
      <h2>Criar Oficina</h2>
      <p>Crie o passo a passo de como a oficina funciona!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Categoria</span>
          <select 
            name="category" 
            required 
            onChange={(e) => setCategory(e.target.value)} 
            value={category}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Eletrônica">Eletrônica</option>
            <option value="Programação">Programação</option>
            <option value="Mecânica">Mecânica</option>
            <option value="Robótica">Robótica</option>
            <option value="Engenharia">Engenharia</option>
            <option value="Arte e design">Arte e design</option>
            <option value="Reciclagem e sustentabilidade">Reciclagem e sustentabilidade</option>
            <option value="Edição de vídeo e voz">Edição de vídeo e voz</option>
          </select>
        </label>

        <label>
          <span>Título</span>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Pense em um nome que destaque a sua oficina!" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Breve descrição</span>
          <textarea 
            name="description" 
            required 
            placeholder="Insira uma breve descrição da sua oficina!" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>

        <label>
          <span>Recursos necessários</span>
          <textarea 
            name="recursos" 
            required 
            placeholder="Insira os recursos de sua oficina!"
            onChange={(e) => setRecursos(e.target.value)}
            value={recursos}
          ></textarea>
        </label>

        <label>
          <span>Público-alvo</span>
          <select 
            name="targetAudience" 
            required 
            onChange={(e) => setTargetAudience(e.target.value)} 
            value={targetAudience}
          >
            <option value="">Selecione o público-alvo</option>
            <option value="4 a 6 anos">4 a 6 anos - (Use linguagem simples e atividades visuais)</option>
            <option value="7 a 9 anos">7 a 9 anos - (Promova interação e aprendizado lúdico)</option>
            <option value="10 a 12 anos">10 a 12 anos - (Incentive a autonomia e o trabalho em grupo)</option>
            <option value="13 a 15 anos">13 a 15 anos - (Desafie com projetos mais complexos)</option>
            <option value="16 anos ou mais">16 anos ou mais - (Ofereça desafios e aprofundamento)</option>
          </select>
        </label>

        <label>
          <span>Duração da oficina (em horas)</span>
          <input 
            type="number" 
            name="duration" 
            required 
            placeholder="Ex: 2 (Tempo ideal para que todos participem ativamente)" 
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </label>

        <div>
          <h3>Introdução</h3>
          <p>Faça upload da sua introdução.</p>
          <label>
            <span>Upload da Imagem</span>
            <input 
              type="file" 
              name="image" 
              required 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, 'intro')}
            />
          </label>
          <span>Descrição da introdução</span>
          <textarea 
            name="descricaoIntro" 
            required 
            placeholder="Introduza a sua Oficina"
            onChange={(e) => setIntroduction(e.target.value)}
            value={descricaoIntro}
          ></textarea>

          <h3>Organização de Materiais</h3>
          <p>Faça upload da organização dos recursos!</p>
          <label>
            <span>Upload da Imagem</span>
            <input 
              type="file" 
              name="image2" 
              required 
              accept="image2/*" 
              onChange={(e) => handleImageUpload(e, 'organizacao')}
            />
          </label>

          <textarea 
            name="descricaoOrganizacao" 
            required 
            placeholder="Introduza a sua Oficina"
            onChange={(e) => setOrganizacao(e.target.value)}
            value={descricaoOrganizacao}
          ></textarea>

          <h3>Momento Prático</h3>
          <p>Faça upload do momento prático</p>
          <label>
            <span>Upload da Imagem</span>
            <input 
              type="file" 
              name="image3" 
              required 
              accept="image3/*" 
              onChange={(e) => handleImageUpload(e, 'pratica')}
            />
          </label>

          <textarea 
            name="descricaoPratica" 
            required 
            placeholder="Introduza a sua Oficina"
            onChange={(e) => setPratica(e.target.value)}
            value={descricaoPratica}
          ></textarea>

          <h3>Apresentação Final</h3>
          <p>Faça upload dos resultados finais da oficina!</p>
          <label>
            <span>Upload da Imagem</span>
            <input 
              type="file" 
              name="image4" 
              required 
              accept="image4/*" 
              onChange={(e) => handleImageUpload(e, 'apresentacao')}
            />
          </label>

          <textarea 
            name="descricaoApresentacao" 
            required 
            placeholder="Introduza a sua Oficina"
            onChange={(e) => setApresentacao(e.target.value)}
            value={descricaoApresentacao}
          ></textarea>
        </div>

      <div className={styles.accessibilitySection}>
  <h3>Essa oficina possui elementos de acessibilidade?</h3>
  <label className={styles.checkboxLabel}>
    <input 
      type="checkbox" 
      checked={hasAccessibility} 
      onChange={(e) => setHasAccessibility(e.target.checked)} 
    />
    Sim
  </label>

  {hasAccessibility && (
    <div className={styles.accessibilityOptions}>
      <p>Selecione os elementos de acessibilidade relevantes:</p>
      <label className={styles.checkboxLabel}>
        <input 
          type="checkbox" 
          value="TDAH" 
          onChange={(e) => setAccessibilityDescription((prev) => prev + " TDAH")}
        />
        Pessoas com TDAH
      </label>
      <label className={styles.checkboxLabel}>
        <input 
          type="checkbox" 
          value="Autismo" 
          onChange={(e) => setAccessibilityDescription((prev) => prev + " Autismo")}
        />
        Indivíduos no espectro autista
      </label>
      <label className={styles.checkboxLabel}>
        <input 
          type="checkbox" 
          value="Dislexia" 
          onChange={(e) => setAccessibilityDescription((prev) => prev + " Dislexia")}
        />
        Pessoas com dislexia
      </label>
      <label className={styles.checkboxLabel}>
        <input 
          type="checkbox" 
          value="Surdez" 
          onChange={(e) => setAccessibilityDescription((prev) => prev + " Surdez")}
        />
        Pessoas com deficiência auditiva
      </label>
      <label className={styles.checkboxLabel}>
        <input 
          type="checkbox" 
          value="Cegueira" 
          onChange={(e) => setAccessibilityDescription((prev) => prev + " Cegueira")}
        />
        Pessoas com deficiência visual
      </label>
      <textarea 
        className={styles.accessibilityTextarea}
        placeholder="Outras considerações sobre acessibilidade... (ex: métodos de ensino, recursos visuais, etc.)"
        value={accessibilityDescription}
        onChange={(e) => setAccessibilityDescription(e.target.value)}
      />
    </div>
  )}
</div>

<button className="btn" type="submit">Criar Oficina</button>

{formError && <p className="error">{formError}</p>}
{response.loading && <p>Aguarde, estamos criando sua oficina...</p>}
{response.error && <p className="error">{response.error}</p>}
{response.success && <p>Oficina criada com sucesso!</p>}

      </form>
    </div>
  );
};

export default CreateOficina;