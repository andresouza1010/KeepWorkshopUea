import React, { useState } from 'react';
import styles from './CriarOficina.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';
import imageCompression from 'browser-image-compression';

const CriarOficina = () => {

  const [accessibilityDescriptions, setAccessibilityDescriptions] = useState({
    'autista': '',
    'tdah': '',
    'deficientes visuais': '',
    'pessoas surdas': '',
    'outro público': ''
  });
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
  const [categoriaDoPublico, setCategoriaDoPublico] = useState(""); 
  const [targetAudience, setTargetAudience] = useState(""); 
  const [duration, setDuration] = useState(""); 
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [socialLink, setSocialLink] = useState(""); // Novo campo para link de rede social
  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("oficinas");
  const navigate = useNavigate();
  const [hasAccessibility, setHasAccessibility] = useState(true);
  const [accessibilityDescription, setAccessibilityDescription] = useState("");
  const handleAccessibilityDescriptionChange = (e, accessibility) => {
    const { value } = e.target;
    setAccessibilityDescriptions((prev) => ({
      ...prev,
      [accessibility]: value,
    }));
  };
  
  const handleImageUpload = async (e, section) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    const MAX_BASE64_SIZE = 2048000; // Limite de 2MB (em bytes)
    const MAX_TOTAL_SIZE = 2048000; // Limite total de 2MB (2 * 1024 * 1024)
  
    // Calcula o tamanho total das imagens já carregadas nas etapas
  let totalSize = 0;
  totalSize += image.reduce((acc, img) => acc + (img.size || 0), 0);  // Total de imagens já carregadas na etapa específica

  // Adiciona o tamanho de imagens em outras etapas para garantir que a soma não ultrapasse 2MB
  totalSize += (image2.reduce((acc, img) => acc + (img.size || 0), 0) || 0);
  totalSize += (image3.reduce((acc, img) => acc + (img.size || 0), 0) || 0);
  totalSize += (image4.reduce((acc, img) => acc + (img.size || 0), 0) || 0);

  totalSize += files.reduce((acc, file) => acc + file.size, 0);  // Total de arquivos sendo carregados nesta vez

  // Verifica se o tamanho total das imagens ultrapassa o limite
  if (totalSize > MAX_TOTAL_SIZE) {
    alert("O tamanho total das imagens ultrapassa o limite de 2MB. Por favor, reduza o tamanho das imagens.");
    return;
  }

  for (let file of files) {
    try {
      // Verifica o tamanho do arquivo antes de tentar convertê-lo para base64
      if (file.size > MAX_BASE64_SIZE) {
        alert("A imagem ultrapassa o limite de tamanho (2MB). Por favor, comprima a imagem antes de enviar.");
        return; // Impede o processamento da imagem se o limite for ultrapassado
      }

      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 2048,
        useWebWorker: true,
      };

      // Agora a função é assíncrona e pode usar o `await`
      const compressedFile = await imageCompression(file, options);

      // Lê o arquivo comprimido
      const reader = new FileReader();
      let totalSize = 0;

      reader.onloadend = () => {
        // Calcula o tamanho do arquivo
        const fileSize = compressedFile.size; // Tamanho do arquivo em bytes
        totalSize += fileSize;

        // Verifica se o tamanho total ultrapassa 2MB
        if (totalSize > 2 * 1024 * 1024) { // Se o tamanho total exceder 2MB (2 * 1024 * 1024 bytes)
          alert('O tamanho total dos arquivos ultrapassou 2MB. Não é possível fazer upload.');
          return; // Interrompe o upload
        }

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
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Erro ao comprimir a imagem: ', error);
    }
  }
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
    setCategoriaDoPublico("");
    setTargetAudience("");
    setDuration("");
    setHasAccessibility(false);
    setAccessibilityDescription("");
    setAccessibilityDescriptions("");
    setSocialLink(""); // Limpa o campo de link de rede social
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);
   
    if (!title || !recursos || !category || !targetAudience || !duration || !description) {
      setFormError("Por favor, preencha todos os campos!");
      setIsSubmitting(false);
      return;
    }

   
    try {
      setIsSubmitting(true);
      await insertDocument({
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
      categoriaDoPublico, 
      targetAudience, 
      duration, 
      uid: user.uid,
      createdBy: user.displayName,
      hasAccessibility, 
      accessibilityDescription, 
      accessibilityDescriptions,
      socialLink // Adiciona o link de rede social ao documento
    });

    resetFields();
    navigate("/");
  } catch (error) {
    setFormError("Erro ao salvar a oficina. Tente novamente.");
  } finally {
    setIsSubmitting(false); // Reseta o estado de envio
  }
};


  return (
    <div className={styles.create_oficina}>
      <h1 className={styles.titulo_cecreateoficina} >Como criar a sua Oficina!</h1>
      <p className={styles.titulo_p}>
        Aqui você pode criar e armazenar um espaço colaborativo onde participantes podem aprender, criar e se divertir.
      </p>
      
      <form className={styles.form_create} onSubmit={handleSubmit}>
        
        {/* Etapa 1: Empatia */}
        <h2 className={styles.titulo_empatia}>Etapa 1: Empatia</h2>

        <label className={styles.labelcreate}>
          <span className={styles.spancreate}>Público-alvo</span>
          <select 
            className={styles.selectcreate}
            name="targetAudience" 
            required 
            onChange={(e) => setTargetAudience(e.target.value)} 
            value={targetAudience}>
            <option value="">Selecione o público-alvo</option>
            <option value="4 a 6 anos">4 a 6 anos</option>
            <option value="7 a 9 anos">7 a 9 anos</option>
            <option value="10 a 12 anos">10 a 12 anos</option>
            <option value="13 a 15 anos">13 a 15 anos</option>
            <option value="16 anos ou mais">16 anos ou mais</option>
          </select>
        </label>

        <label className={styles.labelcreate}>
          <span className={styles.spancreate}>Narrativa</span>
          <textarea 
            className={styles.texteareacreate}
            name="narrative" 
            placeholder="Descreva o contexto dos alunos e o problema que a oficina ajudará a resolver"
            onChange={(e) => setNarrative(e.target.value)}
            value={narrative}
          ></textarea>
        </label>

        {/* Etapa 2: Definição */}
        <h2 className={styles.titulo_definição}>Etapa 2: Definição</h2>
        <label className={styles.labelcreate}>
          <span className={styles.spancreate}>Categoria</span>
          <select 
            className={styles.selectedcreate}
            name="category" 
            required 
            onChange={(e) => setCategory(e.target.value)} 
            value={category}
          >
            <option className={styles.optionscreate} value="">Selecione uma categoria</option>
            <option className={styles.optionscreate} value="Eletrônica">Eletrônica</option>
            <option className={styles.optionscreate} value="Programação">Programação</option>
            <option className={styles.optionscreate} value="Desplugada">Desplugada</option>
            <option className={styles.optionscreate} value="Mecânica">Mecânica</option>
            <option className={styles.optionscreate} value="Robótica">Robótica</option>
            <option className={styles.optionscreate} value="Engenharia">Engenharia</option>
            <option className={styles.optionscreate} value="Arte e design">Arte e design</option>
            <option className={styles.optionscreate} value="Reciclagem e sustentabilidade">Reciclagem e sustentabilidade</option>
            <option className={styles.optionscreate} value="Edição de vídeo e voz">Edição de vídeo e voz</option>
          </select>
        </label>

        <label className={styles.labelcreate}>
          <span className={styles.spancreate}>Breve descrição</span>
          <textarea 
            className={styles.texteareacreate}
            name="description" 
            required 
            placeholder="Descrição breve da oficina" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>

        {/* Etapa 3: Ideação */}
        <h2 className={styles.titulo_ideacao}>Etapa 3: Ideação</h2>
        <label className={styles.labelcreate}>
          <span className={styles.spancreate}>Título</span>
          <input 
            className={styles.texteareacreatetitulo}
            type="text" 
            name="title" 
            required 
            placeholder="Título da oficina" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label className="criaoficina-label">
        <span className={styles.spancreaterecursos}>Recursos necessários</span>
        <textarea 
          className={styles.texteareacreate}
          name="recursos" 
          required 
          placeholder="Liste os recursos necessários" 
          onChange={(e) => setRecursos(e.target.value)}
          value={recursos}
         
        ></textarea>
      </label>

         {/* Duração */}
         <label className={styles.labelcreateduracao}>
          <span className={styles.spancreateduracao}>Duração da oficina (em horas)</span>
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
        <h2 className={styles.titulo_ideacao}>Etapa 4: Prototipagem</h2>
      
          <h3 className={styles.h3create}>Introdução</h3>
          <textarea 
            className={styles.texteareacreate}
            placeholder="Descreva a introdução da oficina"
            value={descricaoIntro}
            onChange={(e) => setIntroduction(e.target.value)}
          ></textarea>
          <input className={styles.inputdeprototipagem} type="file" multiple onChange={(e) => handleImageUpload(e, 'intro')} />

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
          <span className={styles.spancreate}></span>
          <input
            type="file"
            id="uploadIntro"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'intro')}
            className={styles.uploadInput}
            multiple
          />
        </label>
      

        
          <h3 className={styles.h3create}>Organização de Materiais</h3>
          <textarea 
            className={styles.texteareacreate}
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
    <span className={styles.spancreate}></span>
    <input
      type="file"
      id="uploadOrganizacao"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'organizacao')}
      className={styles.uploadInput}
      multiple
    />
  </label>
    

        <section className={styles.h3create}>
        
          <h3 className={styles.h3create}>Momento Prático</h3>
          <textarea 
            className={styles.texteareacreate}
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
    <span className={styles.spancreate}></span>
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
        

        <h2 className={styles.titulo_ideacao}>Etapa 5: Teste</h2>
<section className={styles.h3create}>
  <h3 className={styles.h3create}>Apresentação Final</h3>
  <textarea 
    className={styles.texteareacreate}
    placeholder="Descreva a apresentação final da oficina"
    value={descricaoApresentacao}
    onChange={(e) => setApresentacao(e.target.value)}
  ></textarea>
  <input type="file" multiple onChange={(e) => handleImageUpload(e, 'apresentacao')} />

  <div className={styles.imagePreviewContainer}>
    {image4.map((img, idx) => (
      <div key={idx} className={styles.imagePreview}>
        <img src={img} alt={`Apresentação ${idx}`} />
        <button 
          className={styles.deleteButton} 
          onClick={() => handleRemoveImage('apresentacao', idx)}
        >
          &#10005;
        </button>
      </div>
    ))}
  </div>

  <label htmlFor="uploadApresentacao" className={styles.uploadLabel}>
    <span className={styles.spancreate}></span>
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

    <label className={styles.labelcreate}>
        
{/* Checkbox para selecionar os públicos de acessibilidade */}

<label className={styles.labelcreateacessibilidade}>
  <span className={styles.spancreate}>Categoria do Público</span>
  <select
    name="categoriaDoPublico"
    required
    onChange={(e) => setCategoriaDoPublico(e.target.value)}
    value={categoriaDoPublico}
  >
    <option className={styles.optionscreateacessibilidade} value="">Esta atividade trabalha com algum público específico?</option>
    <option className={styles.optionscreateacessibilidade}value="Não">Não</option>
    <option className={styles.optionscreateacessibilidade}value="Pessoas no espectro do autismo">Pessoas no espectro do autismo</option>
    <option className={styles.optionscreateacessibilidade}value="Pessoas com TDAH">Pessoas com TDAH</option>
    <option className={styles.optionscreateacessibilidade}value="Pessoas com deficiência visual">Pessoas com deficiência visual</option>
    <option className={styles.optionscreateacessibilidade}value="Pessoas com deficiência auditiva">Pessoas com deficiência auditiva</option>
    <option className={styles.optionscreateacessibilidade}value="Outro público">Outro público</option>
  </select>
</label>

{/* Exibe as caixas de texto correspondentes à opção escolhida */}
{categoriaDoPublico === 'Pessoas no espectro do autismo' && (
  <div className={styles.create_oficinaacessibilidade}>
    <textarea
      className={styles.texteareacreateacessibilidade}
      placeholder="Descreva como seu projeto se aplica a este público"
      value={accessibilityDescriptions['autista'] || ''}
      onChange={(e) => handleAccessibilityDescriptionChange(e, 'autista')}
    />
  </div>
)}

{categoriaDoPublico === 'Pessoas com TDAH' && (
  <div className={styles.create_oficinaacessibilidade}>
    <textarea
      className={styles.texteareacreateacessibilidade}
      placeholder="Descreva como seu projeto se aplica a este público"
      value={accessibilityDescriptions['tdah'] || ''}
      onChange={(e) => handleAccessibilityDescriptionChange(e, 'tdah')}
    />
  </div>
)}

{categoriaDoPublico === 'Pessoas com deficiência visual' && (
  <div className={styles.create_oficinaacessibilidade}>
    <textarea
      className={styles.texteareacreateacessibilidade}
      placeholder="Descreva como seu projeto se aplica a este público"
      value={accessibilityDescriptions['deficientes visuais'] || ''}
      onChange={(e) => handleAccessibilityDescriptionChange(e, 'deficientes visuais')}
    />
  </div>
)}

{categoriaDoPublico === 'Pessoas com deficiência auditiva' && (
  <div className={styles.create_oficinaacessibilidade}>
    <textarea
      className={styles.texteareacreateacessibilidade}
      placeholder="Descreva como seu projeto se aplica a este público"
      value={accessibilityDescriptions['pessoas surdas'] || ''}
      onChange={(e) => handleAccessibilityDescriptionChange(e, 'pessoas surdas')}
    />
  </div>
)}

{categoriaDoPublico === 'Outro público' && (
  <div className={styles.create_oficinaacessibilidade}>
    <textarea
      className={styles.texteareacreateacessibilidade}
      placeholder="Descreva como seu projeto se aplica a este público"
      value={accessibilityDescriptions['outro público'] || ''}
      onChange={(e) => handleAccessibilityDescriptionChange(e, 'outro público')}
    />
  </div>
)}
        </label>

        <label className={styles.labelcreate}>
          <span className={styles.spancreate}>Autor(a) para divulgação</span>
          <input
            className="accessibility-textarea"
            name="socialLink"
            placeholder="Seu nome ou a sua rede social para divulgação"
            onChange={(e) => setSocialLink(e.target.value)}
            value={socialLink}
          />
        </label>

        <button className="styles.buttonSalvar" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Criar Oficina'}
          
        </button>
        {formError && <p className={styles.error}>{formError}</p>}
        {response.success && <p className="success">Oficina criada com sucesso!</p>}
      </form>
    </div>
  );
};

export default CriarOficina;