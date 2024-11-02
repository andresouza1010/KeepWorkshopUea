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
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo estado para controlar o carregamento

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("oficinas");
  const navigate = useNavigate();

  // Novo estado para acessibilidade
  const [hasAccessibility, setHasAccessibility] = useState(false);
  const [accessibilityDescription, setAccessibilityDescription] = useState("");

  

  const handleImageUpload = (e, section) => {
    const file = e.target.files[0];
    const reader = new FileReader();

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
          break;
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetFields = () => {
    setTitle("");
    setImage("");
    setImage2("");
    setImage3("");
    setImage4("");
    setRecursos("");
    setDescription("");
    setIntroduction("");
    setOrganizacao("");
    setPratica("");
    setApresentacao("");
    setCategory("");
    setTargetAudience("");
    setDuration("");
    setHasAccessibility(false);
    setAccessibilityDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true); // Inicia o carregamento

    // Validar campos obrigatórios
    if (!title || !image || !image2 || !image3 || !image4 || !recursos || !category || !targetAudience || !duration || !description) {
      setFormError("Por favor, preencha todos os campos!");
      setIsSubmitting(false); // Para o carregamento em caso de erro
      return;
    }

    // Criar uma oficina
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

    // Resetar os campos para permitir criar outra oficina
    resetFields();

    // Redirecionar para a página inicial ou exibir mensagem de sucesso
    navigate("/");
  };

  const handleRedirect = () => {
    navigate('/sugestao');
  };

  return (
    <div className={styles.create_oficina}>
      <p>
        Aqui você pode criar e armazenar um espaço colaborativo onde participantes podem aprender, criar e se divertir.
      </p>
      <button className={styles.sugestao_button} onClick={handleRedirect}>
        Sugestão
      </button>
      <h3>Como Cadastrar sua Oficina:</h3>
      <p>
        Para facilitar o processo de cadastro, siga os passos abaixo e preencha as informações necessárias:
      </p>
    
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
          maxLength={30} // Limita a entrada a 30 caracteres
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
            <option value="4 a 6 anos">4 a 6 anos</option>
            <option value="7 a 9 anos">7 a 9 anos</option>
            <option value="10 a 12 anos">10 a 12 anos</option>
            <option value="13 a 15 anos">13 a 15 anos</option>
            <option value="16 anos ou mais">16 anos ou mais</option>
          </select>
        </label>

        <label>
          <span>Duração da oficina (em horas)</span>
          <input 
            type="number" 
            name="duration" 
            required 
            min="1" 
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
            <input type="file" name="image2" required accept="image/*" 
              onChange={(e) => handleImageUpload(e, 'organizacao')}
            />
          </label>

          <textarea 
            name="descricaoOrganizacao" 
            required 
            placeholder="Descreva como será a organização dos recursos."
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
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, 'pratica')}
            />
          </label>

          <textarea 
            name="descricaoPratica" 
            required 
            placeholder="Descreva o momento prático da oficina."
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
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, 'apresentacao')}
            />
          </label>

          <textarea 
            name="descricaoApresentacao" 
            required 
            placeholder="Descreva as apresentações finais da oficina!"
            onChange={(e) => setApresentacao(e.target.value)}
            value={descricaoApresentacao}
          ></textarea>
        </div>

        <label>
  <span>Esta oficina possui recursos de acessibilidade?</span>
  <div>
    <label>
      <input 
        type="radio" 
        name="accessibility" 
        value="yes" 
        checked={hasAccessibility === true} 
        onChange={() => setHasAccessibility(true)} 
      />
      Sim
    </label>
    <label>
      <input 
        type="radio" 
        name="accessibility" 
        value="no" 
        checked={hasAccessibility === false} 
        onChange={() => setHasAccessibility(false)} 
      />
      Não
    </label>
  </div>
</label>

{hasAccessibility && (
  <label>
    <span>Descrição dos recursos de acessibilidade</span>
    <textarea 
      placeholder="Descreva os recursos de acessibilidade disponíveis, especifique também o seu público-alvo." 
      value={accessibilityDescription} 
      onChange={(e) => setAccessibilityDescription(e.target.value)} 
    ></textarea>
  </label>
)}

        <button type="submit" className="btn" disabled={isSubmitting}>Salvar Oficina</button>
        {isSubmitting && <p>Aguarde, salvando oficina...</p>}
        {formError && <p className="error">{formError}</p>}
        {response.error && <p className="error">{response.error}</p>}
        {response.success && <p className="success">Oficina criada com sucesso!</p>}
      </form>
    </div>
  );
};

export default CreateOficina;