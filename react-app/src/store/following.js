import { get_other_user } from "./session"

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

export const isFollowing = (id) => async(dispatch) => {
  const response = await fetch(`/api/following/${id}`)
  let data = await response.json()
  return data
}

export const follow_them = (user_id) => async(dispatch) => {
  const response = await fetch(`/api/following/${user_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(response)
  if(response.ok){
    dispatch(getting_followings())
    dispatch(get_other_user(user_id))
  }
}

export const unfollow_them = (user_id) => async(dispatch) => {
  const response = await fetch(`/api/following/${user_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if(response.ok){
    dispatch(getting_followings())
    dispatch(get_other_user(user_id))
  }
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
