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
  const [errors, setErrors] = useState([]);
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

  return (
    <div className='form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label for='status'>Status</label>
          <select value={status} name='status' onChange={updateStatus}>
            <option value={0}>Planning</option>
            <option value={1}>Watching</option>
            <option value={2}>Completed</option>
            <option value={3}>Paused</option>
            <option value={4}>Dropped</option>
          </select>
        </div>
        <div>
        <label for='score'>Score</label>
        <input name='score' placeholder='Score' onChange={updateScore} value={score} type='number' max='10' min='0'/>
        </div>
        <div>
        <label for='progress'>Episode</label>
        <input name='progress' placeholder='Progress' onChange={updateProgress} value={progress} type='number' min='0' max={current.episodes}/>
        </div>
        <div>
        {oldata ? <div onClick={onDelete}>Delete</div> : null}
        <button type='submit'>{oldata ? 'Update' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}
export default ListForm
