import { combineReducers } from 'redux-immutable';
import MovieReducer from './movie';
import ProcessReducer from './process';
import TaskReducer from './task';

const rootReducer = combineReducers({
  movie: MovieReducer,
  process: ProcessReducer,
  task: TaskReducer
});

export default rootReducer;