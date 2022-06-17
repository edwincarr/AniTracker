import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import './profilenav.css'
import { follow_them, unfollow_them } from "../../store/following"

const ProfileNav = ({ user }) => {
  const sesh = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onFollow = () => {
    dispatch(follow_them(user.id))
  }
  const onUnfollow = () => {
    dispatch(unfollow_them(user.id))
  }
  return (user && sesh && (
    <>
    <div className="wide"></div>
    <div className="profile-nav-user">
      <img src={user.profile_pic} className='profile-nav-pp' alt={user.username}/>
      <div>
        <div className="profile-nav-username">{user.username}</div>
        {(sesh.id !== user.id) && user ? <div onClick={user.following ? onUnfollow : onFollow}>{user.following ? 'UnFollow' : 'Follow'}</div> : null}
      </div>
    </div>
    <div className="profile-nav">

    </div>
    </>
    )
  )
}
export default ProfileNav
