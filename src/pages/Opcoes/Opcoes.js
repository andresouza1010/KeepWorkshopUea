// Opcoes.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams
import { FaPen } from 'react-icons/fa';
import styles from './Opcoes.module.css';
import { useAuthValue } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Opcoes = () => {
  const { user: authUser } = useAuthValue();
  const { uid } = useParams(); // Obter uid da URL
  const [user, setUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = uid || authUser?.uid; // Usar uid da URL ou do usuário autenticado
        if (!userId) {
          setLoading(false);
          return;
        }

        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUser(userDocSnap.data());
        } else {
          if (userId === authUser?.uid) {
            // Se for o usuário autenticado e não existir perfil, cria um novo
            const initialProfile = {
              displayName: authUser.displayName || 'Usuário',
              email: authUser.email || 'Email não informado',
              phone: '',
              about: '',
              profileImage: null,
            };
            await setDoc(userDocRef, initialProfile);
            setUser(initialProfile);
          } else {
            // Se for outro usuário e o perfil não existir
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar o perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser, uid]);

  const handleSaveProfile = async () => {
    setIsEditingProfile(false);
    try {
      const userDocRef = doc(db, 'users', authUser.uid);
      await setDoc(userDocRef, user);
    } catch (error) {
      console.error('Erro ao salvar o perfil:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Limitar o tamanho da imagem a 500KB
      if (file.size > 500 * 1024) {
        alert('A imagem é muito grande. Por favor, selecione uma imagem menor que 500KB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const updatedUser = { ...user, profileImage: reader.result };
        setUser(updatedUser);
        try {
          const userDocRef = doc(db, 'users', authUser.uid);
          await setDoc(userDocRef, updatedUser);
        } catch (error) {
          console.error('Erro ao salvar a imagem de perfil:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  if (!user) {
    return <p className={styles.alert}>Usuário não encontrado.</p>;
  }

  // Verifica se o perfil é do usuário autenticado
  const isOwnProfile = authUser && (authUser.uid === uid || (!uid && authUser.uid));

  return (
    <div className={styles.container}>
      <div className={styles.coverPhoto}></div>

      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          <img
            src={user.profileImage || 'https://via.placeholder.com/150'}
            alt="Foto de Perfil"
            className={styles.profileImage}
          />
          {isOwnProfile && (
            <label htmlFor="upload-photo" className={styles.editIcon}>
              <FaPen />
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>

        <h2 className={styles.profileName}>
          {isOwnProfile && isEditingProfile ? (
            <input
              type="text"
              value={user.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              className={styles.textInput}
              placeholder="Digite seu nome"
            />
          ) : (
            user.displayName || 'Nome do Usuário'
          )}
        </h2>

        {isOwnProfile && isEditingProfile ? (
          <div>
            <input
              type="tel"
              value={user.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={styles.textInput}
              placeholder="Digite seu telefone"
            />
            <textarea
              value={user.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              className={styles.textarea}
              placeholder="Conte sobre você"
            />
            <button onClick={handleSaveProfile} className={styles.saveButton}>
              Salvar
            </button>
          </div>
        ) : (
          <>
            <p className={styles.aboutText}>
              {user.about || 'Adicione algo sobre você.'}
            </p>
            <p className={styles.phoneText}>
              <strong>Telefone:</strong> {user.phone || 'Nenhum telefone adicionado.'}
            </p>
          </>
        )}

        {isOwnProfile && (
          <button
            className={styles.editButton}
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            {isEditingProfile ? 'Cancelar' : 'Editar'}
          </button>
        )}
      </div>

      <div className={styles.userDetails}>
        <div className={styles.userDetail}>
          <strong>Email:</strong>
          <span>{user.email || 'Email não informado'}</span>
        </div>
      </div>
    </div>
  );
};

export default Opcoes;
