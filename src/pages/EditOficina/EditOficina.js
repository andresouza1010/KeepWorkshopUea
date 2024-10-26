import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase/config'; 
import styles from './EditOficina.module.css';

const EditOficina = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Usa o useNavigate
    const { document: oficina, loading } = useFetchDocument("oficinas", id);
    const [newTitle, setNewTitle] = useState('');
    const [newDescricao, setNewDescricao] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newTargetAudience, setNewTargetAudience] = useState('');
    const [newDuration, setNewDuration] = useState('');
    const [newRecursos, setNewRecursos] = useState('');
    const [newdescricao1, setNewDescricao1] = useState('');
    const [newdescricao2, setNewDescricao2] = useState('');
    const [newdescricao3, setNewDescricao3] = useState('');
    const [newdescricao4, setNewDescricao4] = useState('');

    const [images, setImages] = useState({
        image: '',
        image2: '',
        image3: '',
        image4: '',
    });

    

    const updateOficina = useCallback(async () => {
        const oficinaRef = doc(db, "oficinas", id);
        try {
            await updateDoc(oficinaRef, {
                title: newTitle || oficina.title,
                description: newDescricao || oficina.description,
                category: newCategory || oficina.category,
                targetAudience: newTargetAudience || oficina.targetAudience,
                duration: newDuration || oficina.duration,
                recursos: newRecursos || oficina.recursos,
                descricaoIntro: newdescricao1,
                descricaoOrganizacao: newdescricao2,
                descricaoPratica: newdescricao3,
                descricaoApresentacao: newdescricao4,
                image: images.image || oficina.image,
                image2: images.image2 || oficina.image2,
                image3: images.image3 || oficina.image3,
                image4: images.image4 || oficina.image4
            });
            console.log("Oficina atualizada com sucesso!");
            navigate('/');
        } catch (error) {
            console.error("Erro ao atualizar oficina:", error);
        }
    }, [id, oficina, newTitle, newDescricao, newCategory, newTargetAudience, newDuration, newRecursos, newdescricao1, newdescricao2, newdescricao3, newdescricao4, images, navigate]);

    useEffect(() => {
        if (oficina) {
            setNewTitle(oficina.title);
            setNewDescricao(oficina.description);
            setNewCategory(oficina.category);
            setNewTargetAudience(oficina.targetAudience);
            setNewDuration(oficina.duration);
            setNewRecursos(oficina.recursos);
            setNewDescricao1(oficina.descricaoIntro);
            setNewDescricao2(oficina.descricaoOrganizacao);
            setNewDescricao3(oficina.descricaoPratica);
            setNewDescricao4(oficina.descricaoApresentacao);
            setImages({
                image: oficina.image,
                image2: oficina.image2,
                image3: oficina.image3,
                image4: oficina.image4,
            });
        }
    }, [oficina]);

    // Função para lidar com a atualização das imagens
    const handleImageChange = (e, imageKey) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prevImages => ({
                    ...prevImages,
                    [imageKey]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.ooficinaContainer}>
            {loading && <p>Carregando Oficina...</p>}
            {oficina && (
                <div className={styles.ooficinaContent}>
                    <h2 className={styles.otitle}>Título
                        <input
                            type="text"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            placeholder={oficina.title}
                            
                        />
                    </h2>
                    {/* Conteúdo da oficina */}
                    <div className={styles.odescriptionCard}>
                        <h3 className={styles.odescriptionTitle}>Descrição</h3>
                        <textarea
                            value={newDescricao}
                            onChange={e => setNewDescricao(e.target.value)}
                            placeholder={oficina.description}
                        />
                    </div>

                    {/* Categoria */}
                    <div className={styles.odetailsSection}>
                        <h3>Categoria:</h3>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                            placeholder={oficina.category}
                        />
                    </div>

                                    {/* Público-alvo */}
                    <div className={styles.odetailItem}>
                        <h4>Público-alvo:</h4>
                        <select
                            value={newTargetAudience}
                            onChange={e => setNewTargetAudience(e.target.value)}
                        >
                            <option value="">Selecione o público-alvo</option>
                            <option value="4 a 6 anos">4 a 6 anos</option>
                            <option value="7 a 9 anos">7 a 9 anos</option>
                            <option value="10 a 12 anos">10 a 12 anos</option>
                            <option value="13 a 15 anos">13 a 15 anos</option>
                            <option value="16 anos ou mais">16 anos ou mais</option>
                        </select>
                    </div>

                    {/* Duração */}
                    <div className={styles.odetailItem}>
                        <h4>Duração:</h4>
                        <input
                            type="text"
                            value={newDuration}
                            onChange={e => setNewDuration(e.target.value)}
                            placeholder={`${oficina.duration} horas`}
                        />
                    </div>

                    {/* Recursos Necessários */}
                    <div className={styles.odetailItem}>
                        <h4>Recursos Necessários:</h4>
                        <input
                            type="text"
                            value={newRecursos}
                            onChange={e => setNewRecursos(e.target.value)}
                            placeholder={oficina.recursos}
                        />
                    </div>

                    {/* Etapas da oficina com inputs para editar as descrições */}
                    <h3 className={styles.ostepsTitle}>Etapas da Oficina</h3>

                    <div className={styles.ostepSection}>
                        <h4>Introdução:</h4>
                        <img className={styles.ooficinaImage} src={images.image} alt="Introdução" />

                        <input type="file" accept="image/*" style={{ display: 'none' }} id="imageInput" onChange={e => handleImageChange(e, 'image')} />
                        <button onClick={() => document.getElementById('imageInput').click()} className={styles.oeditImageButton}> Editar Imagem </button>

                        <textarea
                            value={newdescricao1}
                            onChange={e => setNewDescricao1(e.target.value)}
                            placeholder="Descrição da Introdução"
                        />
                    </div>

                    <div className={styles.ostepSection}>
                        <h4>Organização dos Materiais</h4>
                        <img className={styles.ooficinaImage2} src={images.image2} alt={oficina.title} />
                        <input type="file" accept="image/*" style={{ display: 'none' }} id="image2Input" onChange={e => handleImageChange(e, 'image2')} />
                        <button onClick={() => document.getElementById('image2Input').click()} className={styles.oeditImageButton}>
                            Editar Imagem
                        </button>
                        <textarea
                            value={newdescricao2}
                            onChange={e => setNewDescricao2(e.target.value)}
                            placeholder="Descrição da Organização dos Materiais"
                        />
                    </div>

                    <div className={styles.ostepSection}>
                        <h4>Momento Prático</h4>
                        <img className={styles.ooficinaImage3} src={images.image3} alt={oficina.title} />
                        <input type="file" accept="image/*" style={{ display: 'none' }} id="image3Input" onChange={e => handleImageChange(e, 'image3')} />
                        <button onClick={() => document.getElementById('image3Input').click()} className={styles.oeditImageButton}>
                            Editar Imagem
                        </button>
                        <textarea
                            value={newdescricao3}
                            onChange={e => setNewDescricao3(e.target.value)}
                            placeholder="Descrição do Momento Prático"
                        />
                    </div>

                    <div className={styles.ostepSection}>
                        <h4>Apresentação Final</h4>
                        <img className={styles.ooficinaImage4} src={images.image4} alt={oficina.title} />
                        <input type="file" accept="image/*" style={{ display: 'none' }} id="image4Input" onChange={e => handleImageChange(e, 'image4')} />
                        <button onClick={() => document.getElementById('image4Input').click()} className={styles.oeditImageButton}>
                            Editar Imagem
                        </button>
                        <textarea
                            value={newdescricao4}
                            onChange={e => setNewDescricao4(e.target.value)}
                            placeholder="Descrição da Apresentação Final"
                        />
                    </div>

                    {oficina.hasAccessibility && (
                        <div className={styles.oaccessibilitySection}>
                            <h3 className={styles.oaccessibilityTitle}>Acessibilidade:</h3>
                            <p className={styles.oaccessibilityInfo}>Esta oficina possui acessibilidade para pessoas com deficiência.</p>
                        </div>
                    )}

                    <button onClick={updateOficina} className={styles.osaveButton}>Salvar Alterações</button>
                </div>
            )}
        </div>
    );
};

export default EditOficina;
