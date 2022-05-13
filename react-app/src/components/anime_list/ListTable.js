import './list.css'

const ListTable = ({list, status}) => {
  if(!list.length){
    return null
  }
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
    }
  }
  headerFunc()

  return (list && (
    <>
    {header}
    <div className='list-container'>
        <div className="list-head">
        <div className="list-cover"></div>
        <div className="list-title">Title</div>
        <div className="list-score">Score</div>
        <div className="list-progress">Progress</div>
        </div>
        <div className="list-entries">
        {list?.map((anime, idx) => {
          if(status !== anime.status){
            return null;
          }
          return (
            <div id={idx} className='row-entry'>
            <img src={anime.anime.cover}/>
            <p className='title-n-row'>{anime.anime.name}</p>
            <p>{anime.score ? anime.score: 0}</p>
            {status === 22 ? <p>{anime.progress}</p>: <p>{anime.progress}/{anime.anime.episodes}</p>}
            </div>
            )
          })}
          </div>
        </div>
      </>
      )
  )
}
export default ListTable
