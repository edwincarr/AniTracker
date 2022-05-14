import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_other_user } from "../../store/session"
import { useParams } from 'react-router-dom'
import './profilenav.css'

const ProfileNav = () => {
  const { userid } = useParams()
  const user = useSelector(state => state.session.other)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(get_other_user(userid))
  },[userid])

  return (user && (
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
  )
}
export default ProfileNav
