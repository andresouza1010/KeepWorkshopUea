import React, { useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword, loading } = useAuthentication();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const result = await resetPassword(email);
    if (result) {
      setMessage(result);
    } else {
      setError("Erro ao enviar o e-mail de redefinição. Verifique o e-mail digitado e tente novamente.");
    }
  };

  return (
    <div>
      <h1>Esqueci minha senha</h1>
      <p>Insira seu e-mail para receber um link de redefinição de senha:</p>
      <form onSubmit={handlePasswordReset}>
        <input 
          type="email" 
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar e-mail de redefinição"}
        </button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
