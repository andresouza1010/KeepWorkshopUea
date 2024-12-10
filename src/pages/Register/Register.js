import React, { useState, useEffect } from 'react';
import styles from "./Register.module.css";
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    };

    // Chamada para criar o usuário no sistema de autenticação
    const res = await createUser({ email, password });

    if (res && res.user) {
      // Salvando o perfil do usuário no localStorage com chave única
      const userProfileKey = `user_${res.user.uid}`;
      localStorage.setItem(
        userProfileKey,
        JSON.stringify({ ...user, uid: res.user.uid })
      );
    } else {
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);



  return (
    <div className={styles.register}>
      <h1 className={styles.registerH1}>Bem-vindo!</h1>
      <p className={styles.registerp}>Crie sua conta e compartilhe as suas ideias!</p>
      <form onSubmit={handleSubmit} className={styles.formregister}>
        <label className={styles.labelregister}>
          <span className={styles.spanregister}>Nome:</span>
          <input
            className={styles.inputregister}
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label className={styles.labelregister}>
          <span className={styles.spanregister}>E-mail:</span>
          <input
            className={styles.inputregister}
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
    

        

        <label   className={styles.labelregister}>
          <span   className={styles.spansenharegister}>Senha:</span>
          <input
            className={styles.inputregister}
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label   className={styles.labelregister}>
          <span   className={styles.spanregister}>Confirmação de senha:</span>
          <input
            className={styles.inputregister}
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <div className={styles.terms}>
          <label   className={styles.labelderegister}>
            <input
              className={styles.inputregister}
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
