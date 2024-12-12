import React, { useEffect, useState } from 'react';

import styles from './Favoritas.module.css';

import { useAuthValue } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import PostDetail from '../../components/PostDetail'; // Ajuste o caminho conforme a localização do PostDetail

const Favoritas = () => {
  const { user } = useAuthValue(); // Obtenha o usuário logado
  
  const [oficinas, setOficinas] = useState([]); // Para armazenar oficinas detalhadas

  // Referência ao documento de favoritos do Firestore
  const favoritesDocRef = user ? doc(db, "favorites", user.uid) : null;

  // Carrega as oficinas favoritas do Firestore ao montar o componente
  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoritesDocRef) {
        try {
          const docSnapshot = await getDoc(favoritesDocRef);
          if (docSnapshot.exists()) {
            const favoritesData = docSnapshot.data().favorites || [];
          
            // Carregar detalhes das oficinas favoritedas
            const oficinaDetails = await Promise.all(favoritesData.map(async (oficinaId) => {
              const oficinaDoc = await getDoc(doc(db, "oficinas", oficinaId));
              return { id: oficinaId, ...oficinaDoc.data() };
            }));
            setOficinas(oficinaDetails);
          } else {
            console.log("Documento de favoritos não encontrado, criando um novo...");
            await setDoc(favoritesDocRef, { favorites: [] });
          }
        } catch (error) {
          console.error("Erro ao buscar favoritos do Firestore:", error);
        }
      }
    };

    fetchFavorites();
  }, [favoritesDocRef]);

  
  return (
    <div className={styles.favoritas_container}>
      <h1 className={styles.favoritash1}>Oficinas Favoritas</h1>
      <div className={styles.oficinas_list}>
        {oficinas.length === 0 ? (
          <p className={styles.favop}>Você ainda não tem oficinas favoritas.</p>
        ) : (
          oficinas.map((oficina) => (
            <div key={oficina.id} className={styles.oficina_item}>
              <PostDetail oficina={oficina} /> {/* Exibe o componente PostDetail */}
            
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favoritas;
