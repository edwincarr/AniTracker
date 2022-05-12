const GET_ANIME = 'anime/LOAD_ANIME'
const CLEAR_ANIME = 'anime/CLEAR_ANIME'

const loadAnime = (payload) => ({
  type: GET_ANIME,
  payload
})

const clearAnime = () => ({
  type:CLEAR_ANIME
})

export const loadingAnime = (page) => async(dispatch) => {
  const response = await fetch(`/api/anime/${page}`)
  let data = await response.json()
  dispatch(loadAnime(data['anime']))
  // return data
}

export const clearState = () => async(dispatch) => {
  dispatch(clearAnime())
}

const initialState = {anime: [], page: 1}
export default function anime_reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_ANIME:
      newState = {...state}
      newState.anime = [...state.anime, ...action.payload]
      newState.page = state.page + 1
      return newState
    case CLEAR_ANIME:
      return newState = {...state}
    default:
      return state;
  }
}
