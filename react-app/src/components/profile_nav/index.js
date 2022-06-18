import { useDispatch, useSelector } from "react-redux"
import './profilenav.css'
import { follow_them, unfollow_them } from "../../store/following"
import { NavLink } from 'react-router-dom';

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
        {(sesh.id !== user.id) && user ? <div className={user.following ? 'following' : 'follow'} onClick={user.following ? onUnfollow : onFollow}>{user.following ? 'Unfollow' : 'Follow'}</div> : null}
      </div>
    </div>
    <div className="profile-nav">
      <NavLink to={`/user/${user.id}`}>Profile</NavLink>
      <NavLink to={`/user/${user.id}/animelist`}>Anime List</NavLink>
    </div>
    </>
    )
  )
}
export default ProfileNav
