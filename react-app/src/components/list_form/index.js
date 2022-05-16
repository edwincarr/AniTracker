import { useDispatch } from 'react-redux'
import { useState } from 'react'
import './anime_form.css'
import { create_list_row, delete_list_row, update_list_row } from '../../store/user_list'

const ListForm = ({current, oldata}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(oldata?.status ? oldata.status : 0);
  const [score, setScore] = useState(oldata?.score ? oldata.score : 0);
  const [progress, setProgress] = useState(oldata?.progress ? oldata.progress : 0)

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      status,
      score,
      progress,
      animeid : current.id
    }
    if(oldata){
      dispatch(update_list_row(data))
    }else{
      dispatch(create_list_row(data))
    }
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
    dispatch(delete_list_row(oldata.id))
  }

  return (
    <div className='form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <select value={status} onChange={updateStatus}>
          <option value={0}>Planning</option>
          <option value={1}>Watching</option>
          <option value={2}>Completed</option>
          <option value={3}>Paused</option>
          <option value={4}>Dropped</option>
        </select>
        <input placeholder='Score' onChange={updateScore} value={score} type='number' max='10' min='0'/>
        <input placeholder='Progress' onChange={updateProgress} value={progress} type='number' min='0' max={current.episodes}/>
        <button type='submit'>Save</button>
        {oldata ? <div onClick={onDelete}>delete</div> : null}
      </form>
    </div>
  )
}
export default ListForm
