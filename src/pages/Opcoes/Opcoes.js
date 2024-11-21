import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import styles from './Opcoes.module.css';
import { useAuthValue } from '../../context/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const storage = getStorage();

const Opcoes = () => {
  const { user: authUser } = useAuthValue();
  const [user, setUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const userProfileKey = `user_${authUser?.uid}`;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const savedUser = localStorage.getItem(userProfileKey);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        const initialProfile = {
          displayName: authUser.displayName || 'Usuário',
          email: authUser.email || 'Email não informado',
          phone: '',
          about: '',
          profileImage: null,
        };
        setUser(initialProfile);
        localStorage.setItem(userProfileKey, JSON.stringify(initialProfile));
      }
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [authUser, userProfileKey]);

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  const handleSaveProfile = async () => {
    setIsEditingProfile(false);

    if (user) {
      try {
        // Salve os dados do usuário no Firestore
        await setDoc(doc(db, "users", authUser.uid), user);
        // Atualize o localStorage
        localStorage.setItem(userProfileKey, JSON.stringify(user));
      } catch (error) {
        console.error("Erro ao salvar perfil:", error);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `profileImages/${authUser.uid}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        const updatedUser = { ...user, profileImage: imageUrl };
        setUser(updatedUser);

        // Atualize o Firestore e localStorage
        await setDoc(doc(db, "users", authUser.uid), updatedUser);
        localStorage.setItem(userProfileKey, JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
      }
    }
  };

  if (!authUser) {
    return <p className={styles.alert}>Nenhum usuário autenticado. Faça login para acessar o perfil.</p>;
  }

  if (!user) {
    return <p className={styles.alert}>Carregando perfil...</p>;
  }

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
        </div>

        <h2 className={styles.profileName}>
          {isEditingProfile ? (
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

        {isEditingProfile ? (
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
            <p className={styles.aboutText}>{user.about || 'Adicione algo sobre você.'}</p>
            <p className={styles.phoneText}><strong>Telefone:</strong> {user.phone || 'Nenhum telefone adicionado.'}</p>
          </>
        )}

        <button
          className={styles.editButton}
          onClick={() => setIsEditingProfile(!isEditingProfile)}
        >
          {isEditingProfile ? 'Cancelar' : 'Editar'}
        </button>
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
