import { useState } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { delete_comment, update_comment } from '../../store/comments'
import Popup from 'reactjs-popup';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './comments.css'

const Comments = ({comments}) => {
  const { animeid } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [ isEditing, setIsEditing ] = useState(false)
  const [ editId, setEditId ] = useState()
  const [ update, setUpdate ] = useState()
  const onDelete = (comment) => {
    dispatch(delete_comment(comment))
  }

  const sendUpdate = (comment) => {
    const data = {
      animeid,
      id: comment.id,
      content: update
    }
    dispatch(update_comment(data))
    setIsEditing(false)
  }
  const setEdit = (comment) => {
    setEditId(comment.id)
    setIsEditing(true)
  }

  return (
    <div className='posted-comments-box'>
        {
        Array.isArray(comments) ?
        comments.map( comment => {
          return (
        <div className='comment-box'>
        <div>
        <div className='comment-username'>{comment.poster.username}:</div>
        {isEditing && editId === comment.id?
        <form onSubmit={() => sendUpdate(comment)}>
          <textarea value={typeof update == "string" ? update : comment.content} onChange={e => setUpdate(e.target.value)}/>
          <button type='submit'>Update</button>
        </form>
        :
        <div className='comment-content'>{comment.content}</div>
      }
      </div>
        <div>

          {user.id === comment.poster.id ?
            <Popup trigger={<MoreVertIcon  />} repositionOnResize closeOnDocumentClick={true} position="right top" arrow={false} >
              <div className='comment-buttons'>
                <div className='comment-button' onClick={() => onDelete(comment)}>Delete</div>
                <div className='comment-button'  onClick={() => setEdit(comment)}>Update</div>
              </div>
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
