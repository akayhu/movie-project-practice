import { combineReducers } from 'redux-immutable';
import MovieReducer from './movie';
import TestReducer from './test';
import ProcessReducer from './process';

const rootReducer = combineReducers({
  movie: MovieReducer,
  test: TestReducer,
  process: ProcessReducer
});

export default rootReducer;