import React from 'react';
import styles from './CreateOficina.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreateOficina = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState(""); // Novo estado para a breve descrição
  const [category, setCategory] = useState(""); 
  const [targetAudience, setTargetAudience] = useState(""); 
  const [duration, setDuration] = useState(""); // Novo estado para Duração da Oficina
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("oficinas");
  const navigate = useNavigate();

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
    if (!title || !image || !body || !category || !targetAudience || !duration || !description) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      description, // Incluindo a breve descrição
      category, // Usando apenas a categoria
      targetAudience, 
      duration, // Incluindo a duração da oficina
      uid: user.uid,
      createdBy: user.displayName,
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
          <span>URL da imagem</span>
          <input 
            type="text" 
            name="image" 
            required 
            placeholder="Insira a imagem desta etapa em sua Oficina" 
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Breve descrição</span> {/* Novo campo para breve descrição */}
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
            name="body" 
            required 
            placeholder="Insira o Conteúdo da oficina!"
            onChange={(e) => setBody(e.target.value)}
            value={body}
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
            placeholder="Ex: 2" 
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </label>

        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateOficina;
