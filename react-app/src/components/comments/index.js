import { useState } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { delete_comment, update_comment } from '../../store/comments'


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
    <div>
        {
        Array.isArray(comments) ?
        comments.map( comment => {
          return (
            <div>
        <div>{comment.poster.username}</div>
        {isEditing && editId === comment.id?
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
              <div onClick={() => setEdit(comment)}>Update</div>
            </>
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
