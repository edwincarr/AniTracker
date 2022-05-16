const CURR_LIST = '/USER_LIST/SET_CURRENT_LIST'
const CREATE = '/USER_LIST/CREATE'
const USER_LIST = '/USER_LIST/SET_USER_LIST'

const set_current_list = (payload) => ({
  type: CURR_LIST,
  payload
})

const create = (payload) => ({
  type: CREATE,
  payload
})

const set_user_list = (payload) => ({
  type:USER_LIST,
  payload
})

export const get_curr_list = (userid) => async(dispatch) => {
  const response = await fetch(`/api/lists/${userid}`)
  const data =await response.json()
  dispatch(set_current_list(data['current_list']))
  return data
}

export const get_user_list = () => async(disptach) => {
  const response = await fetch('/api/lists/')
  const data = await response.json()
  disptach(set_user_list(data['user_list']))
}

export const create_list_row = (data) => async(dispatch) => {
  const { progress, status, score, animeid} = data
  const response = await fetch(`/api/lists/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      progress,
      score,
      status,
      animeid
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

export const update_list_row = (data) => async(dispatch) => {
  const { progress, status, score, animeid } = data
  const response = await fetch(`/api/lists/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      progress,
      score,
      status,
      animeid
    })
  })
}

export const delete_list_row = (data) => async(dispatch) => {
  const response = await fetch(`/api/lists/`, {
    method:'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      data
    })
  })
}


const initialState = { current:{}, user:{}};

export default function list_reducer(state = initialState, action){
  let newState
  switch (action.type) {
    case CURR_LIST:
      newState = {...state}
      newState.current = action.payload
      return newState
    case USER_LIST:
      newState = {...state}
      newState.user = action.payload
      return newState
    default:
      return state;
  }
}
