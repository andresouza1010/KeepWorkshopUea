// Importa a biblioteca React, necessária para criar componentes no React.
import React from 'react';

// Importa o arquivo de estilos CSS específico para o componente Footer, permitindo usar classes CSS com `styles`.
import styles from "./Footer.module.css";

// Define um componente funcional chamado Footer.
const Footer = () => {
  return (
    // Retorna o JSX que define o layout do rodapé. A tag <footer> aplica a classe CSS 'footer' do arquivo CSS importado.
    <footer className={styles.footer}>
      {/* Exibe um título (<h3>) com o texto "Escreva sobre o que você tem interesse!" */}
      <h3>Escreva sobre o que você tem interesse!</h3>

      {/* Exibe um parágrafo (<p>) com o nome do site e o símbolo de copyright. */}
      <p>Keep Workshop &copy; 2024</p>
    </footer>
  );
};

// Exporta o componente Footer para que ele possa ser importado e utilizado em outros arquivos.
export default Footer;
