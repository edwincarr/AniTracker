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
    <>
    <div className="page-container">
      <div className="anime-cover">
        <img src={currentAni.cover} height='300' alt={currentAni.name}/>
        {user && isLoaded ?
          <ModalThing name={doesExist ? 'Update' : 'Add To List'}>
            <ListForm current={currentAni} oldata={doesExist? data:null}/>
          </ModalThing>
        :
            null
        }
        <p>{currentAni.name}</p>
        <p>{currentAni.episodes} episodes</p>
      </div>
      <div className="anime-bio">
        <p>{currentAni.bio}</p>
      </div>
    </div>
    <div className="comment-area">
      {user && isLoaded ?
      <>
      <PostComment />
      <Comments comments={comments}/>
      </>
      : null}
    </div>
    </>

  )
}

export default AnimePage
