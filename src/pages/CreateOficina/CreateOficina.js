import React, { useState } from 'react';
import styles from './CreateOficina.module.css';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreateOficina = () => {
  const [title, setTitle] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]); // Estado para múltiplas imagens
  const [body, setBody] = useState("");
  const [description, setDescription] = useState(""); 
  const [etapa1, setEtapa1] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [targetAudience, setTargetAudience] = useState(""); 
  const [duration, setDuration] = useState(""); 
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("oficinas");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Verifica se ao menos uma imagem foi carregada
    if (uploadedImages.length === 0) {
      setFormError("Por favor, carregue pelo menos uma imagem!");
      return; 
    }


    // Checar todos os valores
    if (!title || !body || !category || !targetAudience || !duration || !description || !etapa1) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      image: uploadedImages[0], // Usando a primeira imagem carregada
      body,
      description,
      etapa1,
      category,
      targetAudience, 
      duration,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file)); // Cria URLs para todas as imagens
    setUploadedImages(imageUrls); // Armazena as URLs das imagens
  };

 

  return (
    <div className={styles.create_oficina}>
      <h2>Criar Oficina</h2>
      <p>Crie o passo a passo de como a oficina funciona!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Categoria</span>
          <select 
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
            required 
            placeholder="Pense em um nome que destaque a sua oficina!" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Resumo da Oficina</span>
          <textarea 
            required 
            placeholder="Descreva o que a oficina irá abordar!" 
            onChange={(e) => setDescription(e.target.value)} 
            value={description}
          ></textarea>
        </label>

        <label>
          <span>Recursos necessários</span>
          <textarea 
            required 
            placeholder="Insira o Conteúdo da oficina!"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          <span>Público-alvo</span>
          <select 
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
            required 
            placeholder="Ex: 2" 
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </label>

        <label>
          <span>Imagens da introdução</span>
          <input 
            type="file" 
            accept="image/*" 
            multiple // Permite múltiplos uploads
            onChange={(e) => handleImageUpload(e)}
          />
        </label>
        
        <label>
          <span>Descrição da Etapa 1</span>
          <textarea 
            required 
            placeholder="Descreva a introdução da sua!" 
            onChange={(e) => setEtapa1(e.target.value)} 
            value={etapa1}
          ></textarea>
        </label>

       
        
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>

      {/* Exibindo a primeira imagem (etapa1) */}
      {uploadedImages.length > 0 && (
        <div>
          <h3>Imagem Principal:</h3>
          <img src={uploadedImages[0]} alt="Imagem Principal" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default CreateOficina;
