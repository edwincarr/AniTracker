import './browsing.css'

const AnimeCard = ({anime}) => {
  return (
    <div className='card'>
      <img src={anime.cover}/>
      <h4>{anime.name}</h4>
    </div>
  )
}
export default AnimeCard
