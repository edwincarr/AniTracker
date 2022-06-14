const GET_FOLLOWING = 'feed/GET_FOLLOWING'

const get_following = (payload) => ({
  type: GET_FOLLOWING,
  payload
})

export const getting_followings = () => async(dispatch) => {
  const response = await fetch(`/api/following/`)
  let data = await response.json()
  dispatch(get_following(data.following))
}

const initialState = {}
export default function following_reducer(state = initialState, action) {
  let newState
  switch(action.type){
    case GET_FOLLOWING:
      newState = {...state}
      newState = action.payload
      return newState
    default:
      return state
  }
}
