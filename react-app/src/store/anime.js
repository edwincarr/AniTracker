const GET_ANIME = 'anime/LOAD_ANIME'
const CLEAR_ANIME = 'anime/CLEAR_ANIME'
const GET_ONE = 'anime/GET_ONE'
const SEARCH_RESULTS = 'anime/SEARCH_RESULTS'

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

const searchAn = (payload) => ({
  type: SEARCH_RESULTS,
  payload
})

export const loadingAnime = (page) => async(dispatch) => {
  const response = await fetch(`/api/anime/browse/${page}`)
  let data = await response.json()
  dispatch(loadAnime(data['anime']))
}

export const clearAnimeState = () => async(dispatch) => {
  dispatch(clearAnime())
}

export const getOneAnime = (animeid) => async(dispatch) => {
  const response = await fetch(`/api/anime/${animeid}`)
  let data = await response.json()
  dispatch(getOne(data['current']))
}

export const searchAnime = (search) => async(dispatch) => {
  const response = await fetch('/api/anime/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      search
    })
  })
  if (response.ok){
    let res = await response.json()
    dispatch(searchAn(res['anime']))
  }
}

const initialState = {anime: [], page: 1, currentAni: {}, searched: []}
export default function anime_reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_ANIME:
      newState = {...state}
      newState.anime = [...state.anime, ...action.payload]
      newState.page = state.page + 1
      return newState
    case CLEAR_ANIME:
      newState = {...state}
      newState.searched = []
      return newState
    case GET_ONE:
      newState = {...state}
      newState.currentAni = {...action.payload}
      return newState
    case SEARCH_RESULTS:
      newState = {...state}
      newState.searched = [...action.payload]
      return newState
    default:
      return state
  }
}
