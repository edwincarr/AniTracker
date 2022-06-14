import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getting_feed, getting_following_feed } from "../../store/feed"
import { NavLink, useHistory } from 'react-router-dom';
import moment from 'moment'
import './feed.css'

const Activity = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const feed = useSelector(state => state.feed)

  useEffect(() => {
    dispatch(getting_feed())
  }, [])

  const redirect = (id) => {
    history.push(`/anime/${id}`)
  }
  const followingFeed = () => {
    dispatch(getting_following_feed())
  }
  const globalFeed = () => {
    dispatch(getting_feed())
  }
  return (
    <div className="feed-container">
      <div className="feed-toggle">
        <div onClick={followingFeed}>Following</div>
        <div  onClick={globalFeed}>Global</div>
      </div>
    {feed.length ?
    feed.map((it,idx) => {
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
    })
    :
    null
    }
    </div>

  )
}
export default Activity
