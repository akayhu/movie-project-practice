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
			return state.update('latestData', value => action.payload);
    case RECIEVE_GET_MOVIE_HOT:
      return state.update('hotData', value => action.payload);
    case RECIEVE_GET_MOVIE_FREE:
      return state.update('freeData', value => action.payload);
		default:
			return state;
	}
};

export default MovieReducer;