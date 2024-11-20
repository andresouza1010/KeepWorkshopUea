import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Ícone de coração preenchido e contorno
import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';
import { useAuthValue } from "../context/AuthContext"; // Para obter o usuário logado

const PostDetail = ({ oficina }) => {
  const { user } = useAuthValue(); // Obtenha o usuário logado
  const [isFavorited, setIsFavorited] = useState(false);

  // Chave única para os favoritos do usuário
  const favoritesKey = `favoritos_${user?.uid}`;

  // Função para adicionar/remover dos favoritos
  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

    if (isFavorited) {
      // Se já está favoritado, remove dos favoritos
      favorites = favorites.filter(fav => fav.id !== oficina.id);
    } else {
      // Se não está favoritado, adiciona aos favoritos
      favorites.push(oficina);
    }

    // Atualiza o localStorage e o estado local
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    setIsFavorited(!isFavorited); // Alterna o estado de favorito
  };

  // Verifica se a oficina está nos favoritos ao carregar o componente
  useEffect(() => {
    if (user) {
      const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
      const isFavorite = favorites.some(fav => fav.id === oficina.id);
      setIsFavorited(isFavorite);
    }
  }, [favoritesKey, oficina.id, user]);

  return (
    <div className={styles.oficina_detail}>
      <div className={styles.image_container}>
        <img src={oficina?.image?.[0]} alt={oficina?.title} />
        <span className={styles.tag}>{oficina?.category}</span>

        {/* Botão de favoritar/desfavoritar */}
        <button
          className={`${styles.favorite_icon} ${isFavorited ? styles.favorited : ''}`}
          onClick={handleFavorite}
          aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <h2>{oficina?.title}</h2>
      {oficina?.description && (
        <p className={styles.brief_description}>
          {oficina.description.length > 100 
            ? `${oficina.description.substring(0, 100)}...` 
            : oficina.description}
        </p>
      )}
      <div className={styles.authorContainer}>
        <span className={styles.authorLabel}>Autor(a):</span>
        <span className={styles.authorName}>{oficina?.socialLink}</span>
      </div>

      <p className={styles.audience}>Público-alvo: {oficina?.targetAudience}</p>
      <p className={styles.duration}>Duração: {oficina?.duration} horas</p>
      
      <div className={styles.button_container}>
        <Link to={`/oficinas/${oficina?.id}`} className="btn btn-outline">
          Acessar
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
