import React, { useState, useEffect } from 'react'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearAnimeState, searchAnime } from "../../store/anime"


const Search = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const results = useSelector(state => state.anime)

  useEffect(()=>{
    const timeout = setTimeout(() => {
      dispatch(searchAnime(query))
    }, 1000)
    if(query===''){
      dispatch(clearAnimeState())
    }
    return () => {
      clearTimeout(timeout)
    }
  },[query])
  return (
    <div className='searchContainer'>
      <input
      placeholder='Search'
      className='searchbar'
      type='text'
      value={query}
      onChange={e => setQuery(e.target.value)}
      ></input>
      <div onClick={() => setQuery('')}>clear</div>
      <div className='searchResults'>
        {results?.searched.map((arr, idx) => {
          return (
            <p>{arr.name.userPreferred}</p>
          )
        })}
      </div>
    </div>
  )
}

export default Search
