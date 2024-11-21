import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Favoritas.module.css";
import { FaTrash } from "react-icons/fa";
import { useAuthValue } from "../../context/AuthContext";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";

const Favoritas = () => {
  const { user } = useAuthValue();
  const [favoritas, setFavoritas] = useState([]);

  const favoritesDocRef = user ? doc(db, "favorites", user.uid) : null;

  // Carregar favoritos ao montar o componente
  useEffect(() => {
    const loadFavorites = async () => {
      if (!favoritesDocRef) return;

      try {
        const docSnapshot = await getDoc(favoritesDocRef);
        if (docSnapshot.exists()) {
          setFavoritas(docSnapshot.data().favorites || []);
        } else {
          await updateDoc(favoritesDocRef, { favorites: [] });
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };

    loadFavorites();
  }, [favoritesDocRef]);

  // Função para remover uma oficina dos favoritos
  const handleDelete = async (oficinaId) => {
    if (!favoritesDocRef) return;

    const oficinaToRemove = favoritas.find((fav) => fav.id === oficinaId);

    try {
      await updateDoc(favoritesDocRef, {
        favorites: arrayRemove(oficinaToRemove),
      });
      setFavoritas((prev) => prev.filter((fav) => fav.id !== oficinaId));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  return (
    <div className={styles.favoritas_container}>
      <h1>Oficinas Favoritas</h1>

      <div className={styles.oficinas_list}>
        {favoritas.length === 0 ? (
          <p>Você ainda não tem oficinas favoritas.</p>
        ) : (
          favoritas.map((oficina) => (
            <div key={oficina.id} className={styles.oficina_item}>
              <img
                src={oficina.image ? oficina.image : "https://via.placeholder.com/150"}
                alt={oficina.title}
              />
              <h2>{oficina.title}</h2>
              <p>{oficina.description}</p>
              <p>Autor: {oficina.createdBy || "Autor desconhecido"}</p>
              <p>Público-alvo: {oficina.targetAudience}</p>
              <p>Duração: {oficina.duration} horas</p>

              <div className={styles.button_container}>
                <Link to={`/oficinas/${oficina.id}`} className="btn btn-outline">
                  Acessar
                </Link>
                <button
                  className={styles.delete_button}
                  onClick={() => handleDelete(oficina.id)}
                  aria-label={`Remover ${oficina.title} dos favoritos`}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favoritas;
