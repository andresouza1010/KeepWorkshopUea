import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
//context
import { AuthProvider } from "./context/AuthContext";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import CreateOficina from "./pages/CreateOficina/CreateOficina";
import Favoritas from "./pages/Favoritas/Favoritas";
import Perfil from "./pages/Perfil/Perfil";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const[user, setUser] = useState(undefined)
  const{auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth]);

  if(loadingUser){
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/oficinas/create" element={user ?<CreateOficina/> : <Navigate to="/login"/>}/>
                <Route path="/Favoritas" element={<Favoritas/>}/>
                <Route path="/Perfil" element={<Perfil/>}/>
                <Route 
                  path="/Login" 
                  element={!user ?<Login/> : <Navigate to="/"/>}/>
                <Route 
                  path="/Register" 
                  element={!user ?<Register/> : <Navigate to="/"/>}/>
                <Route path="/Dashboard" element={user ?<Dashboard/> : <Navigate to="/login"/>}/>
                

          
            </Routes>
      </div>
      <Footer />

      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
