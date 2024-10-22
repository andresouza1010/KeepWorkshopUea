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
                    <h1 className={styles.title}>{oficina.title}</h1>
                    <img className={styles.oficinaImage} src={oficina.image} alt={oficina.title} />

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
                            {oficina.imageIntroducao && (
                                <img className={styles.stepImage} src={oficina.imageIntroducao} alt="Introdução" />
                            )}
                        </div>

                        <div className={styles.stepSection}>
                            <h4>Organização de Materiais:</h4>
                            <p>{oficina.descricaoOrganizacao}</p>
                            {oficina.imageOrganizacao && (
                                <img className={styles.stepImage} src={oficina.imageOrganizacao} alt="Organização" />
                            )}
                        </div>

                        <div className={styles.stepSection}>
                            <h4>Momento Prático:</h4>
                            <p>{oficina.descricaoPratica}</p>
                            {oficina.imagePratica && (
                                <img className={styles.stepImage} src={oficina.imagePratica} alt="Momento Prático" />
                            )}
                        </div>

                        <div className={styles.stepSection}>
                            <h4>Apresentação Final:</h4>
                            <p>{oficina.descricaoApresentacao}</p>
                            {oficina.imageApresentacao && (
                                <img className={styles.stepImage} src={oficina.imageApresentacao} alt="Apresentação Final" />
                            )}
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
