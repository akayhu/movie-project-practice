import { combineReducers } from 'redux-immutable';
import MovieReducer from './movie';
import ProcessReducer from './process';

const rootReducer = combineReducers({
  movie: MovieReducer,
  process: ProcessReducer
});

export default rootReducer;