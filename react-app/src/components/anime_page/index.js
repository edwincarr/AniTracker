import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneAnime } from "../../store/anime"
import ListForm from "../list_form"
import ModalThing from "../modal"
import './animePage.css'

const AnimePage = ({userList}) => {
  const currentAni = useSelector(state => state.anime.currentAni)
  const { animeid } = useParams()
  const [ doesExist, setDoesExist ] = useState(false)
  const [ data, setData ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneAnime(animeid))
  },[dispatch, animeid])

  useEffect(()=> {
    userList.forEach(anime => {
      if(anime !== 0){
        if (anime.anime.id == Number(animeid)){
          console.log(anime.anime.id, Number(animeid))
          setDoesExist(true)
          setData(anime)
        }
      }
    })
  },[userList])

console.log(doesExist)

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
      {currentAni ?
      <ModalThing>
        <ListForm current={currentAni} oldata={doesExist? data:null}/>
      </ModalThing>
      : null}
    </div>
  )
}

export default AnimePage
