import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid

  const {documents: oficinas, loading } = useFetchDocuments("oficinas", null,uid);

  const {deleteDocument} = useDeleteDocument("oficinas");
 
  if(loading){
    return <p>Carregando...</p>
  }


  return (
      <div className={styles.Dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie as suas oficinas!</p>
        {oficinas && oficinas.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontradas!</p>
            <Link to="/oficinas/create" className="btn">
                Criar Primeira Oficina
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.oficina_header}>
              <span>Título</span>
              <span>Ações</span>
            </div>
  
            {oficinas &&
            oficinas.map((oficina) => (
              <div key={oficina.id} className={styles.oficina_row}>
                <p>{oficina.title}</p>
                <div>
                  <Link to={`/oficinas/${oficina.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`/oficinas/edit/${oficina.id}`} className="btn btn-outline">
                    Editar
                  </Link>
                  <button 
                    onClick={() => deleteDocument(oficina.id)} 
                    className="btn btn-outline btn-danger">
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
  );
  
};

export default Dashboard
