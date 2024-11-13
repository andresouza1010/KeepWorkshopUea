import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import styles from './Oficina.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Oficina = () => {
    const { id } = useParams();
    const { document: oficina, loading } = useFetchDocument("oficinas", id);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (image) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage('');
    };

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
                    </div>

                    <h3 className={styles.stepsTitle}>Etapas da Oficina</h3>

                    {/* Introdução */}
                    <div className={styles.stepSection}>
                        <h4>Introdução</h4>
                        {oficina.image && oficina.image.length > 0 && (
                            <div className={styles.imageContainer}>
                                {oficina.image.map((img, index) => (
                                    <img
                                        key={index}
                                        className={styles.oficinaImage}
                                        src={img}
                                        alt={`Introdução ${index + 1}`}
                                        onClick={() => openModal(img)}
                                    />
                                ))}
                            </div>
                        )}
                        <p>{oficina.descricaoIntro}</p>
                    </div>

                    {/* Organização dos Materiais */}
                    <div className={styles.stepSection}>
                        <h4>Organização dos Materiais</h4>
                        {oficina.image2 && oficina.image2.length > 0 && (
                            <div className={styles.imageContainer}>
                                {oficina.image2.map((img, index) => (
                                    <img
                                        key={index}
                                        className={styles.oficinaImage}
                                        src={img}
                                        alt={`Organização ${index + 1}`}
                                        onClick={() => openModal(img)}
                                    />
                                ))}
                            </div>
                        )}
                        <p>{oficina.descricaoOrganizacao}</p>
                    </div>

                    {/* Momento Prático */}
                    <div className={styles.stepSection}>
                        <h4>Momento Prático</h4>
                        {oficina.image3 && oficina.image3.length > 0 && (
                            <div className={styles.imageContainer}>
                                {oficina.image3.map((img, index) => (
                                    <img
                                        key={index}
                                        className={styles.oficinaImage}
                                        src={img}
                                        alt={`Prático ${index + 1}`}
                                        onClick={() => openModal(img)}
                                    />
                                ))}
                            </div>
                        )}
                        <p>{oficina.descricaoPratica}</p>
                    </div>

                    {/* Apresentação Final */}
                    <div className={styles.stepSection}>
                        <h4>Apresentação Final</h4>
                        {oficina.image4 && oficina.image4.length > 0 && (
                            <div className={styles.imageContainer}>
                                {oficina.image4.map((img, index) => (
                                    <img
                                        key={index}
                                        className={styles.oficinaImage}
                                        src={img}
                                        alt={`Apresentação ${index + 1}`}
                                        onClick={() => openModal(img)}
                                    />
                                ))}
                            </div>
                        )}
                        <p>{oficina.descricaoApresentacao}</p>
                    </div>

                    {/* Acessibilidade */}
                    {oficina.accessibility === 'sim' && (
                        <div className={styles.accessibilitySection}>
                            <h3 className={styles.accessibilityTitle}>Elementos de Acessibilidade</h3>
                            <p>{oficina.descriptionAcessivel}</p>
                        </div>
                    )}

                    {/* Nome ou Rede Social do Autor */}
                    <div className={styles.authorInfo}>
                        <h4>Autor(a):</h4>
                        <p>{oficina.createdBy || oficina.socialLink || "Informação do autor não disponível"}</p>
                    </div>
                </div>
            )}

            {isOpen && (
                <div className={styles.modal} onClick={closeModal}>
                    <img className={styles.modalImage} src={selectedImage} alt="Imagem Ampliada" />
                    <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
                </div>
            )}
        </div>
    );
};

export default Oficina;
