import { useState } from 'react'
import { useParams, NavLink} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { delete_comment, update_comment } from '../../store/comments'
import Popup from 'reactjs-popup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TextField } from "@mui/material"
import './comments.css'

const Comments = ({comments}) => {
  const { animeid } = useParams()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false)
  const user = useSelector(state => state.session.user)
  const [ isEditing, setIsEditing ] = useState(false)
  const [ editId, setEditId ] = useState()
  const [ update, setUpdate ] = useState()

  const onDelete = (comment, close) => {
    dispatch(delete_comment(comment))
    close()
  }

  const sendUpdate = async(e, comment) => {
    e.preventDefault()
    const data = {
      animeid,
      id: comment.id,
      content: update
    }
    const res = await dispatch(update_comment(data))
    if(res){
      setErrors(res)
      setError(true)
    }else{
      setIsEditing(false)
    }
  }
  const setEdit = (comment, close) => {
    setEditId(comment.id)
    setIsEditing(true)
    close()
  }
  const updateComment = (e) => {
    setUpdate(e.target.value)
    setErrors([])
    setError(false)
  }
  const cancel = (e) => {
    e.preventDefault()
    setIsEditing(false)
  }
  return (
    <div className='posted-comments-box'>
        {
        Array.isArray(comments) ?
        comments.map( comment => {
          return (
        <div className='comment-box'>
        <div>
        <NavLink to={`/user/${comment.poster.id}`} className='feed-user'>{comment.poster.username}</NavLink>
        {isEditing && editId === comment.id?
        <>
        <form className='update-comment-box' onSubmit={(e) => sendUpdate(e, comment)}>
          <TextField label='update' value={typeof update == "string" ? update : comment.content} onChange={e => updateComment(e)} style= {{width:450}} error={error}/>
          <div className='edit-bttns'>
          <button className='comment-bttn' type='submit'>Update</button>
          <button className='comment-bttn cancel-bttn' onClick={(e) => cancel(e)}>Cancel</button>
          </div>
        </form>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        </>
        :
        <div className='comment-content'>{comment.content}</div>
      }
      </div>
        <div>

          {user.id === comment.poster.id ?
            <Popup trigger={<MoreVertIcon  />} closeOnDocumentClick position="right top" arrow={false} >
              {close => (
                <div className='comment-buttons'>
                <div className='comment-button' onClick={() => onDelete(comment, close)}>Delete</div>
                <div className='comment-button' onClick={(e) => setEdit(comment, close)}>Update</div>
              </div>
                )}
            </Popup>
            :
            null
          }

        </div>
      </div>
      )
    }): null}
    </div>
    )
}
export default Comments
