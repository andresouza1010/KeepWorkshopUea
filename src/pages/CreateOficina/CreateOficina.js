import React, { useState } from 'react';
import styles from './CreateOficina.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreateOficina = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
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

  const handleImageUpload = (e, setImageFunction) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImageFunction(reader.result); // Define o estado da imagem como base64
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Checar todos os valores
    if (!title || !image || !image1 || !image2 || !image3 || !recursos || !category || !targetAudience || !duration || !description) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      image1,
      image2,
      image3,
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
              onChange={(e) => handleImageUpload(e, setImage)}
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
              name="image1" 
              required 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, setImage1)}
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
              name="image2" 
              required 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, setImage2)}
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
              name="image3" 
              required 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, setImage3)}
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
          <label>
            <input 
              type="checkbox" 
              checked={hasAccessibility} 
              onChange={(e) => setHasAccessibility(e.target.checked)} 
            />
            Sim
          </label>
          {hasAccessibility && (
            <label>
              <span>Descreva as funcionalidades de acessibilidade:</span>
              <textarea 
                name="accessibilityDescription" 
                placeholder="Descreva aqui"
                onChange={(e) => setAccessibilityDescription(e.target.value)}
                value={accessibilityDescription}
              ></textarea>
            </label>
          )}
        </div>

        <button className="btn">Criar Oficina</button>
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateOficina;
