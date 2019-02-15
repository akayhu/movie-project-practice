import { fromJS } from 'immutable';
import {
  RECIEVE_GET_MOVIE_LATEST,
  RECIEVE_GET_MOVIE_HOT,
  RECIEVE_GET_MOVIE_FREE
} from 'actions/movie';

const initState = fromJS({
	movieData: {
    latestData: {
      dataList: [],
      hasNext: false,
      offset: 0,
      total: 0
    },
    hotData: {
      dataList: [],
      hasNext: false,
      offset: 0,
      total: 0
    },
    freeData: {
      dataList: [],
      hasNext: false,
      offset: 0,
      total: 0
    },
	}
});

const MovieReducer = (state = initState, action) => {
	switch (action.type) {
    case RECIEVE_GET_MOVIE_LATEST:
      const latestDataList = action.payload.response.dataList;
      return state.updateIn(['movieData', 'latestData'], elm => {
        return elm.updateIn(['dataList'], value => latestDataList.reduce(
          (newList, newPerson) => {
            return newList.push(newPerson);
          }
          , value))
          .update('hasNext', value => action.payload.response.hasNext)
          .update('offset', value => action.payload.response.offset)
          .update('total', value => action.payload.response.total);
      });

    case RECIEVE_GET_MOVIE_HOT:
      const hotDataList = action.payload.response.dataList;
      return state.updateIn(['movieData', 'hotData'], elm => {
        return elm.updateIn(['dataList'], value => hotDataList.reduce(
          (newList, newPerson) => {
            return newList.push(newPerson);
          }
          , value))
          .update('hasNext', value => action.payload.response.hasNext)
          .update('offset', value => action.payload.response.offset)
          .update('total', value => action.payload.response.total);
      });

    case RECIEVE_GET_MOVIE_FREE:
      const freeDataList = action.payload.response.dataList;
      return state.updateIn(['movieData', 'freeData'], elm => {
        return elm.updateIn(['dataList'], value => freeDataList.reduce(
          (newList, newPerson) => {
            return newList.push(newPerson);
          }
          , value))
          .update('hasNext', value => action.payload.response.hasNext)
          .update('offset', value => action.payload.response.offset)
          .update('total', value => action.payload.response.total);
      });

		default:
			return state;
	}
};

export default MovieReducer;