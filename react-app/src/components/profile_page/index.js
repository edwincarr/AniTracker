import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { get_one_feed } from "../../store/feed"
import { get_other_user } from "../../store/session"
import ProfileNav from "../profile_nav"
import Activity from "../activity_feed"

const ProfilePage = () => {
  const { userid } = useParams()
  const user = useSelector(state => state.session.other)
  const feed = useSelector(state => state.feed)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_other_user(userid))
    dispatch(get_one_feed(userid))
  }, [userid])

  useEffect(()=> {
    dispatch(get_one_feed(userid))
  },[])

  return (user && (
    <>
      <ProfileNav user={user} />
      <Activity feed={feed}/>
    </>
  ))
}
export default ProfilePage
