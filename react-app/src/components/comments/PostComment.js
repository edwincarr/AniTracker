import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { posting_comments } from "../../store/comments"
import { TextField } from "@mui/material"

const PostComment = () => {
  const { animeid } = useParams()
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false)
  const [ comment, setComment ] = useState('')
  const dispatch = useDispatch()
  const updateComment = (e) => {
    setComment(e.target.value)
    setErrors([])
    setError(false)
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    const data = {
      anime_id: animeid,
      content: comment
    }
    const res = await dispatch(posting_comments(data))
    if(res){
      setErrors(res)
      setError(true)
    }else{
      setComment('')
    }
  }
  return (
    <>
    <div className="new-comment-container">
    <form onSubmit={onSubmit}>
      <TextField
      error={error}
      className="new-comment-field"
      value={comment}
      onChange={updateComment}
      label='Add a Comment'
      style={{width: 500}}
      />
      <button className='comment-bttn' type='submit'>Submit</button>
    </form>
    </div>
    <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
    </div>
    </>
  )
}
export default PostComment
