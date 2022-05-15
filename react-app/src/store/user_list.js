const USER_LIST = '/USER_LIST/SET_USER_LIST'
const CREATE = '/USER_LIST/CREATE'

const set_user_list = (payload) => ({
  type: USER_LIST,
  payload
})

const create = (payload) => ({
  type: CREATE,
  payload
})

export const get_list = (userid) => async(dispatch) => {
  const response = await fetch(`/api/lists/${userid}`)
  const data =await response.json()
  dispatch(set_user_list(data))
  return data
}

export const create_list_row = (data) => async(dispatch) => {
  const { progress, status, score } = data
  const response = await fetch(`/api/lists/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      progress,
      score,
      status
    })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(create(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
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
