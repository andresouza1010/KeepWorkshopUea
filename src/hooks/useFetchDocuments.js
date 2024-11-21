import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    where,
} from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    

    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = collection(db, docCollection);

            try {
                let q;

                // Busca pelo título e pela categoria
                if (search) {
                    q = query(
                        collectionRef,
                        where("title", ">=", search),  // Busca títulos que começam com o termo
                        where("title", "<=", search + "\uf8ff"), // Títulos que são menores ou iguais a search + caractere especial
                        orderBy("createdAt", "desc")
                    );

                    // Se desejar buscar pela categoria também, podemos usar "array-contains"
                    // mas primeiro vamos encontrar se o título existe
                    const categoryQuery = query(
                        collectionRef,
                        where("category", ">=", search),
                        where("category", "<=", search + "\uf8ff"),
                        orderBy("createdAt", "desc")
                    );

                    // Aqui combinamos os resultados
                    onSnapshot(q, (querySnapshot) => {
                        const titleResults = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        onSnapshot(categoryQuery, (catSnapshot) => {
                            const categoryResults = catSnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }));

                            // Combina os resultados e remove duplicatas
                            const combinedResults = [...titleResults, ...categoryResults];
                            const uniqueResults = Array.from(new Set(combinedResults.map(a => a.id)))
                                .map(id => {
                                    return combinedResults.find(a => a.id === id)
                                });

                            setDocuments(uniqueResults);
                        });
                    });
                } else if (uid) {
                    q = query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    );
                } else {
                    q = query(collectionRef, orderBy("createdAt", "desc"));
                }

                // Executa a consulta
                onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        }

        loadData();
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};