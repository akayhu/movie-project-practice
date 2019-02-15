import { takeEvery, put, select, call } from 'redux-saga/effects';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree,
  RECIEVE_GET_MOVIE_LATEST,
  RECIEVE_GET_MOVIE_HOT,
  RECIEVE_GET_MOVIE_FREE
} from 'actions/movie';
import {
  processingStart,
  processingEnd
} from 'actions/process';
import { requestAPI } from './util';

export function* movieLatestSaga() {
  yield takeEvery(RECIEVE_GET_MOVIE_LATEST, function* workLatestSaga(action) {
    try {
      yield put(processingStart('movie-latest', 'api'));
      if (action.payload.response) {
        yield put(processingEnd('movie-latest', 'api'));
      }
    } catch (e) {
      console.error(e);
    }
  });
}

export function* movieHotSaga() {
  yield takeEvery(RECIEVE_GET_MOVIE_HOT, function* workHotSaga(action) {
    try {
      yield put(processingStart('movie-hot', 'api'));
      if (action.payload.response) {
        yield put(processingEnd('movie-hot', 'api'));
      }
    } catch (e) {
      console.error(e);
    }
  });
}

export function* movieFreeSaga() {
  yield takeEvery(RECIEVE_GET_MOVIE_FREE, function* workFreeSaga(action) {
    try {
      yield put(processingStart('movie-free', 'api'));
      if (action.payload.response) {
        yield put(processingEnd('movie-free', 'api'));
      }
    } catch (e) {
      console.error(e);
    }
  });
}

// 如果是一進頁面就先發api在讀頁面
// export function* movieSaga() {
//   yield put(processingStart('movie-latest', 'api'));
//   yield call(requestAPI, requestGetMovieLatest);
//   yield put(processingEnd('movie-latest', 'api'));

//   yield put(processingStart('movie-hot', 'api'));
//   yield call(requestAPI, requestGetMovieHot);
//   yield put(processingEnd('movie-hot', 'api'));

//   yield put(processingStart('movie-free', 'api'));
//   yield call(requestAPI, requestGetMovieFree);
//   yield put(processingEnd('movie-free', 'api'));
// }