import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';

const PostDetail = ({ oficina }) => {
  return (
    <div>
      {/* Exibe a imagem da oficina, mas antes usa o operador opcional "?."
          para garantir que a propriedade `oficina` e a imagem existam, 
          evitando erros caso `oficina` ainda não esteja carregada. */}
      <img src={oficina?.image} alt={oficina?.title} />
      
      {/* Exibe o título da oficina, garantindo que a propriedade `title` existe. */}
      <h2>{oficina?.title}</h2>
      
      {/* Exibe o nome da pessoa que criou a oficina */}
      <p>{oficina?.createBy}</p>
      
      <div>
        {/* Verifica se `oficina.tagsArray` existe e contém tags, antes de tentar mapear.
            Caso existam tags, ele as exibe com um # na frente, 
            senão, exibe a mensagem "Sem tags disponíveis". */}
        {oficina?.tagsArray && oficina.tagsArray.length > 0 ? (
          oficina.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>{tag}
            </p>
          ))
        ) : (
          // Caso não haja tags, exibe um texto informando que não há tags
          <p>Sem tags disponíveis</p>
        )}
      </div>
      
      {/* Cria um link que leva à página detalhada da oficina, 
          garantindo que o ID da oficina existe com "?.id". */}
      <Link to={`/oficinas/${oficina?.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
