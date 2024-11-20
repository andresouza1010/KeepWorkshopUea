import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa'; // Ícone de edição
import styles from './Opcoes.module.css';
import { useAuthValue } from '../../context/AuthContext'; // Para obter o usuário logado

const Opcoes = () => {
  const { user: authUser } = useAuthValue(); // Obtém o usuário logado
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);

  // Chave única para armazenar o perfil do usuário
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


  const handleSaveProfile = () => {
    setIsEditingName(false);
    localStorage.setItem(userProfileKey, JSON.stringify(user));
  };

  const handleNameChange = (e) => {
    setUser((prev) => ({ ...prev, displayName: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    setUser((prev) => ({ ...prev, phone: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, profileImage: reader.result };
      setUser(updatedUser);
      localStorage.setItem(userProfileKey, JSON.stringify(updatedUser));
    };
    if (file) {
      reader.readAsDataURL(file);
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
      {/* Banner de Capa */}
      <div className={styles.coverPhoto}>
        <p>Perfil do Usuário</p>
      </div>

      {/* Seção de Perfil */}
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

        <div className={styles.profileName}>
          {isEditingName ? (
            <div>
              <input
                type="text"
                value={user.displayName}
                onChange={handleNameChange}
                className={styles.textInput}
                placeholder="Digite seu nome"
              />
              <input
                type="tel"
                value={user.phone}
                onChange={handlePhoneChange}
                className={styles.textInput}
                placeholder="Digite seu telefone"
              />
              <button onClick={handleSaveProfile} className={styles.saveButton}>
                Salvar
              </button>
            </div>
          ) : (
            <div className={styles.editableField}>
              <span>{user.displayName || 'Nome do Usuário'}</span>
              <FaPen
                className={styles.editIcon}
                onClick={() => setIsEditingName(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Detalhes do Usuário */}
      <div className={styles.userDetails}>
        <div className={styles.userDetail}>
          <strong>Email:</strong>
          <span>{user.email || 'Email não informado'}</span>
        </div>
        <div className={styles.userDetail}>
          <strong>Telefone:</strong>
          <span>{user.phone || 'Telefone não informado'}</span>
        </div>
      </div>
    </div>
  );
};

export default Opcoes;
