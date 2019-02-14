# Saga Api 參考文件

## createSagaMiddleware(options)

建立一個 Redux middleware 並連結 Saga 到 Redux Store。

範例：
```javascript
import { createStore, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancer(applyMiddleware(apiMiddleware, sagaMiddleware))(createStore);
const configureStore = initialState => {
	return createStoreWithMiddleware(rootReducer, initialState);
};
const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store;
```

## takeEvery(pattern, saga, ...args)

每次 dispatch 的 action 符合 pattern 時，產生一個 saga。

pattern: String | Array | Function - 更多資訊請參考 take(pattern) 文件

saga: Function - 一個 Generator function

args: Array<any> - 啟動 task 時傳送的參數。takeEvery 將傳入的 action 加入到參數列表（意思說，action 將做為最後一個參數提供給 saga）

範例：
```javascript
import { takeEvery } from 'redux-saga/effects';

function* fetchUser(action) {
  ...
}

function* watchFetchUser() {
  yield takeEvery('USER_REQUESTED', fetchUser);
}
```

## take(pattern)

每次 dispatch 的 action 符合 pattern 時，產生一個 saga。

範例：
```javascript
  const result = yield take([
    BLOCK_DATA_UPDATE_PROCESS_END,
    BLOCK_DATA_UPDATE_PROCESS_ERROR,
  ]);
```