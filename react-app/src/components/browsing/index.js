import { useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadingAnime } from '../../store/anime';
import AnimeCard from './AnimeCard';
import { throttle } from 'underscore'
import './browsing.css'

const Browse = () => {
  const containerRef = useRef()
  const dispatch = useDispatch()
  const anime = useSelector(state => state.anime)

  let lastScrollY = window.scrollY

  const nav = document.querySelector('nav')
  const onScroll = () => {
    if(window.pageYOffset > containerRef?.current?.clientHeight -1000){
        dispatch(loadingAnime(anime.page))
    }

    if(lastScrollY < window.scrollY){
      nav.classList.add('nav--hidden')
    } else {
      nav.classList.remove('nav--hidden')
    }
    lastScrollY = window.scrollY
  }

  const scrollEvent = throttle(onScroll, 200)

  useEffect(()=>{
    window.removeEventListener('scroll', scrollEvent);
    window.addEventListener('scroll', scrollEvent, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollEvent)
    };
  }, [anime])


  useEffect(()=>{
    dispatch(loadingAnime(anime.page))
  }, [])


  return (
    <div className='browse-container' ref={containerRef} >
    {anime?.anime?.map(arr => {
      return (
        <AnimeCard anime={arr}/>
        )
      })}
    </div>
  )
}
export default Browse
