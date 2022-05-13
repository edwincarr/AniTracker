import { useSelector } from "react-redux"
import './profilenav.css'

const ProfileNav = () => {
  const user = useSelector(state => state.session.user)
  return (
    <>
    <div className="wide"></div>
    <div className="profile-nav-user">
      <img src={user.profile_pic} className='profile-nav-pp' alt={user.username}/>
      <div className="profile-nav-username">{user.username}</div>
    </div>
    <div className="profile-nav">

    </div>
    </>
  )
}
export default ProfileNav
