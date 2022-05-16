import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneAnime } from "../../store/anime"
import { get_user_list } from "../../store/user_list"
import ListForm from "../list_form"
import ModalThing from "../modal"
import './animePage.css'

const AnimePage = () => {
  const currentAni = useSelector(state => state.anime.currentAni)
  const user = useSelector(state => state.session.user)
  const userList = useSelector(state => state.list.current)
  const [ isLoaded, setIsLoaded ] = useState(false)
  const { animeid } = useParams()
  const [ doesExist, setDoesExist ] = useState(false)
  const [ data, setData ] = useState([])
  const dispatch = useDispatch()

  useEffect(async() => {
    dispatch(getOneAnime(animeid))
    await dispatch(get_user_list())
    setIsLoaded(true)
  },[dispatch, animeid])

  useEffect(()=> {
    if(user !== null && isLoaded){
      userList.forEach(anime => {
        if (anime.anime.id == Number(animeid)){
          console.log(anime.anime.id, Number(animeid))
          setDoesExist(true)
          setData(anime)
        }
      })
    }
  },[userList])
  
  return (
    <div>
      <div>
        <img src={currentAni.cover} height='300' alt={currentAni.name}/>
        <p>{currentAni.name}</p>
        <p>{currentAni.episodes} episodes</p>
      </div>
      <div>
        <p>{currentAni.bio}</p>
      </div>
      {user && isLoaded ?
      <ModalThing>
        <ListForm current={currentAni} oldata={doesExist? data:null}/>
      </ModalThing>
      : null}
    </div>
  )
}

export default AnimePage
