import React, { useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './forgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const { resetPassword, loading } = useAuthentication();

  // Gerar um código CAPTCHA simples
  const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Atualizar o CAPTCHA ao carregar o componente
  useState(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (captcha !== captchaInput.toUpperCase()) {
      setError("O código de verificação está incorreto. Tente novamente.");
      setCaptcha(generateCaptcha()); // Gerar um novo CAPTCHA
      return;
    }

    const result = await resetPassword(email);
    if (result) {
      setMessage(result);
    } else {
      setError("Erro ao enviar o e-mail de redefinição. Verifique o e-mail digitado e tente novamente.");
    }
  };

  return (
    <div className={styles.containerEsqueciSenha}>
      <h1 className={styles.h1EsqueciSenha}>Esqueci minha senha</h1>
      <p className={styles.pEsqueciSenha}>Insira seu e-mail para receber um link de redefinição de senha:</p>
      <form onSubmit={handlePasswordReset} className={styles.formesquecisenha}>
        <input 
          type="email" 
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputesquecisenha}
        />
        
        {/* CAPTCHA */}
        <div className={styles.captchaContainer}>
          <p className={styles.captchaText}>{captcha}</p>
          <input 
            type="text" 
            placeholder="Digite o código de verificação"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
            className={styles.inputesquecisenha}
          />
        </div>

        <button type="submit" disabled={loading} className={styles.buttonesquecisenha}>
          {loading ? "Enviando..." : "Enviar e-mail de redefinição"}
        </button>
      </form>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
