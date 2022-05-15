import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneAnime } from "../../store/anime"
import ListForm from "../list_form"
import ModalThing from "../modal"
import './animePage.css'

const AnimePage = () => {
  const currentAni = useSelector(state => state.anime.currentAni)
  const { animeid } = useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getOneAnime(animeid))
  },[dispatch, animeid])

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
      <ModalThing>
        <ListForm current={currentAni}/>
      </ModalThing>
    </div>
  )
}

export default AnimePage
