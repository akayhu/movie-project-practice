import { takeEvery, put, select, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { RECIEVE_GET_MOVIE_LATEST } from 'actions/movie'

export function* testSaga() {
  yield takeEvery(RECIEVE_GET_MOVIE_LATEST, function*(action) {
    console.log('saga action', action);
  });
}