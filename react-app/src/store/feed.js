const GET_FEED = 'feed/GET_FEED'

const get_feed = (payload) => ({
  type: GET_FEED,
  payload
})

export const getting_feed = () => async(dispatch) => {
  const response = await fetch(`/api/feed/`)
  let data = await response.json()
  console.log('\n\n\n\n\n\n\n\n\n\n')
  dispatch(get_feed(data))
}

const initialState = {feed:{}}
export default function feed_reducer(state = initialState, action) {
  let newState
  switch(action.type){
    case GET_FEED:
      newState = {...state}
      newState.feed = action.payload
      return newState
    default:
      return state
  }
}
