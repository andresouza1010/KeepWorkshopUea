import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa'; // Ícone de edição
import styles from './Opcoes.module.css';

const Opcoes = () => {
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleNameChange = (e) => {
    setUser((prev) => ({ ...prev, displayName: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, profileImage: reader.result };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    localStorage.setItem("user", JSON.stringify(user));
  };

  if (!user) {
    return <p className={styles.alert}>Usuário não encontrado. Por favor, faça o cadastro.</p>;
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
              />
              <button onClick={handleSaveName} className={styles.saveButton}>
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
