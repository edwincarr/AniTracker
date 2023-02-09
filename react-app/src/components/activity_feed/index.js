import { useState } from "react"
import { useDispatch } from "react-redux"
import { getting_feed, getting_following_feed } from "../../store/feed"
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment'
import './feed.css'

const Activity = ({feed}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [global, setGlobal] = useState(true)
  const [following, setFollowing] = useState(false)

  const redirect = (id) => {
    navigate(`/anime/${id}`)
  }
  const followingFeed = () => {
    dispatch(getting_following_feed())
    setGlobal(false)
    setFollowing(true)
  }
  const globalFeed = () => {
    dispatch(getting_feed())
    setFollowing(false)
    setGlobal(true)
  }
  let home = window.location.href.split('/')[3]
  return (
    <div className="feed-container">
      {home === 'home' ?
      <div className="feed-toggle">
        <div className={global ? 'active-feed' : 'global-Tog'} onClick={globalFeed}>Global</div>
        <div className={following ? 'active-feed' : 'following-Tog'} onClick={followingFeed}>Following</div>
      </div>
      :
      null
      }
    {feed.length ?
    feed.map((it,idx) => {
      return (
        <div className="update-container" key={idx}>
          <img onClick={() => redirect(it.anime.id)} className='feed-image' src={it.anime.cover.extraLarge} height='110' alt={it.anime.name.userPreferred}/>
          <div className="update-content">
            <NavLink to={`/user/${it.user.id}`} className='feed-user'>{it.user.username}</NavLink>
            <p>{it.content}</p>
          </div>
          <p className="feed-time">{moment(it.created_at).fromNow()}</p>
        </div>
        )
    })
    :
    null
    }
    </div>

  )
}
export default Activity
