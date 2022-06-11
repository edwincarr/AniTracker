import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getting_feed } from "../../store/feed"

const Activity = () => {
  const dispatch = useDispatch()
  const feed = useSelector(state => state.feed)
  console.log(feed)
  useEffect(() => {
    dispatch(getting_feed())
  }, [])
  return (
    <>
    <h1>actively working on this feature</h1>
    {feed.length ? feed.map(it => {
      return (
        <div>
          <img src={it.anime.cover} height='100'/>
          <h2>{it.user.username}</h2>
          <div>{it.content}</div>
        </div>
        )
    }) : null}
    </>

  )
}
export default Activity
