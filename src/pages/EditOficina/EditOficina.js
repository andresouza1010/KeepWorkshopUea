import styles from './EditOficina.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditOficina = () => {
  const { id } = useParams();
  const { document: oficina } = useFetchDocument("oficinas", id);
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(""); // Estado para Categoria
  const [targetAudience, setTargetAudience] = useState(""); // Estado para Público-alvo
  const [duration, setDuration] = useState(""); // Estado para Duração
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (oficina) {
      setTitle(oficina.title);
      setBody(oficina.body);
      setImage(oficina.image);
      setCategory(oficina.category);
      setTargetAudience(oficina.targetAudience);
      setDuration(oficina.duration);
      const textTags = oficina.tagsArray.join(",");
      setTags(textTags);
    }
  }, [oficina]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("oficinas");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validação de URL da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      return;
    }

    // Criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Checar todos os valores
    if (!title || !image || !tags || !body || !category || !targetAudience || !duration) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      category, // Incluindo categoria
      targetAudience, // Incluindo público-alvo
      duration, // Incluindo duração
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // Redirecionar para a página inicial
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_oficina}>
      {oficina && (
        <>
          <h2>Editando Oficina: {oficina.title}</h2>
          <p>Altere os dados da sua oficina!</p>
          <form onSubmit={handleSubmit}>
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

            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img className={styles.image_preview} src={oficina.image} alt={oficina.title} />

            <label>
              <span>Conteúdo</span>
              <textarea
                name="body"
                required
                placeholder="Insira o Conteúdo da oficina!"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>

            <label>
              <span>Categoria</span>
              <select name="category" required onChange={(e) => setCategory(e.target.value)} value={category}>
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
              <span>Público-alvo</span>
              <select name="targetAudience" required onChange={(e) => setTargetAudience(e.target.value)} value={targetAudience}>
                <option value="">Selecione o público-alvo</option>
                <option value="4 a 6 anos">4 a 6 anos</option>
                <option value="7 a 9 anos">7 a 9 anos</option>
                <option value="10 a 12 anos">10 a 12 anos</option>
                <option value="13 a 15 anos">13 a 15 anos</option>
                <option value="16 anos ou mais">16 anos ou mais</option>
              </select>
            </label>

            <label>
              <span>Duração (em horas)</span>
              <input
                type="number"
                name="duration"
                required
                placeholder="Duração da oficina"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              />
            </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}

            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditOficina;
