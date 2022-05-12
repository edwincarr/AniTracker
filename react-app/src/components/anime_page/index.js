import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { getOneAnime } from "../../store/anime"

const AnimePage = () => {
  const currentAni = useSelector(state => state.anime.currentAni)
  const { animeid } = useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getOneAnime(animeid))
  },[])

  return (
    <div>
      <div>
        <img src={currentAni.cover} height='300'/>
        <p>{currentAni.name}</p>
        <p>{currentAni.episodes} episodes</p>
      </div>
      <div>
        <p>{currentAni.bio}</p>
      </div>
    </div>
  )
}

export default AnimePage
