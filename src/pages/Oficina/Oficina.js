import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import styles from './Oficina.module.css';
import 'font-awesome/css/font-awesome.min.css';

const Oficina = () => {

    const readAloudContent = () => {
        const contentToRead = `
            Título da oficina: ${oficina.title}. 
            Descrição: ${oficina.description}. 
            Categoria: ${oficina.category}. 
            Público alvo: ${oficina.targetAudience}.
            Duração: ${oficina.duration} horas.
            Recursos necessários: ${oficina.recursos}.
            ${oficina.descricaoIntro}
            ${oficina.descricaoOrganizacao}
            ${oficina.descricaoPratica}
            ${oficina.descricaoApresentacao}.
            Autor: ${oficina.createdBy || oficina.socialLink || "Informação do autor não disponível."}
        `;
        
        // Verifica se a API SpeechSynthesis está disponível
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(contentToRead);
            speech.lang = 'pt-BR'; // Define o idioma como português
            speech.rate = 1; // Define a velocidade da fala
            window.speechSynthesis.speak(speech);
        } else {
            alert("O seu navegador não suporta leitura em voz alta.");
        }
    };

    
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
        {/* Seu código já existente */}
        
        {/* Botão de leitura em voz alta */}
        <div className={styles.readAloudButton} onClick={readAloudContent}>
            <i className="fa fa-volume-up" aria-hidden="true"></i>
            Ouvir
        </div>

        {/* Restante do seu código */}
    
        <div className={styles.oficinaContainer}>
            {loading && <p>Carregando Oficina...</p>}
            {oficina && (
                <div className={styles.oficinaContent}>
                    <h2 className={styles.title}>{oficina.title}</h2>

                    <div className={styles.descriptionCard}>
                        <h3 className={styles.descriptionTitle}>Descrição</h3>
                        <p className={styles.oficinap}>{oficina.description}</p>
                    </div>

                    <div className={styles.detailsSection}>
                        <h3 className={styles.detailsTitle}>Detalhes da Oficina</h3>
                        <div className={styles.detailItem}>
                            <h4>Categoria:</h4>
                            <p className={styles.oficinap}>{oficina.category}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Público-alvo:</h4>
                            <p className={styles.oficinap}>{oficina.targetAudience}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Duração:</h4>
                            <p className={styles.oficinap}>{oficina.duration} horas</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Recursos Necessários:</h4>
                            <p className={styles.oficinap}>{oficina.recursos}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Esta oficina trabalha com algum público específico:</h4>
                            <p className={styles.oficinap}>{oficina.categoriaDoPublico}</p>

                            {/* Verifica e exibe as descrições de acessibilidade conforme o público específico */}
                            {oficina.categoriaDoPublico === 'Pessoas no espectro do autismo' && oficina.accessibilityDescriptions['autista'] && (
                                <p className={styles.oficinap}>{oficina.accessibilityDescriptions['autista']}</p>
                            )}

                            {oficina.categoriaDoPublico === 'Pessoas com TDAH' && oficina.accessibilityDescriptions['tdah'] && (
                                <p className={styles.oficinap}>{oficina.accessibilityDescriptions['tdah']}</p>
                            )}

                            {oficina.categoriaDoPublico === 'Pessoas com deficiência visual' && oficina.accessibilityDescriptions['deficientes visuais'] && (
                                <p className={styles.oficinap}>{oficina.accessibilityDescriptions['deficientes visuais']}</p>
                            )}

                            {oficina.categoriaDoPublico === 'Pessoas com deficiência auditiva' && oficina.accessibilityDescriptions['pessoas surdas'] && (
                                <p className={styles.oficinap}>{oficina.accessibilityDescriptions['pessoas surdas']}</p>
                            )}

                            {oficina.categoriaDoPublico === 'Outro público' && oficina.accessibilityDescriptions['outro público'] && (
                                <p className={styles.oficinap}>{oficina.accessibilityDescriptions['outro público']}</p>
                                
                            )}
                        </div>
                    </div>

                    <h3 className={styles.stepsTitle}>Etapas da Oficina</h3>

                    {/* Introdução */}
                    <div className={styles.stepSection}>
                        <h4 className={styles.oficinah4}>Introdução</h4>
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
                        <p className={styles.oficinap}>{oficina.descricaoIntro}</p>
                    </div>

                    {/* Organização dos Materiais */}
                    <div className={styles.stepSection}>
                        <h4 className={styles.oficinah4}>Organização dos Materiais</h4>
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
                        <h4 className={styles.oficinah4}>Momento Prático</h4>
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
                        <h4 className={styles.oficinah4}>Apresentação Final</h4>
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
                        <p className={styles.oficinap}>{oficina.descricaoApresentacao}</p>
                    </div>

                    {/* Nome ou Rede Social do Autor */}
                    <div className={styles.authorInfo}>
                        <h4 className={styles.oficinaautor}>Autor(a):</h4>
                        <p className={styles.oficinap}>{oficina.createdBy || oficina.socialLink || "Informação do autor não disponível"}</p>
                    </div>
                </div>
            )}

            {/* Formulário de Avaliação */}
            <div className={styles.feedbackForm}>
                <p>Gostou da oficina? Avalie o conteúdo preenchendo o formulário abaixo:</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfSyyWTyuzbx-AXjL_rI0SNiYRaxqN6q733nTCabnXWygiLjg/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                    Clique aqui para preencher o formulário
                </a>
            </div>

            {isOpen && (
                <div className={styles.modal} onClick={closeModal}>
                    <img className={styles.modalImage} src={selectedImage} alt="Imagem Ampliada" />
                    <button className={styles.closeButton} onClick={closeModal}>Fechar</button>
                </div>
            )}
        </div>
        </div>
    );
};

export default Oficina;
