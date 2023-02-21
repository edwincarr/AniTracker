import React, { useState, useEffect } from 'react'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearAnimeState, searchAnime } from "../../store/anime"
import { useNavigate } from 'react-router-dom'
import clear from './icon/clear.svg'


const Search = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const results = useSelector(state => state.anime)
  const navigate = useNavigate()

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
    <div>
      <div className='searchContainer'>
        <input
        placeholder='Search'
        className='searchbar'
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => {dispatch(clearAnimeState())}, 100)}
        onFocus={() => dispatch(searchAnime(query))}
        ></input>
        <div className='clear' onClick={() => setQuery('').then(() => clearAnimeState())}>
          <img src={clear} height='30'/>
        </div>
      </div>
      <div className='searchResults'>
        {results?.searched.map((arr, idx) => {
        return (
          <div className='resultCard'>
            <img src={arr.cover.extraLarge}/>
            <p onClick={() => navigate(`/anime/${arr.id}`)}>{arr.name.userPreferred}</p>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Search
