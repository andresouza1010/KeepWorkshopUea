import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import styles from './EditOficina.module.css';

const EditOficina = () => {
  const { id } = useParams(); // Pega o ID da oficina da URL
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // Estado para o título
  const [description, setDescription] = useState(''); // Estado para a descrição
  const [category, setCategory] = useState(''); // Estado para a categoria
  const [targetAudience, setTargetAudience] = useState(''); // Estado para o público-alvo
  const [duration, setDuration] = useState(''); // Estado para a duração
  const [recursos, setRecursos] = useState(''); // Estado para a duração
  const [descricaoIntro, setIntroduction] = useState('');
  const [image, setImage] = useState([]); // Estado para as imagens da introdução
  const [loading, setLoading] = useState(true); // Indica que os dados estão sendo carregados

 
  // Categorias disponíveis
  const categories = [
    "Eletrônica",
    "Programação",
    "Mecânica",
    "Robótica",
    "Engenharia",
    "Arte e design",
    "Reciclagem e sustentabilidade",
    "Edição de vídeo e voz"
  ];

  // Públicos-alvo disponíveis
  const targetAudiences = [
    "4 a 6 anos",
    "7 a 9 anos",
    "10 a 12 anos",
    "13 a 15 anos",
    "16 anos ou mais"
  ];

  // Carrega os dados da oficina ao montar o componente
  useEffect(() => {
    const fetchOficina = async () => {
      try {
        const oficinaRef = doc(db, "oficinas", id);
        const docSnapshot = await getDoc(oficinaRef);
        
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setTitle(data.title || ''); // Carrega o título no estado
          setDescription(data.description || ''); // Carrega a descrição no estado
          setCategory(data.category || ''); // Carrega a categoria no estado
          setTargetAudience(data.targetAudience || ''); // Carrega o público-alvo no estado
          setDuration(data.duration || ''); // Carrega a duração no estado
          setRecursos(data.recursos || '');
          setIntroduction(data.descricaoIntro || ''); // Carrega a introdução
          setImage(data.image || []);// Define a URL da imagem (se houver)
        }
      } catch (error) {
        console.error("Erro ao carregar a oficina:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOficina();
  }, [id]);

  // Função para salvar as alterações no Firebase
  const saveOficina = async () => {
    if (title === '' || description === '' || category === '' || targetAudience === '' || duration === '' || recursos ==='') {
      alert('Título, descrição, categoria, público-alvo e duração não podem estar vazios!');
      return;
    }

    try {
      const oficinaRef = doc(db, "oficinas", id);
      await updateDoc(oficinaRef, {
        title: title, // Atualiza o título da oficina no Firebase
        description: description, // Atualiza a descrição da oficina no Firebase
        category: category, // Atualiza a categoria da oficina no Firebase
        targetAudience: targetAudience, // Atualiza o público-alvo no Firebase
        duration: duration, // Atualiza a duração da oficina no Firebase
        recursos: recursos,
        descricaoIntro: descricaoIntro,
        image: image,
      });
      alert('Dados da oficina atualizados com sucesso!');
      navigate('/'); // Redireciona após salvar
    } catch (error) {
      console.error("Erro ao salvar dados da oficina:", error);
      alert('Ocorreu um erro ao salvar as alterações.');
    }
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
  
    files.forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        setImage((prevImages) => [...prevImages, reader.result]); // Adiciona o Base64 ao estado
      };
  
      reader.readAsDataURL(file); // Converte o arquivo para Base64
    });
  };
  

  // Função para remover imagem
  const handleRemoveImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, idx) => idx !== index));
  };
  

  return (
    <div className={styles.ooficinaContainer}>
      {loading ? (
        <p>Carregando oficina...</p> // Exibe uma mensagem enquanto carrega os dados
      ) : (
        <>
          <h2>Título da Oficina:</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Atualiza o título no estado
            placeholder="Digite o título"
          />
          <h2>Descrição da Oficina:</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Atualiza a descrição no estado
            placeholder="Digite a descrição"
          />
          <h2>Categoria da Oficina:</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Atualiza a categoria no estado
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <h2>Público-alvo:</h2>
          <label>
            <span>Público-alvo</span>
            <select
              name="targetAudience"
              required
              onChange={(e) => setTargetAudience(e.target.value)} 
              value={targetAudience}
            >
              <option value="">Selecione o público-alvo</option>
              {targetAudiences.map((audience) => (
                <option key={audience} value={audience}>{audience}</option>
              ))}
            </select>
          </label>
          <h2>Duração da Oficina (em horas):</h2>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)} // Atualiza a duração no estado
            placeholder="Digite a duração em horas"
            min="1" // Define um valor mínimo de 1 hora
            required
          />
          <h2>Recursos</h2>
          <textarea
            value={recursos}
            onChange={(e) => setRecursos(e.target.value)} // Atualiza a descrição no estado
            placeholder="Digite os recursos usados"
          />
          <h2>Introdução:</h2>
          <textarea
            value={descricaoIntro}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Descreva a introdução da oficina"
          ></textarea>

          {/* Upload de Imagem */}
          <label htmlFor="uploadIntro" className={styles.uploadLabel}>
            <span>Upload da Imagem (opcional)</span>
            <input
              type="file"
              id="uploadIntro"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.uploadInput}
              multiple
            />
          </label>

          <div className={styles.imagePreviewContainer}>
            {image.map((img, idx) => (
              <div key={idx} className={styles.imagePreview}>
                <img src={img} alt={`Intro ${idx}`} />
                <button className={styles.deleteButton} onClick={() => handleRemoveImage(idx)}>
                  &#10005;
                </button>
              </div>
            ))}
          </div>

          <button onClick={saveOficina}>Salvar Alterações</button>
        </>
      )}
    </div>
  );
};

export default EditOficina;