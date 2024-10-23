import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import styles from './Oficina.module.css';

const Oficina = () => {
    const { id } = useParams();
    const { document: oficina, loading } = useFetchDocument("oficinas", id);

    return (
        <div className={styles.oficinaContainer}>
            {loading && <p>Carregando Oficina...</p>}
            {oficina && (
                <div className={styles.oficinaContent}>
                    <h2 className={styles.title}>{oficina.title}</h2>
                   
                    <div className={styles.descriptionCard}>
                        <h3 className={styles.descriptionTitle}>Descrição</h3>
                        <p>{oficina.description}</p>
                    </div>

                    <div className={styles.detailsSection}>
                        <h3 className={styles.detailsTitle}>Detalhes da Oficina</h3>
                        <div className={styles.detailItem}>
                            <h4>Categoria:</h4>
                            <p>{oficina.category}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Público-alvo:</h4>
                            <p>{oficina.targetAudience}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Duração:</h4>
                            <p>{oficina.duration} horas</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Recursos Necessários:</h4>
                            <p>{oficina.recursos}</p>
                        </div>

                        <h3 className={styles.stepsTitle}>Etapas da Oficina</h3>
                        <div className={styles.stepSection}>
                            <h4>Introdução:</h4>
                            <p>{oficina.descricaoIntro}</p>
                            {
                                 <img className={styles.oficinaImage} src={oficina.image} alt={oficina.title} />

                            }
                        </div>

                        
                    </div>

                    {oficina.hasAccessibility && (
                        <div className={styles.accessibilitySection}>
                            <h3 className={styles.accessibilityTitle}>Elementos de Acessibilidade</h3>
                            <p>{oficina.accessibilityDescription}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Oficina;