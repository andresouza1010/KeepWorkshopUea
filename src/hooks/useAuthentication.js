import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { db, storage } from "../firebase/config"; // Inclui o storage do config.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importar o módulo de armazenamento
import { setDoc, doc } from "firebase/firestore"; // Importa as funções do Firestore

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

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
      return null;
    }
  };

  // Função para criar usuário e salvar o displayName e a imagem do perfil
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      let photoURL = "";
      if (data.profileImage) {
        // Faça o upload da imagem para o Firebase Storage
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        const snapshot = await uploadBytes(storageRef, data.profileImage);
        photoURL = await getDownloadURL(snapshot.ref);
      }

      // Atualize o perfil do Authentication
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL,
      });

      // Salve os dados no Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: data.displayName,
        email: user.email,
        phone: "",
        about: "",
        profileImage: photoURL,
      });

      setLoading(false);
      return user;
    } catch (error) {
      let systemErrorMessage;

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

  // Função para validar a senha antiga
  const validateOldPassword = async (email, oldPassword) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      // Tenta fazer login com a senha antiga
      await signInWithEmailAndPassword(auth, email, oldPassword);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError("Senha antiga incorreta.");
      return false;
    }
  };

  // Função para atualizar a senha
  const changePassword = async (newPassword) => {
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
    validateOldPassword,
    changePassword,
    resetPassword,
  };
};
