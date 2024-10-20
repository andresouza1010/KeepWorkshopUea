import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa"; // Ícone de coração preenchido
import styles from './Favoritas.module.css';
import { Link } from 'react-router-dom';

const Favoritas = () => {
  const [favoritas, setFavoritas] = useState([]);

  // Carregar as oficinas favoritas do localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritas')) || [];
    setFavoritas(storedFavorites);
  }, []);

  // Função para remover oficina dos favoritos
  const removeFavorite = (oficinaId) => {
    const updatedFavorites = favoritas.filter(fav => fav.id !== oficinaId);
    setFavoritas(updatedFavorites);
    localStorage.setItem('favoritas', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.favoritas_container}>
      <h1>Oficinas Favoritas</h1>
      {favoritas.length === 0 ? (
        <p>Você ainda não favoritou nenhuma oficina.</p>
      ) : (
        <div className={styles.oficinas_list}>
          {favoritas.map(oficina => (
            <div key={oficina.id} className={styles.oficina_detail}>
              <img src={oficina.image} alt={oficina.title} />
              <h2>{oficina.title}</h2>
              <p>{oficina.description.length > 100 ? `${oficina.description.substring(0, 100)}...` : oficina.description}</p>
              
              <div className={styles.button_container}>
                <Link to={`/oficinas/${oficina.id}`} className="btn btn-outline">Acessar</Link>
              </div>

              {/* Ícone de favorito no canto inferior esquerdo */}
              <button
                className={styles.favorite_icon}
                onClick={() => removeFavorite(oficina.id)}
                style={{ color: '#ff385c' }}  // Ícone sempre vermelho porque já é favoritado
              >
                <FaHeart />  {/* Coração preenchido */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritas;
