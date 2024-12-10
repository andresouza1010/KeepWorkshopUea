import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import styles from './TermosDeUso.module.css'; // Estilos opcionais

const TermosDeUso = () => {
  const navigate = useNavigate(); // Para navegação de volta à página de cadastro

  // Função para voltar para a página de cadastro
  const handleBackToRegister = () => {
    navigate('/register'); // Caminho da página de cadastro
  };


  return (
    <div className={styles.termosDeUsoContainer}>
      <h1>Termos de Uso</h1>
      <p>
        Bem-vindo à nossa plataforma! Ao utilizar nossos serviços, você concorda com os seguintes Termos de Uso. Por favor, leia-os cuidadosamente antes de usar a plataforma.
      </p>

      <h2>1. Responsabilidade pelas Postagens</h2>
      <p>
        Você é inteiramente responsável por qualquer conteúdo que publicar ou compartilhar na plataforma. Isso inclui, mas não se limita a, textos, imagens, vídeos ou links. Ao postar, você declara que detém todos os direitos sobre o conteúdo e que ele não infringe os direitos de terceiros.
      </p>

    

      <h2>2. Direitos de Uso</h2>
      <p>
        Ao utilizar a plataforma, você concede à empresa o direito de utilizar, modificar, adaptar e exibir qualquer conteúdo que você postar, de acordo com as necessidades do serviço. No entanto, você mantém a propriedade de todo o conteúdo que criar.
      </p>

      <h2>3. Proibições</h2>
      <ul>
        <li>Publicar qualquer conteúdo que seja ofensivo, ilegal ou que viole direitos de terceiros.</li>
        <li>Usar a plataforma para realizar atividades fraudulentas, enganosas ou prejudiciais.</li>
        <li>Tentar hackear, modificar ou alterar o funcionamento da plataforma.</li>
      </ul>

      <h2>4. Alterações dos Termos</h2>
      <p>
        A empresa se reserva o direito de alterar estes Termos de Uso a qualquer momento. Notificaremos os usuários sobre quaisquer mudanças significativas. É sua responsabilidade revisar os Termos regularmente.
      </p>

      <h2>5. Aceitação dos Termos</h2>
      <p>
        Ao criar uma conta e utilizar nossos serviços, você concorda com todos os termos descritos acima. Se você não concordar com qualquer parte desses Termos, por favor, não utilize a plataforma.
      </p>

      <h2>6. Contato</h2>
      <p>
        Se você tiver qualquer dúvida ou preocupação sobre os Termos de Uso, entre em contato conosco através do e-mail <a href="mailto:support@platforma.com">support@platforma.com</a>.
      </p>

      {/* Botão para voltar ao cadastro */}
      <button onClick={handleBackToRegister} className={styles.backButton}>
        Voltar para Cadastro
      </button>
    </div>
  );
};

export default TermosDeUso;
