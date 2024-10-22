import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Ícone de coração preenchido e contorno
import styles from './Favoritas.module.css';
import { Link } from 'react-router-dom';

const Favoritas = () => {
  const [favoritas, setFavoritas] = useState([]);
  const [favoritedIds, setFavoritedIds] = useState(new Set());

  // Carregar as oficinas favoritas do localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritas')) || [];
    setFavoritas(storedFavorites);
    const ids = new Set(storedFavorites.map(oficina => oficina.id));
    setFavoritedIds(ids);
  }, []);

  // Função para adicionar/remover oficina dos favoritos
  const handleFavorite = (oficinaId) => {
    const updatedFavorites = favoritas.filter(fav => fav.id !== oficinaId);
    if (favoritedIds.has(oficinaId)) {
      // Se já está favoritado, remove dos favoritos
      setFavoritas(updatedFavorites);
      favoritedIds.delete(oficinaId);
    } else {
      // Se não está favoritado, adiciona aos favoritos
      const newFavorite = favoritas.find(oficina => oficina.id === oficinaId);
      if (newFavorite) {
        updatedFavorites.push(newFavorite);
        favoritedIds.add(oficinaId);
      }
    }
    localStorage.setItem('favoritas', JSON.stringify(updatedFavorites));
    setFavoritedIds(new Set(favoritedIds)); // Atualiza o estado
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

              {/* Botão de favoritar/desfavoritar */}
              <button
                className={`${styles.favorite_icon} ${favoritedIds.has(oficina.id) ? styles.favorited : ''}`}
                onClick={() => handleFavorite(oficina.id)}
                aria-label={favoritedIds.has(oficina.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                style={{ position: 'absolute', top: '10px', right: '10px' }} // Posição no canto superior direito
              >
                {favoritedIds.has(oficina.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritas;
