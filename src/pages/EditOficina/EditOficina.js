import styles from './EditOficina.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';



const EditOficina = () => {
  const { id } = useParams()
  const {document:oficina} = useFetchDocument("oficinas",id)
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(()=>{
    if(oficina){
        setTitle(oficina.title)
        setBody(oficina.body)
        setImage(oficina.image)

        const textTags = oficina.tagsArray.join(",")
        setTags(textTags)
    }
  }, [oficina])

  const {user} = useAuthValue()

  const {updateDocument, response} = useUpdateDocument("oficinas")

  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormError("")

    //validate url da imagem
    try{
      new URL(image)
    }catch (error){
        setFormError("A imagem precisa ser uma URL.")
    }

    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!")
    }
    if(formError) return;
    const data={
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName
    }

    updateDocument(id, data)

    //redirect to home page
    navigate("/dashboard")

    

  }
  return (
    <div className={styles.edit_oficina}>
        {oficina && (
            <>
     <h2>Editando Oficina:{oficina.title}</h2>
      <p>Altere os dados da sua oficina!</p>
      <form onSubmit={handleSubmit}>
          <label>
              <span>Título</span>
              <input type="text" name="title" 
              required 
              placeholder="Pense em um nome que destaque a sua oficina!" 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              />
          </label>
          <label>
              <span>URL da imagem</span>
              <input 
                type="text" 
                name="image" 
                required 
                placeholder="Insira a imagem desta etapa em sua Oficina" 
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
          </label>
          <p className={styles.preview_title}>Preview da imagem atual:</p>
          <img 
            className={styles.image_preview}
            src={oficina.image} 
            alt={oficina.title}/>
          <label>
              <span>Conteúdo</span>
              <textarea 
                name="body" required placeholder="Insira o Conteúdo da oficina!"
                onChange={(e)=> setBody(e.target.value)}
                value={body}
              ></textarea>
          </label>
          <label>
              <span>Tags:</span>
              <input 
                type="text" 
                name="tags" 
                required 
                placeholder="Insira as tags separadas por vírgula" 
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
          </label>
         
          {!response.loading && <button className="btn">Editar</button>}
          {response.loading &&( 
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        
      </form> 
            </>
        )}
    </div>
  );
};

export default EditOficina
