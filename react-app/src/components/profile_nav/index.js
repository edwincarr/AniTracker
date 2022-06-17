import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import './profilenav.css'
import { follow_them, unfollow_them } from "../../store/following"

const ProfileNav = ({ user }) => {
  const { userid } = useParams()
  const sesh = useSelector(state => state.session.user)
  const following = useSelector(state => state.following)
  const [isFollowing, setIsFollowing] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=> {
    let bool = false;
    (async() => {
      await following.forEach((i) => {
        if(i.following.id === user.id){
          bool = true
        }
      })
      setIsFollowing(bool)
    })()
  },[])

  const onFollow = () => {
    dispatch(follow_them(user.id))
    setIsFollowing(true)
  }
  const onUnfollow = () => {
    dispatch(unfollow_them(user.id))
    setIsFollowing(false)
  }
  return (user && sesh && (
    <>
    <div className="wide"></div>
    <div className="profile-nav-user">
      <img src={user.profile_pic} className='profile-nav-pp' alt={user.username}/>
      <div>
        <div className="profile-nav-username">{user.username}</div>
        {(sesh.id !== user.id) && user ? <div onClick={isFollowing ? onUnfollow : onFollow}>{isFollowing ? 'UnFollow' : 'Follow'}</div> : null}
      </div>
    </div>
    <div className="profile-nav">

    </div>
    </>
    )
  )
}
export default ProfileNav
