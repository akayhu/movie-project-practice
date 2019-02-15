import { takeEvery, put, select, call } from 'redux-saga/effects';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
} from 'actions/movie';
import {
  FETCH_MOVIE_LATEST,
  FETCH_MOVIE_HOT,
  FETCH_MOVIE_FREE
} from 'actions/fetchMovie';
import { processingStart, processingEnd } from 'actions/process';
import { requestAPI } from './util';

// 不同 action.type 但執行結果一樣可以寫在同一個saga function*
// 例如：yield takeEvery([ RECIEVE_GET_MOVIE_LATEST, RECIEVE_GET_MOVIE_HOT, RECIEVE_GET_MOVIE_FREE], mySaga());
export function* movieSaga() {
  yield takeEvery([
    FETCH_MOVIE_LATEST,
    FETCH_MOVIE_HOT,
    FETCH_MOVIE_FREE
  ], function* workLatestSaga(action) {
    try {

      const limit = 10;

      if (action.type === 'FETCH_MOVIE_LATEST') {
        yield put(processingStart(FETCH_MOVIE_LATEST, 'api'));
        const reqMovieLatest = yield call(requestAPI, requestGetMovieLatest, { offset: action.param.offset, limit });
        if (reqMovieLatest.payload.response) {
          yield put(processingEnd(FETCH_MOVIE_LATEST, 'api'));
        }
      }

      if (action.type === 'FETCH_MOVIE_HOT') {
        yield put(processingStart(FETCH_MOVIE_HOT, 'api'));
        const reqMovieHot = yield call(requestAPI, requestGetMovieHot, { offset: action.param.offset, limit });
        if (reqMovieHot.payload.response) {
          yield put(processingEnd(FETCH_MOVIE_HOT, 'api'));
        }
      }

      if (action.type === 'FETCH_MOVIE_FREE') {
        yield put(processingStart(FETCH_MOVIE_FREE, 'api'));
        const reqMovieHot = yield call(requestAPI, requestGetMovieFree, { offset: action.param.offset, limit });
        if (reqMovieHot.payload.response) {
          yield put(processingEnd(FETCH_MOVIE_FREE, 'api'));
        }
      }

    } catch (error) {
      console.log(error);
    }
  });
}

// 不同 action.type 但執行結果不一樣則分開寫saga function*
// 例如：yield takeEvery(RECIEVE_GET_MOVIE_HOT, mySaga())
export function* movieLatestSaga() {
  yield takeEvery(FETCH_MOVIE_LATEST, function* workLatestSaga(action) {
    try {
      yield put(processingStart(FETCH_MOVIE_LATEST, 'api'));
      const reqMovieLatest = yield call(requestAPI, requestGetMovieLatest);
      if (reqMovieLatest.payload.response) {
        yield put(processingEnd(FETCH_MOVIE_LATEST, 'api'));
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export function* movieHotSaga() {
  yield takeEvery(FETCH_MOVIE_HOT, function* workHotSaga(){
    try {
      yield put(processingStart(FETCH_MOVIE_HOT, 'api'));
      const reqMovieHot = yield call(requestAPI, requestGetMovieHot);
      if (reqMovieHot.payload.response) {
        yield put(processingEnd(FETCH_MOVIE_HOT, 'api'));
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export function* movieFreeSaga() {
  yield takeEvery(FETCH_MOVIE_FREE, function* workFreeSaga(){
    try {
      yield put(processingStart(FETCH_MOVIE_FREE, 'api'));
      const reqMovieHot = yield call(requestAPI, requestGetMovieFree);
      if (reqMovieHot.payload.response) {
        yield put(processingEnd(FETCH_MOVIE_FREE, 'api'));
      }
    } catch (error) {
      console.error(error);
    }
  });
}