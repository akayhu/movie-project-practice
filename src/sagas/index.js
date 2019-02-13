import { all } from 'redux-saga/effects';
import { testSaga } from './movie';

export default function* rootSaga() {
  yield all([
    testSaga()
  ]);
}