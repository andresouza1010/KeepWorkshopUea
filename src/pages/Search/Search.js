import React from 'react';

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: oficinas } = useFetchDocuments("oficinas", search);

  return (
    <div className={styles.search_container}>
      <h2>Pesquisar</h2>
      <div className={styles.posts}>
        {oficinas && oficinas.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {oficinas && oficinas.map((oficina) => <PostDetail key={oficina.id} oficina={oficina} />)}
      </div>
    </div>
  );
};

export default Search;
