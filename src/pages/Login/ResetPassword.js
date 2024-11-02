import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from './resetPassword.module.css';

const ResetPassword = () => {
  const { validateOldPassword, changePassword, error, loading } = useAuthentication();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
  const [message, setMessage] = useState("");

  const handleValidateOldPassword = async (e) => {
    e.preventDefault();
    const isValid = await validateOldPassword(email, oldPassword);
    setIsOldPasswordValid(isValid);

    if (!isValid) {
      setMessage("Senha antiga incorreta.");
    } else {
      setMessage(""); // Limpa a mensagem caso a senha antiga esteja correta
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const response = await changePassword(email, newPassword);
    if (response) setMessage(response); // Exibe mensagem de sucesso
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Redefinir Senha</h2>
      <form 
        className={styles.form}
        onSubmit={isOldPasswordValid ? handleChangePassword : handleValidateOldPassword}
      >
        <input 
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Digite sua senha antiga"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className={styles.input}
        />
        {isOldPasswordValid && (
          <input
            type="password"
            placeholder="Defina sua nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
        )}
        <button type="submit" disabled={loading} className={styles.button}>
          {isOldPasswordValid ? "Redefinir Senha" : "Validar Senha Antiga"}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
