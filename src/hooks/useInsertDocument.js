import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase Storage

const initialState = {
    loading: null,
    error: null
};

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "INSERTED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const insertDocument = async (document, file) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            // Verifica se há um arquivo para upload
            let imageUrl = '';
            if (file) {
                const storage = getStorage();
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                // Aguardar o upload da imagem
                await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed', 
                        (snapshot) => {
                            // Você pode implementar feedback de progresso se desejar
                        }, 
                        (error) => {
                            reject(error);
                        }, 
                        async () => {
                            // Upload completo, pegue a URL do download
                            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            }

            // Cria o novo documento com a URL da imagem (se existir)
            const newDocument = { 
                ...document, 
                imageUrl: imageUrl, // Inclui a URL da imagem
                createdAt: Timestamp.now() 
            };

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            });

        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { insertDocument, response };
};
