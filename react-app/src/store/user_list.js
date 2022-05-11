const USER_LIST = '/USER_LIST/SET_USER_LIST'

const set_user_list = (payload) => ({
  type: USER_LIST,
  payload
})

export const get_list = (userid) => async(dispatch) => {
  const response = await fetch(`/api/lists/${userid}`)
  const data =await response.json()
  dispatch(set_user_list(data))
  return data
}

const initialState = { current:{} };

export default function list_reducer(state = initialState, action){
  let newState
  switch (action.type) {
    case USER_LIST:
      newState = {...state}
      newState.current = action.payload['user_list']
      return newState
    default:
      return state;
  }
}
