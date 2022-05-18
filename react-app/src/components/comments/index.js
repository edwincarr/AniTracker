import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delete_comment } from '../../store/comments'
import ModalThing from "../modal"

const Comments = ({comments}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [ isEditing, setIsEditing ] = useState(false)
  const [ update, setUpdate ] = useState()
  const onDelete = (comment) => {
    dispatch(delete_comment(comment))
  }

  const sendUpdate = () => {
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
        <form onSubmit={sendUpdate}>
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
