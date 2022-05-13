import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { get_list } from "../../store/user_list"
import ListTable from "./ListTable"
import './list.css'

const AnimeList = () => {
  const { userid } = useParams()
  const list = useSelector(state => state.list.current)
  console.log(list)
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(get_list(userid))
  }, [])

  return (list && (
    <>
    <div>profile stuff</div>
    <div className="list">
      <ListTable className='list-comp' list={list} status={1}/>
      <ListTable className='list-comp' list={list} status={2}/>
      <ListTable className='list-comp' list={list} status={0}/>
      <ListTable className='list-comp' list={list} status={4}/>
      <ListTable className='list-comp' list={list} status={3}/>
    </div>
    </>
)
  )
}
export default AnimeList
