import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importar o módulo de autenticação

const firebaseConfig = {
  apiKey: "AIzaSyBdi5wX7XLsEfu8z08fnrfVWf7MqAXlu7U",
  authDomain: "keepworkshop-c050f.firebaseapp.com",
  projectId: "keepworkshop-c050f",
  storageBucket: "keepworkshop-c050f.appspot.com",
  messagingSenderId: "792272228022",
  appId: "1:792272228022:web:8ac28d6e98682e12b7e017",
  measurementId: "G-RC1HV4F4HY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Inicializar a autenticação

export { db, auth }; // Exportar também o auth
