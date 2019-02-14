import { takeEvery, put, select, call } from 'redux-saga/effects';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
} from 'actions/movie';
import { requestAPI } from './util';

export function* movieSaga() {
  yield call(requestAPI, requestGetMovieLatest);
  yield call(requestAPI, requestGetMovieHot);
  yield call(requestAPI, requestGetMovieFree);
}