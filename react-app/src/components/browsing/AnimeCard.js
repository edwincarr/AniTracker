import { useHistory } from 'react-router-dom'
import './browsing.css'

const AnimeCard = ({anime}) => {
  const history = useHistory()

  const onClick = () => {
    history.push(`/anime/${anime.id}`)
  }

  return (
    <div className='card' onClick={onClick}>
      <img src={anime.cover}/>
      <h4>{anime.name}</h4>
    </div>
  )
}
export default AnimeCard
