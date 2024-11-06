import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Ícone de coração preenchido e contorno
import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';

const PostDetailUsuarioNaoLogado = ({ oficina }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se o usuário está logado

  // Função para verificar se o usuário está logado
  useEffect(() => {
    // Sempre que o componente for renderizado, verifica se há um usuário no localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setIsLoggedIn(!!currentUser); // Atualiza o estado de login com base na presença do usuário
  }, []);

  // Função para adicionar/remover dos favoritos
  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favoritas")) || [];
    
    if (isFavorited) {
      // Se já está favoritado, remove dos favoritos
      favorites = favorites.filter(fav => fav.id !== oficina.id);
    } else {
      // Se não está favoritado, adiciona aos favoritos
      favorites.push(oficina);
    }

    // Atualiza o localStorage e o estado local
    localStorage.setItem("favoritas", JSON.stringify(favorites));
    setIsFavorited(!isFavorited); // Alterna o estado de favorito
  };

  // Verifica se a oficina está nos favoritos ao carregar o componente
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritas")) || [];
    const isFavorite = favorites.some(fav => fav.id === oficina.id);
    setIsFavorited(isFavorite);
  }, [oficina.id]);

  return (
    <div className={styles.oficina_detail}>
      <div className={styles.image_container}>
        <img src={oficina?.image?.[0]} alt={oficina?.title} />
        <span className={styles.tag}>{oficina?.category}</span>

        {/* Exibe o botão de favoritar somente se o usuário estiver logado */}
        {isLoggedIn && (
          <button
            className={`${styles.favorite_icon} ${isFavorited ? styles.favorited : ''}`}
            onClick={handleFavorite}
            aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>

      <h2>{oficina?.title}</h2>
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
      
      <div className={styles.button_container}>
        <Link to={`/oficinas/${oficina?.id}`} className="btn btn-outline">
          Acessar
        </Link>
      </div>
    </div>
  );
};

export default PostDetailUsuarioNaoLogado;
