import React, { useState } from 'react';
import styles from './Sugestao.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const Sugestao = () => {

  
  const [accessibilityOptions, setAccessibilityOptions] = useState([]);
  const [accessibilityDescriptions, setAccessibilityDescriptions] = useState({});
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState([]);
  const [image3, setImage3] = useState([]);
  const [image4, setImage4] = useState([]);
  const [recursos, setRecursos] = useState("");
  const [description, setDescription] = useState(""); 
  const [narrative, setNarrative] = useState(""); 
  const [descricaoIntro, setIntroduction] = useState(""); 
  const [descricaoOrganizacao, setOrganizacao] = useState(""); 
  const [descricaoPratica, setPratica] = useState(""); 
  const [descricaoApresentacao, setApresentacao] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [targetAudience, setTargetAudience] = useState(""); 
  const [duration, setDuration] = useState(""); 
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [socialLink, setSocialLink] = useState(""); // Novo campo para link de rede social

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("oficinas");
  const navigate = useNavigate();

  const [hasAccessibility, setHasAccessibility] = useState(false);
  const [accessibilityDescription, setAccessibilityDescription] = useState("");


  
  const handleAccessibilityOptions = (e) => {
    const { value, checked } = e.target;
    setAccessibilityOptions((prev) => 
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const handleAccessibilityDescriptionChange = (e, accessibility) => {
    const { value } = e.target;
    setAccessibilityDescriptions((prev) => ({
      ...prev,
      [accessibility]: value,
    }));
  };
  
  const handleImageUpload = (e, section) => {
    const files = Array.from(e.target.files);
    const newImages = [];

  


  

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          switch (section) {
            case 'intro':
              setImage(prev => [...prev, ...newImages]);
              break;
            case 'organizacao':
              setImage2(prev => [...prev, ...newImages]);
              break;
            case 'pratica':
              setImage3(prev => [...prev, ...newImages]);
              break;
            case 'apresentacao':
              setImage4(prev => [...prev, ...newImages]);
              break;
            default:
              break;
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  

  const handleRemoveImage = (section, index) => {
    switch (section) {
      case 'intro':
        setImage(prev => prev.filter((_, i) => i !== index));
        break;
      case 'organizacao':
        setImage2(prev => prev.filter((_, i) => i !== index));
        break;
      case 'pratica':
        setImage3(prev => prev.filter((_, i) => i !== index));
        break;
      case 'apresentacao':
        setImage4(prev => prev.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const resetFields = () => {
    setTitle("");
    setImage([]);
    setImage2([]);
    setImage3([]);
    setImage4([]);
    setRecursos("");
    setDescription("");
    setNarrative("");
    setIntroduction("");
    setOrganizacao("");
    setPratica("");
    setApresentacao("");
    setCategory("");
    setTargetAudience("");
    setDuration("");
    setHasAccessibility(false);
    setAccessibilityDescription("");
    setSocialLink(""); // Limpa o campo de link de rede social
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    if (!title || !recursos || !category || !targetAudience || !duration || !description) {
      setFormError("Por favor, preencha todos os campos!");
      setIsSubmitting(false);
      return;
    }

    insertDocument({
      title,
      image,
      image2,
      image3,
      image4,
      recursos,
      narrative,
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
      accessibilityOptions, // Certifique-se de incluir este campo
      accessibilityDescriptions,
      socialLink // Adiciona o link de rede social ao documento
    });

    resetFields();
    navigate("/");
  };


  return (
    <div className={styles.create_oficina}>
      <h1>Como criar a sua Oficina!</h1>
      <p>
        Aqui você pode criar e armazenar um espaço colaborativo onde participantes podem aprender, criar e se divertir.
      </p>
      
      <form onSubmit={handleSubmit}>
        
        {/* Etapa 1: Empatia */}
        <h2>Etapa 1: Empatia</h2>
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
          <span>Narrativa</span>
          <textarea 
            name="narrative" 
            placeholder="Descreva o contexto dos alunos e o problema que a oficina ajudará a resolver"
            onChange={(e) => setNarrative(e.target.value)}
            value={narrative}
          ></textarea>
        </label>

        {/* Etapa 2: Definição */}
        <h2>Etapa 2: Definição</h2>
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
          <span>Breve descrição</span>
          <textarea 
            name="description" 
            required 
            placeholder="Descrição breve da oficina" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>

        {/* Etapa 3: Ideação */}
        <h2>Etapa 3: Ideação</h2>
        <label>
          <span>Título</span>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Título da oficina" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Recursos necessários</span>
          <textarea 
            name="recursos" 
            required 
            placeholder="Liste os recursos necessários" 
            onChange={(e) => setRecursos(e.target.value)}
            value={recursos}
          ></textarea>
        </label>
         {/* Duração */}
         <label>
          <span>Duração da oficina (em horas)</span>
          <input 
            type="number" 
            name="duration" 
            required 
            min="1" 
            placeholder="Duração em horas" 
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </label>

        {/* Etapa 4: Prototipagem */}
        <h2>Etapa 4: Prototipagem</h2>
        <section>
          <h3>Introdução</h3>
          <textarea 
            placeholder="Descreva a introdução da oficina"
            value={descricaoIntro}
            onChange={(e) => setIntroduction(e.target.value)}
          ></textarea>
          <input type="file" multiple onChange={(e) => handleImageUpload(e, 'intro')} />
          <div className={styles.imagePreviewContainer}>
            {image.map((img, idx) => (
              <div key={idx} className={styles.imagePreview}>
                <img src={img} alt={`Intro ${idx}`} />
                <button className={styles.deleteButton} onClick={() => handleRemoveImage('intro', idx)}>
                  &#10005;
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="uploadIntro" className={styles.uploadLabel}>
    <span> Upload da Imagem (opcional)</span>
    <input
      type="file"
      id="uploadIntro"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'intro')}
      className={styles.uploadInput}
      multiple
    />
  </label>
        </section>

        <section>
          <h3>Organização de Materiais</h3>
          <textarea 
            placeholder="Descreva a organização dos materiais"
            value={descricaoOrganizacao}
            onChange={(e) => setOrganizacao(e.target.value)}
          ></textarea>
          <input type="file" multiple onChange={(e) => handleImageUpload(e, 'organizacao')} />

          <div className={styles.imagePreviewContainer}>
            {image2.map((img, idx) => (
              <div key={idx} className={styles.imagePreview}>
                <img src={img} alt={`Organização ${idx}`} />
                <button className={styles.deleteButton} onClick={() => handleRemoveImage('organizacao', idx)}>
                  &#10005;
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="uploadOrganizacao" className={styles.uploadLabel}>
    <span>Upload da Imagem (opcional)</span>
    <input
      type="file"
      id="uploadOrganizacao"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'organizacao')}
      className={styles.uploadInput}
      multiple
    />
  </label>
        </section>

        <section>
          <h3>Momento Prático</h3>
          <textarea 
            placeholder="Descreva o momento prático da oficina"
            value={descricaoPratica}
            onChange={(e) => setPratica(e.target.value)}
          ></textarea>
          <input type="file" multiple onChange={(e) => handleImageUpload(e, 'pratica')} />

          <div className={styles.imagePreviewContainer}>
    {image3.map((img, idx) => (
      <div key={idx} className={styles.imagePreview}>
        <img src={img} alt={`Prática ${idx}`} />
        <button className={styles.deleteButton} onClick={() => handleRemoveImage('pratica', idx)}>
          &#10005;
        </button>
      </div>
    ))}
  </div>


  <label htmlFor="uploadPratica" className={styles.uploadLabel}>
    <span>Upload da Imagem (opcional)</span>
    <input
      type="file"
      id="uploadPratica"
      name="image3"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'pratica')}
      className={styles.uploadInput}
      multiple
    />
  </label>
        </section>

        {/* Etapa 5: Teste */}
        <h2>Etapa 5: Teste</h2>
        <section>
          <h3>Apresentação Final</h3>
          <textarea 
            placeholder="Descreva a apresentação final da oficina"
            value={descricaoApresentacao}
            onChange={(e) => setApresentacao(e.target.value)}
          ></textarea>
          <input type="file" multiple onChange={(e) => handleImageUpload(e, 'apresentacao')} />

          <div className={styles.imagePreviewContainer}>
    {image4.map((img, idx) => (
      <div key={idx} className={styles.imagePreview}>
        <img src={img} alt={`Apresentação ${idx}`} />
        <button className={styles.deleteButton} onClick={() => handleRemoveImage('apresentacao', idx)}>
          &#10005;
        </button>
      </div>
    ))}
  </div>


  <label htmlFor="uploadApresentacao" className={styles.uploadLabel}>
    <span>Upload da Imagem (opcional)</span>
    <input
      type="file"
      id="uploadApresentacao"
      name="image4"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'apresentacao')}
      className={styles.uploadInput}
      multiple
    />
  </label>
        </section>



    {/* Acessibilidade */}
<label>
  <span>Possui recursos de acessibilidade?</span>
  <div>
    <input 
          className="inputCheck"
          type="radio" 
          value="yes" 
          checked={hasAccessibility === true} 
          onChange={() => setHasAccessibility(true)}
        />
    <label> Sim
    </label>
    <input 
        type="radio" 
        value="no" 
        checked={hasAccessibility === false} 
        onChange={() => setHasAccessibility(false)}
      />
    <label>
       Não
    </label>
  </div>
</label>

{hasAccessibility && (
  <div>
    <label>
      <span>Quais recursos de acessibilidade estão disponíveis?</span>
      <div className="accessibility-container">
  <div className="accessibility-grid">
    {["Pessoas no espectro do autismo", "Pessoas com TDAH", "Pessoas com deficiência auditiva", "Pessoas com deficiência visual", "Outro"].map((accessibility) => (
      <div key={accessibility} className="accessibility-item">
        <label className="accessibility-label">
          {accessibility}
        </label>
        <input className="accessibility-checkbox"
            type="checkbox"
            value={accessibility}
            onChange={(e) => handleAccessibilityOptions(e)}
          />
        {accessibilityOptions.includes(accessibility) && (
          <textarea
            placeholder={`Descreva como a oficina atende a: ${accessibility}`}
            value={accessibilityDescriptions[accessibility] || ""}
            onChange={(e) => handleAccessibilityDescriptionChange(e, accessibility)}
            className="accessibility-textarea"
          />
        )}
      </div>
    ))}
  </div>
</div>

    </label>
  </div>
)}


<label>
          <span>Autor(a) para divulgação</span>
          <input 
            className="accessibility-textarea"
            name="socialLink" 
            placeholder="Seu nome ou a sua rede social para divulgação" 
            onChange={(e) => setSocialLink(e.target.value)}
            value={socialLink}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>Salvar Oficina</button>
        {formError && <p className="error">{formError}</p>}
        {response.success && <p className="success">Oficina criada com sucesso!</p>}
      </form>
    </div>
  );
};

export default Sugestao;
