// Importa a biblioteca React, necessária para criar componentes no React.
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import styles from "./Footer.module.css"; // Importa o arquivo de estilos CSS específico para o componente Footer.

const Footer = () => {
  const navigate = useNavigate(); // Hook para navegação

  // Função para navegar para a página de Termos de Uso
  const handleGoToTerms = () => {
    navigate('/termos-de-uso'); // Caminho da página de Termos de Uso
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.containerfooter}>
        <div className={styles.infofooter}>
          <h3 className={styles.titlefooter}>Keep Workshop</h3>
          <p className={styles.pfooter}>Visualize e armazene as oficinas para as suas aulas!</p>
          <p className={styles.copyRight}>Keep Workshop &copy; 2024</p>
        </div>
        <div className={styles.linksfooter}>
          <h4 className={styles.linkTitlefooter}>Links Úteis</h4>
          <ul className={styles.lufooter}>
            <li className={styles.lifooter}>
              <a href="mailto:pjandresouza@gmail.com" className={styles.linkfooter}>
                Contato
              </a>
            </li>
            <li className={styles.lifooter}>
              <button onClick={handleGoToTerms} className={styles.linkButtonfooter}>
                Termos de Serviço
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

// Exporta o componente Footer para que ele possa ser importado e utilizado em outros arquivos.
export default Footer;
