import React from 'react';
import styles from './Sugestao.module.css';
import { FaLightbulb, FaQuestionCircle, FaPenNib } from 'react-icons/fa';

const Sugestao = () => {
  return (
    <div className={styles.sugestaoContainer}>
      <header className={styles.header}>
        <h1>Guia para Criar sua Oficina Maker</h1>
        <p>Inspire-se e aprenda a montar uma oficina interativa e educativa!</p>
      </header>

      {/* Passo 1 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaLightbulb /></div>
        <h2>Passo 1: Conceitos de STEAM</h2>
        <p>
          Escolha ao menos dois conceitos de STEAM (Ciência, Tecnologia, Engenharia, Arte e Matemática) que serão abordados 
          na oficina. Esses conceitos irão orientar o conteúdo e destacar o propósito da atividade.
        </p>
        <p><strong>Exemplos:</strong> Sustentação de estruturas, pressão hidráulica, divisão de frações, brilho e contraste, etc.</p>
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
      </section>

      {/* Passo 3 */}
      <section className={styles.passo}>
        <div className={styles.icon}><FaPenNib /></div>
        <h2>Passo 3: Produza uma Narrativa</h2>
        <p>
          Crie uma narrativa que descreva o problema e sua relevância para os participantes. Confira o exemplo e o prompt 
          de Inteligência Artificial abaixo.
        </p>
        <p><strong>Exemplo:</strong></p>
        <blockquote>
          João mora em uma comunidade perto de um rio no Amazonas, e muitas vezes eles não têm luz, especialmente quando chove muito. 
          Isso torna difícil para todos verem à noite e se manterem seguros. Além disso, como é difícil conseguir tecnologia e não há 
          muitos recursos para energia, eles também enfrentam problemas com muita água das chuvas e lixo acumulado, o que complica ainda mais as coisas.
        </blockquote>

        {/* Prompt para IA */}
        <h3>Prompt para uso com IA</h3>
        <p className={styles.prompt}>
          <em>
            "Crie um problema para uma narrativa educacional baseada na metodologia Design Thinking. Siga o padrão: [Invente 
            um nome de personagem], de uma comunidade [descreva o ambiente ou local] precisa resolver um problema - sugira 
            um problema relevante com o qual o conceito STEAM [inclua o(s) conceito(s)] possa ajudar. Ao final desta aula, 
            os alunos terão produzido um [descreva brevemente o produto da oficina]. Para o problema, leve em consideração 
            limitações como [mencione as limitações tecnológicas ou materiais] e as potencialidades incluindo [mencione 
            recursos naturais ou habilidades da comunidade]. O texto deve ser apenas um parágrafo, simples, claro e 
            entendido por pessoas de [faixa etária] anos."
          </em>
        </p>
      </section>
    </div>
  );
};

export default Sugestao;
