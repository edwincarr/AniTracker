import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { searchAnime } from "../../store/anime"


const Search = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  useEffect(()=>{
    const timeout = setTimeout(() => dispatch(searchAnime(query)), 1000)
    return () => clearTimeout(timeout)
  },[query])

  return (
  <form>
    <input
    type='text'
    value={query}
    onChange={e => setQuery(e.target.value)}
    ></input>
  </form>
  )
}

export default Search
