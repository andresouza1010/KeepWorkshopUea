import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from './AuthorProfile.module.css';

const AuthorProfile = () => {
  const { uid } = useParams(); // Obtém o UID do autor a partir da URL
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'users', uid); // Busca o autor pelo UID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAuthor(docSnap.data());
        } else {
          console.error('Autor não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do autor:', error);
      }
      setLoading(false);
    };

    fetchAuthor();
  }, [uid]);

  if (loading) {
    return <p>Carregando informações do autor...</p>;
  }

  if (!author) {
    return <p>Autor não encontrado.</p>;
  }

  return (
    <div className={styles.profile}>
      <img 
        src={author.profileImage || 'https://via.placeholder.com/150'}
        alt="Foto do Autor"
        className={styles.profileImage}
      />
      <h1>{author.displayName || 'Nome não disponível'}</h1>
      <p><strong>Email:</strong> {author.email || 'Email não disponível'}</p>
      <p><strong>Sobre:</strong> {author.about || 'Descrição não adicionada'}</p>
      <p><strong>Telefone:</strong> {author.phone || 'Telefone não informado'}</p>
    </div>
  );
};

export default AuthorProfile;
