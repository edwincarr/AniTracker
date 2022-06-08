import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import './anime_form.css'
import { create_list_row, delete_list_row, update_list_row } from '../../store/user_list'
import { useHistory, useParams } from 'react-router-dom'

const ListForm = ({current, oldata}) => {
  const dispatch = useDispatch()
  const {userid} = useParams()
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const [status, setStatus] = useState(oldata?.status ? oldata.status : 0);
  const [score, setScore] = useState(oldata?.score ? oldata.score : 0);
  const [progress, setProgress] = useState(oldata?.progress ? oldata.progress : 0)

  const onSubmit = async(e) => {
    e.preventDefault()
    const data = {
      status,
      score,
      progress,
      animeid : current.id
    }
    if(oldata){
      await dispatch(update_list_row(data, userid))
    }else{
      await dispatch(create_list_row(data))
    }
    history.push(`/user/${user.id}/animelist`)
  }

  const updateStatus = (e) => {
    setStatus(Number(e.target.value))
  }
  const updateScore = (e) => {
    setScore(Number(e.target.value))
  }
  const updateProgress = (e) => {
    setProgress(Number(e.target.value))
  }
  const onDelete = () => {
    dispatch(delete_list_row(oldata.id, userid))
    history.push(`/user/${user.id}/animelist`)
  }
  // hello
  return (
    <div className='form'>
      <div className='modal-info'>
        <img src={current.cover} height='100px' alt={`${current.name}`}/>
        <h2>{current.name}</h2>
      </div>
      <form className='actual-form' onSubmit={(e) => onSubmit(e)}>
        <div className='modal-grouping'>
          <label forHTML='status'>Watch Status : </label>
          <select value={status} name='status' onChange={updateStatus}>
            <option value={0}>Planning</option>
            <option value={1}>Watching</option>
            <option value={2}>Completed</option>
            <option value={3}>Paused</option>
            <option value={4}>Dropped</option>
          </select>
        </div>
        <div className='modal-grouping'>
        <label forHTML='score'>Score / 10 : </label>
        <input name='score' placeholder='Score' onChange={updateScore} value={score} type='number' max='10' min='0'/>
        </div>
        <div className='modal-grouping'>
        <label forHTML='progress'>Episode Progress / {current.episodes} : </label>
        <input name='progress' placeholder='Progress' onChange={updateProgress} value={progress} type='number' min='0' max={current.episodes}/>
        </div>
        <div className='modal-form-buttons'>
        {oldata ? <div className='modal-form-delete' onClick={onDelete}>Delete</div> : null}
        <button className='modal-form-uors' type='submit'>{oldata ? 'Update' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}
export default ListForm
