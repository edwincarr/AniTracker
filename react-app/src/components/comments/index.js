import { useState } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { delete_comment, update_comment } from '../../store/comments'


const Comments = ({comments}) => {
  const { animeid } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [ isEditing, setIsEditing ] = useState(false)
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
  const setEdit = () => {
    setIsEditing(true)
  }
  return (
    <div>
    {comments.map( comment => {
      return (
      <div>
        <div>{comment.poster.username}</div>
        {isEditing ?
        <form onSubmit={() => sendUpdate(comment)}>
          <input value={update ? update : comment.content} onChange={e => setUpdate(e.target.value)}/>
        </form>
        :
        <div>{comment.content}</div>
      }
        <div>

          {user.id === comment.poster.id ?
            <>
              <div onClick={() => onDelete(comment)}>Delete</div>
              <div onClick={setEdit}>Update</div>
            </>
            :
            null
          }

        </div>
      </div>
      )
    })}
  </div>
  )
}
export default Comments
