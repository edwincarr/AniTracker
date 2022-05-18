import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneAnime } from "../../store/anime"
import { getting_comments } from "../../store/comments"
import { get_user_list } from "../../store/user_list"
import Comments from "../comments"
import PostComment from "../comments/PostComment"
import ListForm from "../list_form"
import ModalThing from "../modal"
import './animePage.css'

const AnimePage = () => {
  const currentAni = useSelector(state => state.anime.currentAni)
  const user = useSelector(state => state.session.user)
  const userList = useSelector(state => state.list.user)
  const comments = useSelector(state => state.comments.current)
  const [ isLoaded, setIsLoaded ] = useState(false)
  const { animeid } = useParams()
  const [ doesExist, setDoesExist ] = useState(false)
  const [ data, setData ] = useState([])
  const dispatch = useDispatch()

  useEffect(async() => {
    dispatch(getOneAnime(animeid))
    dispatch(getting_comments(animeid))
    await dispatch(get_user_list())
    setIsLoaded(true)
  },[dispatch, animeid])

  useEffect(()=> {
    if(isLoaded){
      userList?.forEach(anime => {
        if (anime.anime.id === Number(animeid)){
          setDoesExist(true)
          setData(anime)
        }
      })
    }
  },[isLoaded])

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
      <>
      <ModalThing name='Add To List'>
        <ListForm current={currentAni} oldata={doesExist? data:null}/>
      </ModalThing>
      <PostComment />
      </>
      : null}
      {isLoaded ?
      <Comments comments={comments}/>
      :
      null
      }
    </div>
  )
}

export default AnimePage
