import { fromJS } from 'immutable';
import {
  RECIEVE_GET_MOVIE_LATEST,
  RECIEVE_GET_MOVIE_HOT,
  RECIEVE_GET_MOVIE_FREE
} from '../actions/movie';

const initState = fromJS({
	movieData: {
    latestData: null,
    hotData: null,
    freeData: null,
	}
});

const MovieReducer = (state = initState, action) => {
	switch (action.type) {
    case RECIEVE_GET_MOVIE_LATEST:
			return state.updateIn(
        ['movieData', 'latestData'],
        elm => action.payload.response || elm
      );
    case RECIEVE_GET_MOVIE_HOT:
      return state.updateIn(
        ['movieData', 'hotData'],
        elm => action.payload.response || elm
      );
    case RECIEVE_GET_MOVIE_FREE:
      return state.updateIn(
        ['movieData', 'freeData'],
        elm => action.payload.response || elm
      );
		default:
			return state;
	}
};

export default MovieReducer;