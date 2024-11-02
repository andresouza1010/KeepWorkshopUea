import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importa o ícone de lápis

const Opcoes = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({ displayName: false, email: false, phone: false, profileImage: false });
  const [updatedUser, setUpdatedUser] = useState({ displayName: '', email: '', phone: '', profileImage: '' });

  useEffect(() => {
    // Recupera os dados do usuário do localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setUpdatedUser(parsedUser); // Inicializa com os dados do usuário existente
    }
  }, []);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    const newUser = { ...user, [field]: updatedUser[field] };
    setUser(newUser);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    localStorage.setItem("user", JSON.stringify(newUser)); // Atualiza o localStorage
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
      reader.readAsDataURL(file); // Converte a imagem para base64
    }
  };

  const handleImageSave = () => {
    const newUser = { ...user, profileImage: updatedUser.profileImage };
    setUser(newUser);
    setIsEditing((prev) => ({ ...prev, profileImage: false }));
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  if (!user) {
    return <p>Usuário não encontrado. Por favor, faça o cadastro.</p>;
  }

  return (
    <div>
      <h1>Dados do Usuário</h1>
      <div>
        <p>
          <strong>Nome:</strong>{' '}
          {isEditing.displayName ? (
            <>
              <input
                type="text"
                name="displayName"
                value={updatedUser.displayName}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('displayName')}>Salvar</button>
            </>
          ) : (
            <>
              {user.displayName}{' '}
              <FaEdit onClick={() => handleEdit('displayName')} style={{ cursor: 'pointer' }} />
            </>
          )}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          {isEditing.email ? (
            <>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('email')}>Salvar</button>
            </>
          ) : (
            <>
              {user.email}{' '}
              <FaEdit onClick={() => handleEdit('email')} style={{ cursor: 'pointer' }} />
            </>
          )}
        </p>
        <p>
          <strong>Telefone:</strong>{' '}
          {isEditing.phone ? (
            <>
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
              />
              <button onClick={() => handleSave('phone')}>Salvar</button>
            </>
          ) : (
            <>
              {user.phone}{' '}
              <FaEdit onClick={() => handleEdit('phone')} style={{ cursor: 'pointer' }} />
            </>
          )}
        </p>
        <div>
          <strong>Foto de Perfil:</strong>
          {isEditing.profileImage ? (
            <>
              <input type="file" onChange={handleImageUpload} />
              <button onClick={handleImageSave}>Salvar</button>
            </>
          ) : (
            <>
              {user.profileImage && (
                <img
                  src={user.profileImage}
                  alt="Foto de Perfil"
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              )}
              <FaEdit onClick={() => handleEdit('profileImage')} style={{ cursor: 'pointer' }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Opcoes;
