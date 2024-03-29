import { useNavigate } from 'react-router-dom'
import './browsing.css'

const AnimeCard = ({anime}) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`/anime/${anime.id}`)
  }

  return (
    <div className='card' onClick={onClick}>
      <img src={anime.cover.extraLarge} alt={anime.name.userPreferred}/>
      <h4>{anime.name.userPreferred}</h4>
    </div>
  )
}
export default AnimeCard
