/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import scheduler from 'reducers/schedulerReducer';
import app from 'reducers/appReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  scheduler,
});
