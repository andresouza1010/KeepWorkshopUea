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

                    <h3>Etapa 1:</h3>
                    <p>{oficina.etapa1}</p>
                    {oficina.image && (
                        <img src={oficina.image} alt="Imagem da Etapa 1" style={{ width: '200px' }} />
                    )}

                    {oficina.etapa2 && (
                        <>
                            <h3>Etapa 2:</h3>
                            <p>{oficina.etapa2}</p>
                            {oficina.etapa2Image && (
                                <img src={oficina.etapa2Image} alt="Imagem da Etapa 2" style={{ width: '200px' }} />
                            )}
                        </>
                    )}

                    {oficina.etapa3 && (
                        <>
                            <h3>Etapa 3:</h3>
                            <p>{oficina.etapa3}</p>
                            {oficina.etapa3Image && (
                                <img src={oficina.etapa3Image} alt="Imagem da Etapa 3" style={{ width: '200px' }} />
                            )}
                        </>
                    )}

                    {oficina.etapa4 && (
                        <>
                            <h3>Etapa 4:</h3>
                            <p>{oficina.etapa4}</p>
                            {oficina.etapa4Image && (
                                <img src={oficina.etapa4Image} alt="Imagem da Etapa 4" style={{ width: '200px' }} />
                            )}
                        </>
                    )}

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
