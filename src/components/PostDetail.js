import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';

const PostDetail = ({ oficina }) => {
  return (
    <div className={styles.oficina_detail}>
      <img src={oficina?.image} alt={oficina?.title} />
      
      <h2>{oficina?.title}</h2>
      
      <p className={styles.createdby}>{oficina?.createBy}</p>

      {/* Exibindo a categoria */}
      <p className={styles.category}>Categoria: {oficina?.category}</p>

      {/* Exibindo o público-alvo */}
      <p className={styles.audience}>Público-alvo: {oficina?.targetAudience}</p>

      {/* Exibindo a duração da oficina */}
      <p className={styles.duration}>Duração: {oficina?.duration} horas</p>

      <div className={styles.tags}>
        {oficina?.tagsArray && oficina.tagsArray.length > 0 ? (
          oficina.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>{tag}
            </p>
          ))
        ) : (
          <p>Sem tags disponíveis</p>
        )}
      </div>
    
      <Link to={`/oficinas/${oficina?.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};



export default PostDetail;
