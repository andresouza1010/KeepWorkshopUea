import styles from './Oficina.module.css'

import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';
const Oficina = () => {
    const { id } = useParams();
    const {document: oficina, loading} = useFetchDocument("oficinas", id)

  return (
    <div className={styles.oficina_container}>
        { loading && <p> Carregando Oficina... </p>}
        {oficina &&(
            <>
            <h1>{oficina.title}</h1>
            <img src={oficina.image} alt={oficina.title}/>
            <p>{oficina.body}</p>
            <h3>
              Esta oficina trata sobre:
            </h3>
            <div className={styles.tags}>
            {oficina.tagsArray.map((tag)=>(
              <p key = {tag}><span>#</span>{tag}</p>
            ))}
            </div>
            </>
        )}
    /</div>
  )
}

export default Oficina
