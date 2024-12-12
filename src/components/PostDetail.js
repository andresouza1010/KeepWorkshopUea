import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';
import { useAuthValue } from "../context/AuthContext";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config";

const PostDetail = ({ oficina }) => {
  const { user } = useAuthValue();
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  

  const favoritesDocRef = user ? doc(db, "favorites", user.uid) : null;

  const handleFavorite = async () => {
    if (!user) {
      alert("Você precisa estar logado para favoritar uma oficina.");
      return;
    }

    if (!favoritesDocRef) return;

    setLoadingFavorite(true);

    try {
      const docSnapshot = await getDoc(favoritesDocRef);

      if (!docSnapshot.exists()) {
        await setDoc(favoritesDocRef, { favorites: [] });
      }

      if (favorites.includes(oficina.id)) {
        await updateDoc(favoritesDocRef, {
          favorites: arrayRemove(oficina.id),
        });
        setFavorites(favorites.filter(fav => fav !== oficina.id));
      } else {
        await updateDoc(favoritesDocRef, {
          favorites: arrayUnion(oficina.id),
        });
        setFavorites([...favorites, oficina.id]);
        //navigate('/favoritas'); // Redireciona para a página de favoritas
      }
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
      alert("Ocorreu um erro ao favoritar a oficina.");
    } finally {
      setLoadingFavorite(false);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!favoritesDocRef) return;

      try {
        const docSnapshot = await getDoc(favoritesDocRef);
        if (docSnapshot.exists()) {
          const favoritesData = docSnapshot.data().favorites || [];
          setFavorites(favoritesData);
        }
      } catch (error) {
        console.error("Erro ao verificar favoritos:", error);
      }
    };

    fetchFavorites();
  }, [favoritesDocRef]);

  const isFavorited = favorites.includes(oficina.id);

  return (
    <div className={styles.oficina_detail}>
      <div className={styles.image_container}>
        <img src={oficina?.image?.[0]} alt={oficina?.title} />
        <span className={styles.tag}>{oficina?.category}</span>

        <button
          className={`${styles.favorite_icon} ${isFavorited ? styles.favorited : ''}`}
          onClick={handleFavorite}
          aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          disabled={loadingFavorite}
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <h2>{oficina?.title}</h2>
      {oficina?.description && (
        <p className={styles.brief_description}>
          {oficina.description.length > 30
            ? `${oficina.description.substring(0, 30)}...` 
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
