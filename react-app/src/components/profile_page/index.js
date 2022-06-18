import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { get_other_user } from "../../store/session"
import ProfileNav from "../profile_nav"

const ProfilePage = () => {
  const { userid } = useParams()
  const user = useSelector(state => state.session.other)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_other_user(userid))
  }, [userid])
  
  return (user && (
    <ProfileNav user={user} />
  ))
}
export default ProfilePage
