import React, { useState } from 'react'; // Importando useState
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import styles from './Oficina.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Oficina = () => {
    const { id } = useParams();
    const { document: oficina, loading } = useFetchDocument("oficinas", id);
    const [isOpen, setIsOpen] = useState(false); // Estado para controle do modal
    const [selectedImage, setSelectedImage] = useState(''); // Estado para a imagem selecionada

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

                        <h3 className={styles.stepsTitle}>Etapas da Oficina</h3>
                        
                        <div className={styles.stepSection}>
                        <h4>Introdução:</h4>
                        <p>{oficina.descricaoIntro}</p>
                        <div className={styles.imageContainer}>
                            <img className={styles.oficinaImage} src={oficina.image} alt="Introdução" />
                            <button className={styles.smallButton} onClick={() => openModal(oficina.image)}>
                                <i className="fa fa-search-plus" aria-hidden="true"></i> {/* Ícone de ampliar */}
                            </button>
                        </div>
                    </div>

                    <div className={styles.stepSection}>
                        <h4>Organização dos Materiais</h4>
                        <p>{oficina.descricaoOrganizacao}</p>
                        <div className={styles.imageContainer}>
                            <img className={styles.oficinaImage2} src={oficina.image2} alt={oficina.title} />
                            <button className={styles.smallButton} onClick={() => openModal(oficina.image2)}>
                                <i className="fa fa-search-plus" aria-hidden="true"></i> {/* Ícone de ampliar */}
                            </button>
                        </div>
                    </div>

                    <div className={styles.stepSection}>
                        <h4>Momento Prático</h4>
                        <p>{oficina.descricaoPratica}</p>
                        <div className={styles.imageContainer}>
                            <img className={styles.oficinaImage3} src={oficina.image3} alt={oficina.title} />
                            <button className={styles.smallButton} onClick={() => openModal(oficina.image3)}>
                                <i className="fa fa-search-plus" aria-hidden="true"></i> {/* Ícone de ampliar */}
                            </button>
                        </div>
                    </div>

                    <div className={styles.stepSection}>
                        <h4>Apresentação Final</h4>
                        <p>{oficina.descricaoApresentacao}</p>
                        <div className={styles.imageContainer}>
                            <img className={styles.oficinaImage4} src={oficina.image4} alt={oficina.title} />
                            <button className={styles.smallButton} onClick={() => openModal(oficina.image4)}>
                                <i className="fa fa-search-plus" aria-hidden="true"></i> {/* Ícone de ampliar */}
                            </button>
                        </div>
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

            {/* Modal para imagem ampliada */}
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
