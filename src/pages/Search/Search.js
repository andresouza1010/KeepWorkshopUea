import React from 'react'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
const Search = () => {
    const query = useQuery()
    const search = query.get("q")

  return (
    <div>
        <h2>Pesquisar</h2>
        <p>{search}</p>
    </div>
  )
}

export default Search;
