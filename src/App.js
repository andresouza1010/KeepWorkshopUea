import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
// context
import { AuthProvider } from "./context/AuthContext";

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Opcoes from "./pages/Opcoes/Opcoes";
import CreateOficina from "./pages/CreateOficina/CreateOficina";
import EditOficina from "./pages/EditOficina/EditOficina";
import Favoritas from "./pages/Favoritas/Favoritas";
import Perfil from "./pages/Perfil/Perfil";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/Login/ResetPassword";
import ForgotPassword from "./pages/Login/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import Oficina from "./pages/Oficina/Oficina";
import Sugestao from "./pages/Sugestao/Sugestao";
import TermosDeUso from "./pages/TermosDeUso/TermosDeUso"; // Novo componente de Termos de Uso

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(undefined);
  const [selectedCategories, setSelectedCategories] = useState([]); // Novo estado para categorias
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }


  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <div className="page-container">
            <NavBar 
              selectedCategories={selectedCategories} 
              setSelectedCategories={setSelectedCategories} 
            />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home selectedCategories={selectedCategories} />} />
                <Route path="/about" element={<About />} />
                <Route path="/oficinas/create" element={user ? <CreateOficina /> : <Navigate to="/login" />} />
                <Route path="/oficinas/edit/:id" element={user ? <EditOficina /> : <Navigate to="/login" />} />
                <Route path="/favoritas" element={<Favoritas />} />
                <Route path="/sugestao" element={<Sugestao />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/search" element={<Search />} />
                <Route path="/oficinas/:id" element={<Oficina user={user} />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/termos-de-uso" element={<TermosDeUso />} />
                <Route path="/termos" element={<TermosDeUso />} />
                <Route path="/Opcoes" element={<Opcoes />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}  

export default App;
