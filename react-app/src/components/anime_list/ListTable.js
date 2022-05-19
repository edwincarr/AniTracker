import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import ListForm from '../list_form';
import './list.css'
import { get_curr_list } from '../../store/user_list';
import { useEffect, useRef, useState } from 'react';

const ListTable = ({list, status}) => {
  const user = useSelector(state => state.session.user)
  const { userid } = useParams()
  const history = useHistory()
  const modalRef = useRef()

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
    history.push(`/anime/${id}`)
  }

  useEffect(() => {
    modalRef?.current?.close()
  },[list])

  return (
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
        {list.length ? list?.map((anime, idx) => {
          if(status !== anime.status){
            return null;
          }
          return (
            user.id == userid ?
              <Popup trigger={
                <div key={idx} className='row-entry' >
                <img src={anime.anime.cover} className='list-n-row' alt={anime.anime.name}/>
                <p className='title-n-row'>{anime.anime.name}</p>
                <p>{anime.score ? anime.score: 0}</p>
                {status === 2 ? <p>{anime.anime.episodes}</p>: <p>{anime.progress}/{anime.anime.episodes}</p>}
            </div>
            } position="center center" modal ref={modalRef}><ListForm current={anime['current']} oldata={anime}/></Popup>
            :
            <div key={idx} className='row-entry' onClick={() => onClick(anime.anime.id)}>
            <img src={anime.anime.cover} className='list-n-row' alt={anime.anime.name}/>
            <p className='title-n-row'>{anime.anime.name}</p>
            <p>{anime.score ? anime.score: 0}</p>
            {status === 2 ? <p>{anime.anime.episodes}</p>: <p>{anime.progress}/{anime.anime.episodes}</p>}
            </div>
            )
          })
          : null}
          </div>
        </div>
      </>
  )
}
export default ListTable
