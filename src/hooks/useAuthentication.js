import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Importar db do config.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importar o módulo de armazenamento
import { setDoc, doc } from 'firebase/firestore'; // Importa as funções do Firestore

const storage = getStorage(); // Inicializar o armazenamento

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) return;
  }
  // Função para enviar e-mail de redefinição de senha
  const resetPassword = async (email) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      return "E-mail de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada.";
    } catch (error) {
      let systemErrorMessage;


      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Esse e-mail não está cadastrado.";
      } else {
        systemErrorMessage = "Erro ao enviar o e-mail de redefinição. Tente novamente.";
      }

      setLoading(false);
      setError(systemErrorMessage);
      return null; // Retorna null se houver erro
    }
  };

  // Função para fazer upload da imagem de perfil
  const uploadProfileImage = async (image) => {
    const storageRef = ref(storage, `profileImages/${image.name}`);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef); // Retorna a URL da imagem
  };

  // Função para criar usuário e salvar o displayName e a imagem do perfil
  const createUser = async (data) => {
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
  
    // Atualiza o displayName no Authentication
    await updateProfile(user, {
      displayName: data.displayName,
    });
  
    // Salva os dados do usuário no Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: data.displayName,
      email: user.email,
      phone: "",
      about: "",
      profileImage: "",
    });
  
    return user;
  };
  

  // Função para validar a senha antiga
  const validateOldPassword = async (email, oldPassword) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      // Tenta fazer login com a senha antiga
      await signInWithEmailAndPassword(auth, email, oldPassword);
      setLoading(false);
      return true; // Senha antiga correta
    } catch (error) {
      setLoading(false);
      setError("Senha antiga incorreta.");
      return false; // Senha antiga incorreta
    }
  };

  // Função para atualizar a senha
  const changePassword = async (email, newPassword) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        setLoading(false);
        return "Senha alterada com sucesso!";
      } else {
        setLoading(false);
        setError("Nenhum usuário autenticado.");
      }
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("weak-password")) {
        systemErrorMessage = "A nova senha precisa conter pelo menos 6 caracteres!";
      } else {
        systemErrorMessage = "Erro ao redefinir a senha. Tente novamente.";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

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
    validateOldPassword,  // Retorna a função de validação da senha antiga
    changePassword,
    resetPassword,       // Retorna a função para alterar a senha
  };
};
