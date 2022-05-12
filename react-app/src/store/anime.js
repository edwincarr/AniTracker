const GET_ANIME = 'anime/LOAD_ANIME'
const CLEAR_ANIME = 'anime/CLEAR_ANIME'
const GET_ONE = 'anime/GET_ONE'

const loadAnime = (payload) => ({
  type: GET_ANIME,
  payload
})

const clearAnime = () => ({
  type:CLEAR_ANIME
})

const getOne = (payload) => ({
  type: GET_ONE,
  payload
})

export const loadingAnime = (page) => async(dispatch) => {
  const response = await fetch(`/api/anime/browse/${page}`)
  let data = await response.json()
  dispatch(loadAnime(data['anime']))
  // return data
}

export const clearState = () => async(dispatch) => {
  dispatch(clearAnime())
}

export const getOneAnime = (animeid) => async(dispatch) => {
  const response = await fetch(`/api/anime/${animeid}`)
  let data = await response.json()
  dispatch(getOne(data['current']))
}

const initialState = {anime: [], page: 1, currentAni: {}}
export default function anime_reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_ANIME:
      newState = {...state}
      newState.anime = [...state.anime, ...action.payload]
      newState.page = state.page + 1
      return newState
    case CLEAR_ANIME:
      newState = {currentAni: {...state.currentAni}, anime: [], page:1}
      return initialState
    case GET_ONE:
      newState = {...state}
      newState.currentAni = {...action.payload}
      return newState
    default:
      return state
  }
}
