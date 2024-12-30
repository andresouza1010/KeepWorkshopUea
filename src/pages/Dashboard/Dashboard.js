import styles from "./Dashboard.module.css";

//import { Link } from "react-router-dom";
//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: oficinas, loading } = useFetchDocuments("oficinas", null, uid);
  const { deleteDocument } = useDeleteDocument("oficinas");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.Dashboard}>
      <p className={styles.Dashboardpp}>Gerencie as suas oficinas!</p>
      {oficinas && oficinas.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontradas!</p>
          <button
            onClick={() => navigate("/oficinas/create")}
            className="btn btn-outline"
          >
            Criar Primeira Oficina
          </button>
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
                  {/* Botão "Ver" */}
                  
                  {/* Botão "Ver" */}
                <button
                  onClick={() => navigate(`/oficinas/${oficina.id}`)}
                  className={`${styles.btn} ${styles.btnView}`}
                >
                  Ver
                </button>

                {/* Botão "Editar" */}
                <button
                  onClick={() => navigate(`/oficinas/edit/${oficina.id}`)}
                  className={`${styles.btn} ${styles.btnEdit}`}
                >
                  Editar
                </button>

                {/* Botão "Excluir" */}
                <button
                  onClick={() => deleteDocument(oficina.id)}
                  className={`${styles.btn} ${styles.btnDelete}`}
                >
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
