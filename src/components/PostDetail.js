import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Ícone de coração preenchido e contorno
import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';

const PostDetail = ({ oficina }) => {
  // Estado para controlar se o item está favoritado
  const [isFavorited, setIsFavorited] = useState(false);

  // Função para alternar entre favoritar e desfavoritar
  const handleFavorite = () => {
    setIsFavorited(!isFavorited); // Alterna o estado
  };

  return (
    <div className={styles.oficina_detail}>
      {/* Contêiner para a imagem e a tag */}
      <div className={styles.image_container}>
        <img src={oficina?.image} alt={oficina?.title} />
        <span className={styles.tag}>{oficina?.category}</span> {/* Apenas categoria como tag */}
        
        {/* Botão de favoritar/desfavoritar no canto inferior direito */}
        <button
          className={styles.favorite_icon}
          onClick={handleFavorite}
          style={{ color: isFavorited ? '#ff385c' : '#ccc' }}  // Controla a cor do ícone aqui
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
  
      <h2>{oficina?.title}</h2>
      
      {/* Breve descrição da oficina */}
      {oficina?.description && (
        <p className={styles.brief_description}>
          {oficina.description.length > 100 
            ? `${oficina.description.substring(0, 100)}...` 
            : oficina.description}
        </p>
      )}
      
      <p className={styles.createdby}>Autor: {oficina?.createdBy || "Autor desconhecido"}</p>
      <p className={styles.audience}>Público-alvo: {oficina?.targetAudience}</p>
      <p className={styles.duration}>Duração: {oficina?.duration} horas</p>
  
      {/* Container para centralizar o botão "Ler" */}
      <div className={styles.button_container}>
        <Link to={`/oficinas/${oficina?.id}`} className="btn btn-outline">
          Acessar
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
