import styles from './Oficina.module.css';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Oficina = () => {
    const { id } = useParams();
    const { document: oficina, loading } = useFetchDocument("oficinas", id);

    return (
        <div className={styles.oficina_container}>
            {loading && <p>Carregando Oficina...</p>}
            {oficina && (
                <>
                    <h1>{oficina.title}</h1>
                    <img src={oficina.image} alt={oficina.title} />
                    <p>{oficina.body}</p>
                    
                    {/* Exibir a descrição da oficina */}
                    <h3>Descrição:</h3>
                    <p>{oficina.description}</p>

                    <h3>Esta oficina trata sobre:</h3>
                    <div className={styles.tags}>
                        {/* Verificando se tagsArray é um array antes de mapear */}
                        {Array.isArray(oficina.tagsArray) && oficina.tagsArray.map((tag) => (
                            <p key={tag}><span>#</span>{tag}</p>
                        ))}
                    </div>
                    
                    <h3>Categoria:</h3>
                    <p>{oficina.category}</p>
                    <h3>Público-alvo:</h3>
                    <p>{oficina.targetAudience}</p>
                    <h3>Duração:</h3>
                    <p>{oficina.duration} horas</p>
                </>
            )}
        </div>
    );
};

export default Oficina;
