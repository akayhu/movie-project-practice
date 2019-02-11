import { combineReducers } from 'redux-immutable';
import TestReducer from './test';

const rootReducer = combineReducers({
  test: TestReducer
});
export default rootReducer;