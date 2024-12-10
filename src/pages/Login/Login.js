import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Link } from 'react-router-dom';

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = { email, password };
    const res = await login(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.loginlogin}>
      <h1 className={styles.h1login}>Entrar</h1>
      <p className={styles.plogin}>Faça o Login para ter acesso às oficinas!</p>
      <form onSubmit={handleSubmit} className={styles.formlogin}>
        <label className={styles.labellogin}>
          <span className={styles.spandologin}>E-mail:</span>
          <input 
          className={styles.inputlogin}

            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.labellogin}>
          <span className={styles.spanlogin}>Senha:</span>
          <input 
            className={styles.inputlogin}
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        
        {/* Redefinir a senha e redefinir senha */}
        {/*<div className={styles.passwordOptions}>
          <Link to="/reset-password" className={styles.link}>
            Redefinir minha senha
          </Link>

        </div>*/}

        <div className={styles.passwordOptions}>
        <Link to="/forgot-password" className={styles.linklogin}>
            Esqueci minha senha
          </Link>
          </div>

        <div className={styles.buttonContainerlogin}>
          {!loading && <button className="btn">Entrar</button>}
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

export default Login;
