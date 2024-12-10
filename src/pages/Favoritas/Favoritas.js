import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favoritas.module.css';
import { FaTrash } from 'react-icons/fa';
import { useAuthValue } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';

const Favoritas = () => {
  const { user } = useAuthValue(); // Obtenha o usuário logado
  const [favoritas, setFavoritas] = useState([]);

  // Referência ao documento de favoritos do Firestore
  const favoritesDocRef = user ? doc(db, "favorites", user.uid) : null;

  // Carrega as oficinas favoritas do Firestore ao montar o componente
  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoritesDocRef) {
        try {
          const docSnapshot = await getDoc(favoritesDocRef);
          if (docSnapshot.exists()) {
            setFavoritas(docSnapshot.data().favorites || []);
          } else {
            console.log("Documento de favoritos não encontrado, criando um novo...");
            await updateDoc(favoritesDocRef, { favorites: [] });
          }
        } catch (error) {
          console.error("Erro ao buscar favoritos do Firestore:", error);
        }
      }
    };

    fetchFavorites();
  }, [favoritesDocRef]);


  // Função para excluir uma oficina dos favoritos
  const handleDelete = async (id) => {
    if (favoritesDocRef) {
      const oficinaToRemove = favoritas.find((oficina) => oficina.id === id);
      if (oficinaToRemove) {
        try {
          await updateDoc(favoritesDocRef, {
            favorites: arrayRemove(oficinaToRemove),
          });
          setFavoritas((prev) => prev.filter((oficina) => oficina.id !== id));
        } catch (error) {
          console.error("Erro ao remover favorito:", error);
        }
      }
    }
  };

  return (
    <div className={styles.favoritas_container}>
      <h1 className={styles.favoritash1}>Oficinas Favoritas</h1>

      {/* Lista de oficinas favoritas */}
      <div className={styles.oficinas_list}>{favoritas.length === 0 ? (
          <p className={styles.favop}>Você ainda não tem oficinas favoritas.</p>
        ) : (
          favoritas.map((oficina) => (
            <div key={oficina.id} className={styles.oficina_item}>
              <img
                src={
                  oficina.image
                    ? oficina.image
                    : 'https://via.placeholder.com/150'
                }
                alt={oficina.title}
              />
              <h2 className={styles.favoritafavh2}>{oficina.title}</h2>
              <p className={styles.favp}>{oficina.description}</p>
              <p className={styles.favp}>Autor: {oficina.createdBy || 'Autor desconhecido'}</p>
              <p className={styles.favp}>Público-alvo: {oficina.targetAudience}</p>
              <p className={styles.favp}>Duração: {oficina.duration} horas</p>

              <div className={styles.button_container}>
                <Link
                  to={`/oficinas/${oficina.id}`}
                  className="btn btn-outline"
                >
                  Acessar
                </Link>
                <button
                  className={styles.delete_buttonfav}
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
