import React, { useState } from 'react';
import styles from './Sugestao.module.css';
import { FaLightbulb, FaQuestionCircle, FaPenNib } from 'react-icons/fa';

const Sugestao = () => {
  const [concepts, setConcepts] = useState('');
  const [problem, setProblem] = useState('');
  const [category, setCategory] = useState('');
  const [narrative, setNarrative] = useState('');
  const [resources, setResources] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [duration, setDuration] = useState('');
  const [introduction, setIntroduction] = useState(''); // Adiciona o campo de introdução

  return (
    <div className={styles.sugestaoContainer}>
      <header className={styles.header}>
        <h1>Guia para Criar sua Oficina Maker</h1>
        <p>Inspire-se e aprenda a montar uma oficina interativa e educativa!</p>
      </header>

      {/* Passo 1 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaLightbulb /></div>
        <h2>Passo 1: Conceitos de STEAM </h2>
        <p>
          Escolha ao menos dois conceitos de STEAM (Ciência, Tecnologia, Engenharia, Arte e Matemática) que serão abordados 
          na oficina. Esses conceitos irão orientar o conteúdo e destacar o propósito da atividade.
        </p>
        <p><strong>Exemplos:</strong> Sustentação de estruturas, pressão hidráulica, divisão de frações, brilho e contraste, etc.</p>
        <input
          type="text"
          placeholder="Digite os conceitos de STEAM para o seu título!"
          value={concepts}
          onChange={(e) => setConcepts(e.target.value)}
          className={styles.input}
        />
      </section>

      {/* Passo 2 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaQuestionCircle /></div>
        <h2>Passo 2: Identificação do Problema</h2>
        <p>
          Qual problema sua oficina se propõe a ajudar a resolver? No Design Thinking, a experiência parte de um problema real 
          enfrentado pelos participantes.
        </p>
        <p><strong>Exemplos:</strong> Poluição dos rios, excesso de lixo, desemprego, falta de energia, etc.</p>
        <input
          type="text"
          placeholder="Digite o problema identificado"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className={styles.input}
        />
        <p><strong>Categoria:</strong> Selecione a categoria que representa a abordagem que você usará em sua oficina!</p>
        <label className={styles.label}>
          <select 
            name="category" 
            required 
            onChange={(e) => setCategory(e.target.value)} 
            value={category}
            className={styles.select}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Eletrônica">Eletrônica</option>
            <option value="Programação">Programação</option>
            <option value="Mecânica">Mecânica</option>
            <option value="Robótica">Robótica</option>
            <option value="Engenharia">Engenharia</option>
            <option value="Arte e design">Arte e design</option>
            <option value="Reciclagem e sustentabilidade">Reciclagem e sustentabilidade</option>
            <option value="Edição de vídeo e voz">Edição de vídeo e voz</option>
          </select>
        </label>

        <h3>Recursos Necessários</h3>
        <p>Liste os recursos e materiais necessários para a execução da oficina. Isso ajudará os participantes a se prepararem adequadamente.</p>
        <textarea
          placeholder="Digite os recursos necessários"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          className={styles.textarea}
        />
      </section>

      {/* Passo 3 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaPenNib /></div>
        <h2>Passo 3: Produza uma Narrativa</h2>
        <p>
          Crie uma narrativa que descreva o problema e sua relevância para os participantes. Confira o exemplo abaixo.
        </p>
        <p><strong>Exemplo:</strong></p>
        <blockquote>
          André mora em uma comunidade perto de um rio no Amazonas, e muitas vezes eles não têm luz, especialmente quando chove muito. 
          Isso torna difícil para todos verem à noite e se manterem seguros. Além disso, como é difícil conseguir tecnologia e não há 
          muitos recursos para energia, eles também enfrentam problemas com muita água das chuvas e lixo acumulado, o que complica ainda mais as coisas.
        </blockquote>
        <textarea
          placeholder="Digite a narrativa"
          value={narrative}
          onChange={(e) => setNarrative(e.target.value)}
          className={styles.textarea}
        />
        {/* Campo para Público-alvo */}
        <label className={styles.label}>
          <span>Público-alvo</span>
          <select 
            name="targetAudience" 
            required 
            onChange={(e) => setTargetAudience(e.target.value)} 
            value={targetAudience}
            className={styles.select}
          >
            <option value="">Selecione o público-alvo</option>
            <option value="4 a 6 anos">4 a 6 anos</option>
            <option value="7 a 9 anos">7 a 9 anos</option>
            <option value="10 a 12 anos">10 a 12 anos</option>
            <option value="13 a 15 anos">13 a 15 anos</option>
            <option value="16 anos ou mais">16 anos ou mais</option>
          </select>
        </label>
        {/* Campo para Duração da Oficina */}
        <label className={styles.label}>
          <span>Duração da oficina (em horas)</span>
          <input 
            type="number" 
            name="duration" 
            required 
            min="1" 
            placeholder="Ex: 2 (Tempo ideal para que todos participem ativamente)" 
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            className={styles.input}
          />
        </label>
      </section>

      {/* Passo 4 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaLightbulb /></div>
        <h2>Passo 4: Introdução</h2>
        <p>Elabore uma introdução sobre a oficina, destacando o propósito e o impacto que pretende gerar nos participantes.</p>
        <textarea
          placeholder="Digite a introdução"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className={styles.textarea}
        />
      </section>
      <section className={styles.passo}>
        <div className={styles.icon}><FaLightbulb /></div>
        <h2>Passo 5: Organização de Materiais</h2>
        <p>Elabore uma introdução sobre a oficina, destacando o propósito e o impacto que pretende gerar nos participantes.</p>
        <textarea
          placeholder="Distribuição de Materiais"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className={styles.textarea}
        />
      </section>
      <section className={styles.passo}>
        <div className={styles.icon}><FaLightbulb /></div>
        <h2>Passo 4: Introdução</h2>
        <p>Elabore uma introdução sobre a oficina, destacando o propósito e o impacto que pretende gerar nos participantes.</p>
        <textarea
          placeholder="Digite a introdução"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className={styles.textarea}
        />
      </section>
      <section className={styles.passo}>
        <div className={styles.icon}><FaLightbulb /></div>
        <h2>Passo 4: Introdução</h2>
        <p>Elabore uma introdução sobre a oficina, destacando o propósito e o impacto que pretende gerar nos participantes.</p>
        <textarea
          placeholder="Digite a introdução"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className={styles.textarea}
        />
      </section>
    </div>
  );
};

export default Sugestao;
