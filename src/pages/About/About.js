//CSS
import React from 'react';
import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
    return(
        <div className={styles.about}>
        <h1>Sobre o Keep Workshop</h1>
        <Link to="/oficinas/create" className="btn">Criar Oficina</Link>
        </div>
    );
};

export default About;