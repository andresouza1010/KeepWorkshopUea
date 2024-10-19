import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup - deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Função para criar usuário e salvar o displayName
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      // Criação do usuário com email e senha
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Atualiza o perfil do usuário com o displayName
      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      return user;
    } catch (error) {
      let systemErrorMessage;

      // Tratamento de erros específicos
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres!";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde!";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  // Logout - Sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // Login - Sign in
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      // Autenticação do usuário
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      // Tratamento de erros no login
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  // Cleanup da requisição quando o componente é desmontado
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
