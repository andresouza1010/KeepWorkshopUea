import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase/config'; 
import styles from './EditOficina.module.css';

const EditOficina = () => {
    const { id } = useParams();
    const { document: oficina, loading } = useFetchDocument("oficinas", id);
    const [newTitle, setNewTitle] = useState(''); // Armazena o novo título
    const [newDescricao, setNewDescricao] = useState(''); // Armazena a nova descrição

    // Função para atualizar título e descrição no Firestore
    const updateOficina = useCallback(async (newTitle, newDescricao) => {
        const oficinaRef = doc(db, "oficinas", id);
        try {
            await updateDoc(oficinaRef, {
                title: newTitle || oficina.title, // Atualiza somente se houver mudança
                description: newDescricao || oficina.description
            });
            console.log("Oficina atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar oficina:", error);
        }
    }, [id, oficina]); // Adiciona as dependências necessárias

    // Atualiza o Firestore quando houver alteração no título ou na descrição
    useEffect(() => {
        if (oficina && (newTitle !== oficina.title || newDescricao !== oficina.description)) {
            updateOficina(newTitle, newDescricao);
        }
    }, [newTitle, newDescricao, oficina, updateOficina]);

    // Define os valores atuais quando o documento for carregado
    useEffect(() => {
        if (oficina) {
            setNewTitle(oficina.title);
            setNewDescricao(oficina.description);
        }
    }, [oficina]);

    // Monitora alterações no campo de edição do título
    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    // Monitora alterações no campo de edição da descrição
    const handleDescricaoChange = (e) => {
        setNewDescricao(e.target.value);
    };

    return (
        <div className={styles.oficinaContainer}>
            {loading && <p>Carregando Oficina...</p>}
            {oficina && (
                <div className={styles.oficinaContent}>
                    <h2 className={styles.title}>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={handleTitleChange}
                            placeholder={oficina.title}
                        />
                    </h2>
                    {/* Conteúdo da oficina */}
                    <div className={styles.descriptionCard}>
                        <h3 className={styles.descriptionTitle}>Descrição</h3>
                        <textarea
                            value={newDescricao}
                            onChange={handleDescricaoChange}
                            placeholder={oficina.description}
                        />
                    </div>

                    {/* Detalhes */}
                    <div className={styles.detailsSection}>
                        <h3>Categoria:</h3>
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
                        <img className={styles.oficinaImage} src={oficina.image} alt="Introdução" />
                    </div>

                    <div className={styles.stepSection}>
                        <h4>Organização dos Materiais</h4>
                        <p>{oficina.descricaoOrganizacao}</p>
                        <img className={styles.oficinaImage2} src={oficina.image2} alt={oficina.title} />
                    </div>

                    <div className={styles.stepSection}>
                        <h4>Momento Prático</h4>
                        <p>{oficina.descricaoPratica}</p>
                        <img className={styles.oficinaImage3} src={oficina.image3} alt={oficina.title} />
                    </div>

                    <div className={styles.stepSection}>
                        <h4>Apresentação Final</h4>
                        <p>{oficina.descricaoApresentacao}</p>
                        <img className={styles.oficinaImage4} src={oficina.image4} alt={oficina.title} />
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

export default EditOficina;
