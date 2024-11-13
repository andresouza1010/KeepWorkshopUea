import React, { useState } from 'react';
import styles from './Sugestao.module.css';
import { FaLightbulb, FaQuestionCircle, FaPenNib } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const Sugestao = () => {

  const [narrative, setNarrative] = useState('');
  
  

  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [recursos, setRecursos] = useState("");
  const [description, setDescription] = useState(""); 
  const [descriptionAcessivel, setDescriptionAcessivel] = useState(""); 
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

  const [accessibility, setAccessibility] = useState('nao');  // Novo estado para acessibilidade
  const [selectedOptions, setSelectedOptions] = useState({
    autismo: false,
    tdah: false,
    surdez: false,
    cegueira: false,
  });

  const handleRemoveImage = (section, index) => {
    switch (section) {
      case 'intro':
        setImage(prevImages => prevImages.filter((_, i) => i !== index));
        break;
      case 'organizacao':
        setImage2(prevImages => prevImages.filter((_, i) => i !== index));
        break;
      case 'pratica':
        setImage3(prevImages => prevImages.filter((_, i) => i !== index));
        break;
      case 'apresentacao':
        setImage4(prevImages => prevImages.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };
  
  

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("oficinas");
  const navigate = useNavigate();

  const handleImageUpload = (e, section) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    const newImages = [];
    
    fileArray.forEach((file) => {
      const reader = new FileReader(); // Cria uma nova instância para cada arquivo
  
      reader.onloadend = () => {
        newImages.push(reader.result); // Adiciona a imagem carregada ao array
        if (newImages.length === fileArray.length) { // Só atualiza o estado quando todas as imagens foram carregadas
          if (section === 'organizacao') {
            setImage2(prevImages => [...prevImages, ...newImages]); // Adiciona as imagens à seção de organização
          } else if (section === 'pratica') {
            setImage3(prevImages => [...prevImages, ...newImages]); // Adiciona as imagens à seção prática
          } else if (section === 'apresentacao') {
            setImage4(prevImages => [...prevImages, ...newImages]); // Adiciona as imagens à seção de apresentação
          } else if (section === 'intro') {
            setImage(prevImages => [...prevImages, ...newImages]); // Adiciona as imagens à seção de introdução
          }
        }
      };
  
      reader.readAsDataURL(file); // Inicia a leitura do arquivo
    });
  };
  

    // Função para atualizar as opções selecionadas
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [name]: checked,
      }));
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
    setSocialLink(""); // Limpa o campo de link de rede social
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true); // Inicia o carregamento

    // Validar campos obrigatórios
    if (!title || !recursos || !category || !targetAudience || !duration || !description ) {
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
      accessibility, // Inclui o campo de acessibilidade
      selectedOptions, // Inclui as opções de acessibilidade selecionadas
      descriptionAcessivel,
      uid: user.uid,
      createdBy: user.displayName,
      socialLink // Adiciona o link de rede social ao documento
      
    
    });

    // Resetar os campos para permitir criar outra oficina
    resetFields();

    // Redirecionar para a página inicial ou exibir mensagem de sucesso
    navigate("/");
  };


 


  return (
    <div className={styles.sugestaoContainer}>
      <form onSubmit={handleSubmit}>
      
      <header className={styles.header}>
        <h1>Guia para Criar sua Oficina Maker</h1>
        <p>Inspire-se e aprenda a montar uma oficina interativa e educativa!</p>
      </header>

      {/* Passo 1 */}
      
      
      <section className={styles.passo}>
        <div className={styles.icon}><FaLightbulb /></div>
        <h2>Passo 1: Conceitos de STEAM </h2>
        <p>
          Escolha ao menos dois conceitos de STEAM (Ciência, Tecnologia, Engenharia, Arte e Matemática) que serão abordados 
          na oficina. Esses conceitos irão orientar o conteúdo e destacar o propósito da atividade.
        </p>
        <p><strong>Exemplos:</strong> Sustentação de estruturas, pressão hidráulica, divisão de frações, brilho e contraste, etc.</p>
        <input
          type="text"
          placeholder="Digite os conceitos de STEAM para o seu título!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </section>

      {/* Passo 2 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaQuestionCircle /></div>
        <h2>Passo 2: Identificação do Problema</h2>
        <p>
          Qual problema sua oficina se propõe a ajudar a resolver? No Design Thinking, a experiência parte de um problema real 
          enfrentado pelos participantes.
        </p>
        <p><strong>Exemplos:</strong> Poluição dos rios, excesso de lixo, desemprego, falta de energia, etc.</p>
        <input
          type="text"
          placeholder="Digite o problema identificado"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />

        <p><strong>Categoria:</strong> Selecione a categoria que representa a abordagem que você usará em sua oficina!</p>
        <label className={styles.label}>
          <select 
            name="category" 
            required 
            onChange={(e) => setCategory(e.target.value)} 
            value={category}
            className={styles.select}
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

        <h3>Recursos Necessários</h3>
        <p>Liste os recursos e materiais necessários para a execução da oficina. Isso ajudará os participantes a se prepararem adequadamente.</p>
        <textarea
          placeholder="Digite os recursos necessários"
          value={recursos}
          onChange={(e) => setRecursos(e.target.value)}
          className={styles.textarea}
        />
      </section>

      {/* Passo 3 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaPenNib /></div>
        <h2>Passo 3: Produza uma Narrativa</h2>
        <p>
          Crie uma narrativa que descreva o problema e sua relevância para os participantes. Confira o exemplo abaixo.
        </p>
        <p><strong>Exemplo:</strong></p>
        <blockquote>
          André mora em uma comunidade perto de um rio no Amazonas, e muitas vezes eles não têm luz, especialmente quando chove muito. 
          Isso torna difícil para todos verem à noite e se manterem seguros. Além disso, como é difícil conseguir tecnologia e não há 
          muitos recursos para energia, eles também enfrentam problemas com muita água das chuvas e lixo acumulado, o que complica ainda mais as coisas.
          Com isso faremos em uma oficina maker lâmpadas solares com Materiais Recicláveis para criar iluminação noturna utilizando a energia solar, uma vez que a comunidade sofre com frequentes quedas de energia.
        </blockquote>
        <textarea
          placeholder="Digite a narrativa"
          value={narrative}
          onChange={(e) => setNarrative(e.target.value)}
          className={styles.textarea}
        />
        {/* Campo para Público-alvo */}
        <label className={styles.label}>
          <span>Público-alvo</span>
          <select 
            name="targetAudience" 
            required 
            onChange={(e) => setTargetAudience(e.target.value)} 
            value={targetAudience}
            className={styles.select}
          >
            <option value="">Selecione o público-alvo</option>
            <option value="4 a 6 anos">4 a 6 anos</option>
            <option value="7 a 9 anos">7 a 9 anos</option>
            <option value="10 a 12 anos">10 a 12 anos</option>
            <option value="13 a 15 anos">13 a 15 anos</option>
            <option value="16 anos ou mais">16 anos ou mais</option>
          </select>
        </label>
        {/* Campo para Duração da Oficina */}
        <label className={styles.label}>
          <span>Duração da oficina (em horas)</span>
          <input 
            type="number" 
            name="duration" 
            required 
            min="1" 
            placeholder="Ex: 2 (Tempo ideal para que todos participem ativamente)" 
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            className={styles.input}
          />
        </label>
        {/* Opções de Acessibilidade */}
        <p className={styles.descricaoAcessibilidade}>
          A sua Oficina possui recursos voltados à acessibilidade?
        </p>
        
        <label className={styles.checkboxLabel}>
          <input 
            type="radio" 
            name="accessibility" 
            value="sim" 
            onChange={() => setAccessibility('sim')}
            checked={accessibility === 'sim'}
            className={styles.radio}
          />
          Sim
        </label>
        <label className={styles.checkboxLabel}>
          <input 
            type="radio" 
            name="accessibility" 
            value="nao" 
            onChange={() => setAccessibility('nao')}
            checked={accessibility === 'nao'}
            className={styles.radio}
          />
          Não
        </label>

        {/* Exibir checkboxes somente quando "Sim" for selecionado */}
        {accessibility === 'sim' && (
          <div className={styles.checkboxContainer}>
            <label>
              <input 
                type="checkbox" 
                name="autismo" 
                checked={selectedOptions.autismo} 
                onChange={handleCheckboxChange} 
              />
              Autismo
            </label>
            <label>
              <input 
                type="checkbox" 
                name="tdah" 
                checked={selectedOptions.tdah} 
                onChange={handleCheckboxChange} 
              />
              TDAH
            </label>
        
            <label>
              <input 
                type="checkbox" 
                name="surdez" 
                checked={selectedOptions.surdez} 
                onChange={handleCheckboxChange} 
              />
              Surdez
            </label>
            <label>
              <input 
                type="checkbox" 
                name="cegueira" 
                checked={selectedOptions.cegueira} 
                onChange={handleCheckboxChange} 
              />
              Cegueira
            </label>

            <p><strong>Descreva como será a atividade! </strong></p>
                <input
                  type="text"
                  placeholder="Cite a abordagem acessível de sua oficina!"
                  value={descriptionAcessivel}
                  onChange={(e) => setDescriptionAcessivel(e.target.value)}
                  className={styles.input}
                />
    

            
          </div>
          
        )}

     

      </section>

      {/* Passo 4 */}
      {/* Introdução */}
<section className={styles.passo}>
  <div className={styles.icon}><FaLightbulb /></div>
  <h2>Passo 4: Introdução</h2>
  <p>Elabore uma introdução sobre a oficina...</p>
  <textarea
    placeholder="Digite a introdução"
    value={descricaoIntro}
    onChange={(e) => setIntroduction(e.target.value)}
    className={styles.textarea}
  />
  <label htmlFor="uploadIntro" className={styles.uploadLabel}>
    <span>Upload da Imagem (opcional)</span>
    <input
      type="file"
      id="uploadIntro"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, 'intro')}
      className={styles.uploadInput}
      multiple
    />
  </label>
  <div className={styles.previewimagecon}>
    {image.length > 0 && image.map((img, index) => (
      <div key={index} className={styles.imagePreviewContainer}>
        <img src={img} alt={`Introdução ${index + 1}`} className={styles.imagePreview} />
        <button className={styles.deleteButton} onClick={() => handleRemoveImage('intro', index)}>×</button>
      </div>
    ))}
  </div>
</section>

{/* Organização de Materiais */}
<section className={styles.passo}>
  <div className={styles.icon}><FaLightbulb /></div>
  <h2>Passo 5: Organização de Materiais</h2>
  <p>Elabore uma introdução...</p>
  <textarea
    placeholder="Distribuição de Materiais"
    value={descricaoOrganizacao}
    onChange={(e) => setOrganizacao(e.target.value)}
    className={styles.textarea}
  />
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
  <div className={styles.previewimagecon}>
    {image2.length > 0 && image2.map((img, index) => (
      <div key={index} className={styles.imagePreviewContainer}>
        <img src={img} alt={`Organização ${index + 1}`} className={styles.imagePreview} />
        <button className={styles.deleteButton} onClick={() => handleRemoveImage('organizacao', index)}>×</button>
      </div>
    ))}
  </div>
</section>

{/* Passo 6 */}
<section className={styles.passo}>
  <div className={styles.icon}><FaLightbulb /></div>
  <h2>Passo 6: Momento Prático</h2>
  <p>Descreva como será o momento prático da oficina, detalhando as atividades e experimentos que os participantes irão realizar.</p>
  <textarea
    placeholder="Digite como será o momento prático!"
    value={descricaoPratica}
    onChange={(e) => setPratica(e.target.value)}
    className={styles.textarea}
  />
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
  {/* Exibição das imagens carregadas */}
  <div className={styles.previewimagecon}>
    {image3.length > 0 && image3.map((img, index) => (
      <div key={index} className={styles.imagePreviewContainer}>
        <img src={img} alt={`Imagem Prática ${index + 1}`} className={styles.imagePreview} />
        <button className={styles.deleteButton} onClick={() => handleRemoveImage('pratica', index)}>×</button>
      </div>
    ))}
  </div>
</section>

{/* Passo 7 */}
<section className={styles.passo}>
  <div className={styles.icon}><FaLightbulb /></div>
  <h2>Passo 7: Apresentação Final</h2>
  <p>Elabore a descrição da apresentação final, detalhando como será a demonstração do que os participantes realizaram e como será o encerramento da oficina.</p>
  <textarea
    placeholder="Descreva o momento de apresentações!"
    value={descricaoApresentacao}
    onChange={(e) => setApresentacao(e.target.value)}
    className={styles.textarea}
  />
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
  {/* Exibição das imagens carregadas */}
  <div className={styles.previewimagecon}>
    {image4.length > 0 && image4.map((img, index) => (
      <div key={index} className={styles.imagePreviewContainer}>
        <img src={img} alt={`Imagem Apresentação ${index + 1}`} className={styles.imagePreview} />
        <button className={styles.deleteButton} onClick={() => handleRemoveImage('apresentacao', index)}>×</button>
      </div>
    ))}
  </div>
</section>

<label>
          <span>Link para Redes Sociais (Divulgação)</span>
          <input 
            type="url" 
            name="socialLink" 
            placeholder="URL para divulgação da oficina (ex: https://instagram.com/suaoficina)" 
            onChange={(e) => setSocialLink(e.target.value)}
            value={socialLink}
          />
        </label>



<button type="submit" className="btn" disabled={isSubmitting}>Salvar Oficina</button>
{isSubmitting && <p>Aguarde, salvando oficina...</p>}
{formError && <p className="error">{formError}</p>}
{response.error && <p className="error">{response.error}</p>}
{response.success && <p className="success">Oficina criada com sucesso!</p>}

</form>
</div>
  
  );

};

export default Sugestao;
