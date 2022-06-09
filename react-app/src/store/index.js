import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import anime_reducer from './anime';
import comments_reducer from './comments';
import session from './session'
import list_reducer from './user_list';
import feed_reducer from './feed';

const rootReducer = combineReducers({
  session,
  list: list_reducer,
  anime: anime_reducer,
  comments: comments_reducer,
  feed: feed_reducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
