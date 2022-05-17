

const Comments = ({comments}) => {
  return (
    <div>
    {comments.map( comment => {
      return (
      <div>
        <div>{comment.poster.username}</div>
        <div>{comment.content}</div>
      </div>
      )
    })}
  </div>
  )
}
export default Comments
