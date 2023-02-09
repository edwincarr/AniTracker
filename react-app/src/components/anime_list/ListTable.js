import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './list.css'


const ListTable = ({status}) => {
  const list = useSelector(state => state.list.current)
  const navigate = useNavigate()

  let header
  const headerFunc = () => {
    switch(status){
      case 0:
        return header = <h2>Planning</h2>
      case 1:
        return header = <h2>Watching</h2>
      case 2:
        return header = <h2>Completed</h2>
      case 3:
        return header = <h2>Paused</h2>
      case 4:
        return header = <h2>Dropped</h2>
      default:
        return
    }
  }
  headerFunc()
  const onClick = (id) => {
    navigate(`/anime/${id}`)
  }

  return ( list ?
    <>
      {header}
      <div className='list-container'>
        <div className="list-head">
          <div className="list-n-row"></div>
          <div className="title-n-row">Title</div>
          <div className="score-txt">Score</div>
          <div className="list-progress">Progress</div>
        </div>
        <div className="list-entries">
          {Array.isArray(list) ? list.map((anime, idx) => {
            if(status !== anime.status){ return null; }
              return (
                <div key={idx} className='row-entry' onClick={() => onClick(anime.anime.id)}>
                  <img src={anime.anime.cover.extraLarge} className='list-n-row' alt={anime.anime.name.userPreferred}/>
                  <p className='title-n-row'>{anime.anime.name.userPreferred}</p>
                  <p className='score-txt'>{anime.score ? anime.score: 0}</p>
                  <p >{anime.progress}/{anime.anime.episodes}</p>
                </div>
              )
            })
            : null
          }
        </div>
      </div>
    </>
    : null
  )
}
export default ListTable
