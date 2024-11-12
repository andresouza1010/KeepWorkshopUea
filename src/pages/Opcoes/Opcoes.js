import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import styles from './Opcoes.module.css';

const Opcoes = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({ displayName: false, email: false, phone: false, profileImage: false });
  const [updatedUser, setUpdatedUser] = useState({ displayName: '', email: '', phone: '', profileImage: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setUpdatedUser(parsedUser);
    }
  }, []);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    const newUser = { ...user, [field]: updatedUser[field] };
    setUser(newUser);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setUpdatedUser((prev) => ({ ...prev, profileImage: base64Image }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = () => {
    const newUser = { ...user, profileImage: updatedUser.profileImage };
    setUser(newUser);
    setIsEditing((prev) => ({ ...prev, profileImage: false }));
    localStorage.setItem("user", JSON.stringify(newUser));
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
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Foto de Perfil"
              className={styles.profileImage}
            />
          ) : (
            <p>Sem imagem</p>
          )}
          {isEditing.profileImage ? (
            <>
              <input type="file" onChange={handleImageUpload} />
              <button className={styles.saveButton} onClick={handleImageSave}>Salvar</button>
            </>
          ) : (
            <FaEdit className={styles.editIcon} onClick={() => handleEdit('profileImage')} />
          )}
        </div>
        <div className={styles.profileName}>{user.displayName}</div>
        <button className={styles.editProfileButton} onClick={() => handleEdit('displayName')}>Editar Perfil</button>
      </div>

      {/* Detalhes do Usuário */}
      <div className={styles.userDetails}>
        <div className={styles.userDetail}>
          <strong>Nome:</strong>
          {isEditing.displayName ? (
            <>
              <input
                type="text"
                name="displayName"
                value={updatedUser.displayName}
                onChange={handleChange}
              />
              <button className={styles.saveButton} onClick={() => handleSave('displayName')}>Salvar</button>
            </>
          ) : (
            <>
              {user.displayName} <FaEdit className={styles.editIcon} onClick={() => handleEdit('displayName')} />
            </>
          )}
        </div>
        <div className={styles.userDetail}>
          <strong>Email:</strong>
          {isEditing.email ? (
            <>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
              />
              <button className={styles.saveButton} onClick={() => handleSave('email')}>Salvar</button>
            </>
          ) : (
            <>
              {user.email} <FaEdit className={styles.editIcon} onClick={() => handleEdit('email')} />
            </>
          )}
        </div>
        <div className={styles.userDetail}>
          <strong>Telefone:</strong>
          {isEditing.phone ? (
            <>
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
              />
              <button className={styles.saveButton} onClick={() => handleSave('phone')}>Salvar</button>
            </>
          ) : (
            <>
              {user.phone} <FaEdit className={styles.editIcon} onClick={() => handleEdit('phone')} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opcoes;
