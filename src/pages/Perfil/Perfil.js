import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Perfil = () => {
  const { authorId } = useParams(); // Obtém o ID do autor da URL
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    // Simulação de busca dos dados do autor com base no authorId
    // Substitua isso por uma chamada real ao banco de dados
    const fetchAuthorInfo = async () => {
      // Exemplo de simulação
      const mockData = {
        name: "Autor Exemplo",
        bio: "Sou um entusiasta maker com anos de experiência.",
      };
      setAuthorInfo(mockData);
    };

    fetchAuthorInfo();
  }, [authorId]);

  return (
    <div>
      {authorInfo ? (
        <>
          <h1>Perfil de {authorInfo.name}</h1>
          <p>{authorInfo.bio}</p>
        </>
      ) : (
        <p>Carregando informações do autor...</p>
      )}
    </div>
  );
};

export default Perfil;
