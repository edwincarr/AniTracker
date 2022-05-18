import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { posting_comments } from "../../store/comments"

const PostComment = () => {
  const { animeid } = useParams()
  const [ comment, setComment ] = useState('')
  const dispatch = useDispatch()
  const updateComment = (e) => {
    setComment(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      anime_id: animeid,
      content: comment
    }
    dispatch(posting_comments(data))
    setComment('')
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <input
      value={comment}
      onChange={updateComment}
      />
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}
export default PostComment
