import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import ListTable from "./ListTable"
import './list.css'
import ProfileNav from "../profile_nav"
import { get_curr_list } from "../../store/user_list"

const AnimeList = () => {
  const { userid } = useParams()
  const list = useSelector(state => state.list.current)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(get_curr_list(userid))
  }, [userid])

  return (
    <>
    <ProfileNav />
    <div className="list">
      <ListTable className='list-comp' list={list} status={1}/>
      <ListTable className='list-comp' list={list} status={2}/>
      <ListTable className='list-comp' list={list} status={0}/>
      <ListTable className='list-comp' list={list} status={4}/>
      <ListTable className='list-comp' list={list} status={3}/>
    </div>
    </>
  )
}
export default AnimeList
