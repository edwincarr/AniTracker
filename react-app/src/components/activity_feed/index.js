import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getting_feed } from "../../store/feed"

const Activity = () => {
  const dispatch = useDispatch()
  const feed = useSelector(state => state.feed.feed)
  useEffect(() => {
    dispatch(getting_feed())
  }, [])
  return (
    <h1>actively working on this feature</h1>
  )
}
export default Activity
