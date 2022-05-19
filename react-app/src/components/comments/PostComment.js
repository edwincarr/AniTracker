import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { posting_comments } from "../../store/comments"

const PostComment = () => {
  const { animeid } = useParams()
  const [errors, setErrors] = useState([]);
  const [ comment, setComment ] = useState('')
  const dispatch = useDispatch()
  const updateComment = (e) => {
    setComment(e.target.value)
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
    }else{
      setComment('')
    }
  }
  console.log(errors)
  return (
    <>
    <form onSubmit={onSubmit}>
      <input
      value={comment}
      onChange={updateComment}
      placeholder='Add a Comment'
      />
      <button type='submit'>Submit</button>
    </form>
      <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
    </>
  )
}
export default PostComment
