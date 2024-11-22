import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Ícones de coração preenchido e contorno
import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';
import { useAuthValue } from "../context/AuthContext"; // Para obter o usuário logado
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config";

const PostDetail = ({ oficina }) => {
  const { user } = useAuthValue(); // Obtenha o usuário logado
  const [isFavorited, setIsFavorited] = useState(false);

  // Referência do documento de favoritos no Firestore
  const favoritesDocRef = user ? doc(db, "favorites", user.uid) : null;

  // Função para adicionar/remover dos favoritos
  const handleFavorite = async () => {
    if (!favoritesDocRef) {
      console.error("Referência do documento de favoritos não encontrada");
      return;
    }

    try {
      // Verifique se o documento existe antes de atualizar
      const docSnapshot = await getDoc(favoritesDocRef);
      if (!docSnapshot.exists()) {
        console.log("Criando documento de favoritos para o usuário...");
        await setDoc(favoritesDocRef, { favorites: [] });
      }

      if (isFavorited) {
        // Remove a oficina dos favoritos
        await updateDoc(favoritesDocRef, {
          favorites: arrayRemove(oficina),
        });
      } else {
        // Adiciona a oficina aos favoritos
        await updateDoc(favoritesDocRef, {
          favorites: arrayUnion(oficina),
        });
      }
      setIsFavorited(!isFavorited); // Alterna o estado de favorito
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    }
  };

  // Verifica se a oficina está nos favoritos ao carregar o componente
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!favoritesDocRef) {
        console.error("Referência do documento de favoritos não encontrada");
        return;
      }

      try {
        const docSnapshot = await getDoc(favoritesDocRef);
        if (docSnapshot.exists()) {
          const favorites = docSnapshot.data().favorites || [];
          const isFavorite = favorites.some((fav) => fav.id === oficina.id);
          setIsFavorited(isFavorite);
        }
      } catch (error) {
        console.error("Erro ao verificar favoritos:", error);
      }
    };

    checkFavoriteStatus();
  }, [favoritesDocRef, oficina.id]);

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
        <span className={styles.authorName}>{oficina?.socialLink || "Não informado"}</span>
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