import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, loadingAnime } from '../../store/anime';
import { useParams } from "react-router-dom"
import AnimeCard from './AnimeCard';
import './browsing.css'

const Browse = () => {
  const containerRef = useRef()
  const dispatch = useDispatch()
  const params = useParams()
  const anime = useSelector(state => state.anime)

  useEffect(()=>{
    dispatch(clearState())
  },[params])

  const onScroll = () => {
    if(window.pageYOffset > containerRef.current.clientHeight -900){
      dispatch(loadingAnime(anime.page))
  }
  }

  useEffect(()=>{
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll)
      dispatch(clearState())
    };
  }, [anime])


  useEffect(()=>{
    dispatch(loadingAnime(anime.page))
  }, [])

  return (
    <div className='browse-container' ref={containerRef}>
    {anime.anime.map(arr => {
      return (
        <AnimeCard anime={arr}/>
        )
      })}
    </div>
  )
}
export default Browse
