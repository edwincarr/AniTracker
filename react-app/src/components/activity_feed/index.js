import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getting_feed } from "../../store/feed"
import moment from 'moment'
import './feed.css'

const Activity = () => {
  const dispatch = useDispatch()
  const feed = useSelector(state => state.feed)
  console.log(feed)
  useEffect(() => {
    dispatch(getting_feed())
  }, [])
  return (
    <>
    {feed.length ? feed.map(it => {
      return (
        <div className="update-container">
          <img src={it.anime.cover} height='110'/>
          <div className="update-content">
            <p>{it.user.username}</p>
            <p>{it.content}</p>
          </div>
          <p className="feed-time">{moment(it.created_at).fromNow()}</p>
        </div>
        )
    }) : null}
    </>

  )
}
export default Activity
