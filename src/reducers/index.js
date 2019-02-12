import { combineReducers } from 'redux-immutable';
import MovieReducer from './movie';
import TestReducer from './test';

const rootReducer = combineReducers({
  movie: MovieReducer,
  test: TestReducer
});

export default rootReducer;