import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Main store function
 */

export function initializeStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
