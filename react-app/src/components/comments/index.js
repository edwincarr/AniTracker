import { useDispatch, useSelector } from 'react-redux'
import { delete_comment } from '../../store/comments'

const Comments = ({comments}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const onDelete = (comment) => {
    dispatch(delete_comment(comment))
  }
  return (
    <div>
    {comments.map( comment => {
      return (
      <div>
        <div>{comment.poster.username}</div>
        <div>{comment.content}</div>
        <div>
          {user.id === comment.poster.id ?
            <div onClick={() => onDelete(comment)}>Delete</div>
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
