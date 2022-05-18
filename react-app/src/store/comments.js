const GET_COMMENTS = 'comments/GET_COMMENTS'
const POST_COMMENTS = 'comments/POST_COMMENTS'
const UPDATE_COMMENTS = 'comments/UPDATE_COMMENT'
const DELETE_COMMENTS = 'comments/DELETE_COMMENTS'

const get_comments = (payload) => ({
  type: GET_COMMENTS,
  payload
})

const post_comments = (payload) => ({
  type:POST_COMMENTS,
  payload
})

export const getting_comments = (animeid) => async(dispatch) => {
  const response = await fetch(`/api/comments/${animeid}`)
  let data = await response.json()
  dispatch(get_comments(data['comments']))
}

export const posting_comments = (data) => async(dispatch) => {
  const { anime_id, content } = data
  const response = await fetch('/api/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      anime_id,
      content,
    })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(getting_comments(anime_id))
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

export const delete_comment = (comment) => async(dispatch) => {
  const { id, poster} = comment
  const response = await fetch('/api/comments/', {
    method:'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id,
      poster
    })
  })
  if(response.ok){
    dispatch(getting_comments(comment.anime.id))
  }else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const update_comment = (comment) => async(dispatch) => {
  const {animeid, id, content } = comment
  const response = await fetch('/api/comments/', {
    method:'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id,
      content
    })
  })
  if(response.ok){
    dispatch(getting_comments(animeid))
  }else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


const initialState = {current:{}}
export default function comments_reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case GET_COMMENTS:
      newState = {...state}
      newState.current = action.payload
      return newState
    default:
      return state
  }
}
