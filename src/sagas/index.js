import { all } from 'redux-saga/effects';
import {
  movieLatestSaga,
  movieHotSaga,
  movieFreeSaga
} from './movie';

export default function* rootSaga() {
  yield all([
    movieLatestSaga(),
    movieHotSaga(),
    movieFreeSaga()
  ]);
};