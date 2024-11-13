import React, { useState, useEffect } from 'react';
import styles from "./Register.module.css";
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(""); // Novo estado para telefone
  const [profileImage, setProfileImage] = useState(null); // Novo estado para a imagem de perfil
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Verificação de senha e termos de uso
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    if (!acceptTerms) {
      setError("Você precisa aceitar os Termos de Uso para se cadastrar.");
      return;
    }

    // Preparação dos dados do usuário
    const user = {
      displayName,
      email,
      password,
      phone,
      profileImage
    };

    localStorage.setItem("user", JSON.stringify(user)); // Salva o usuário no localStorage
    const res = await createUser(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Manipulador para o upload da imagem de perfil
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Armazena a imagem como base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.register}>
      <h1>Bem-vindo!</h1>
      <p>Crie sua conta e compartilhe as suas ideias!</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Nome:</span>
          <input 
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input 
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Telefone:</span>
          <input 
            type="tel"
            name="phone"
            required
            placeholder="Digite seu número de telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <label>
  <span>Foto de Perfil - Opcional:</span>
  <label className={styles["label-photo-upload"]}>
    Escolher Foto
    <input 
      type="file"
      name="profileImage"
      accept="image/*"
      onChange={handleProfileImageChange}
    />
  </label>
  {profileImage && <img src={profileImage} alt="Pré-visualização" className={styles["profile-image-preview"]} />}
</label>
       
        <label>
          <span>Senha:</span>
          <input 
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input 
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        
        <div className={styles.terms}>
          <label>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            Eu li e aceito os <a href="/termos" target="_blank">Termos de Uso</a>
          </label>
        </div>

        <div className={styles.buttonContainer}>
          {!loading && <button className="btn">Cadastrar</button>}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
