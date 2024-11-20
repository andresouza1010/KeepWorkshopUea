import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favoritas.module.css';
import { FaTrash } from 'react-icons/fa';

const Favoritas = () => {
  const [favoritas, setFavoritas] = useState([]);

  // Carrega as oficinas favoritas do localStorage ao montar o componente
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritas")) || [];
    setFavoritas(favorites);
  }, []);

  // Função para excluir uma oficina dos favoritos
  const handleDelete = (id) => {
    const updatedFavorites = favoritas.filter(oficina => oficina.id !== id);
    localStorage.setItem("favoritas", JSON.stringify(updatedFavorites));
    setFavoritas(updatedFavorites); // Atualiza o estado
  };

  return (
    <div className={styles.favoritas_container}>
      <h1>Oficinas Favoritas</h1>
      <div className={styles.oficinas_list}>
        {favoritas.length === 0 ? (
          <p>Você ainda não tem oficinas favoritas.</p>
        ) : (
          favoritas.map(oficina => (
            <div key={oficina.id} className={styles.oficina_item}>
              <img 
                src={oficina.image && oficina.image[0] ? oficina.image[0] : 'default-image.jpg'} 
                alt={oficina.title} 
              />
              <h2>{oficina.title}</h2>
              <p>{oficina.description}</p>
              <p>Autor: {oficina.createdBy || "Autor desconhecido"}</p>
              <p>Público-alvo: {oficina.targetAudience}</p>
              <p>Duração: {oficina.duration} horas</p>
              
              <div className={styles.button_container}>
                <Link to={`/oficinas/${oficina.id}`} className="btn btn-outline">
                  Acessar
                </Link>
                <button 
                  className={styles.delete_button}
                  onClick={() => handleDelete(oficina.id)}
                  aria-label={`Remover ${oficina.title} dos favoritos`}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favoritas;
