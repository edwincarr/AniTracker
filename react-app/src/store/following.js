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

export const follow_them = (user_id) => async(dispatch) => {
  const response = await fetch(`/api/following/${user_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
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
