import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getting_feed } from "../../store/feed"
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment'
import './feed.css'
import { getting_followings } from "../../store/following";

const Activity = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const feed = useSelector(state => state.feed)
  const [isGlobal, setIsGlobal] = useState(true)

  useEffect(() => {
    dispatch(getting_feed())
    dispatch(getting_followings())
  }, [])

  const redirect = (id) => {
    history.push(`/anime/${id}`)
  }

  return (
    <div className="feed-container">
      <div className="feed-toggle">
        <div>Following</div>
        <div>Global</div>
      </div>
    {feed.length ? feed.map((it,idx) => {
      return (
        <div className="update-container" key={idx}>
          <img onClick={() => redirect(it.anime.id)} className='feed-image' src={it.anime.cover} height='110' alt={it.anime.name}/>
          <div className="update-content">
            <NavLink to={`/user/${it.user.id}`} className='feed-user'>{it.user.username}</NavLink>
            <p>{it.content}</p>
          </div>
          <p className="feed-time">{moment(it.created_at).fromNow()}</p>
        </div>
        )
    }) : null}
    </div>

  )
}
export default Activity
