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

建立一個 Effect 描述，指示 middleware 在 Store 等待指定的 action。 

Generator 會暫停，直到一個符合 pattern 的 action 被 dispatch。

範例：
```javascript
import { take } from `redux-saga/effects`;

function* mySaga() {
  const result = yield take([
    BLOCK_DATA_UPDATE_PROCESS_END,
    BLOCK_DATA_UPDATE_PROCESS_ERROR,
  ]);
}
```

## put(action)

建立一個 Effect 描述來說明 middleware 去 dispatch 一個 action 到 Store。 

這個 effect 是非阻塞的，任何錯誤都會向下拋出（例如：在一個 reducer）不會冒泡回到 saga。

範例：
```javascript
import { put } from `redux-saga/effects`;
import { requestGetMovieLatest } from 'actions/movie';

function* mySaga() {
  yield put(requestGetMovieLatest());
}
```

## call(fn, ...args)

建立一個 Effect 描述，指示 middleware 呼叫 function fn 和 args 作為參數。

- fn: Function - 一個 Generator function，或者正常的 function 回傳一個 Promise 做為結果。
- args: Array<any> - 一個陣列值被作為參數傳送到 fn

範例：
```javascript
import { call } from `redux-saga/effects`;
import { requestGetMovieLatest } from 'actions/movie';

function* mySaga() {
  yield call(requestAPI, requestGetMovieLatest);
}
```

## fork(fn, ...args)

建立一個 Effect 描述，指示 middleware 在 fn 執行一個非阻塞呼叫。

- fn: Function - 一個 Generator function，或者正常的 function 回傳一個 Promise 做為結果
- args: Array<any> - 一個陣列值被作為參數傳送到 fn

範例：
```javascript
import { fork } from `redux-saga/effects`;

function* mySaga() {
  // action, param 為要餵給 blockUpdater 的值
  yield fork(blockUpdater, action, param);
}
```

## cancel(task)

建立一個 Effect 描述，指示 middleware 取消先前被 fork 的 task。

範例：
```javascript
import { cancel } from `redux-saga/effects`;

function* mySaga() {
  yield cancel(process);
}
```

## select(selector, ...args)

建立一個 Effect 描述，指示 middleware 在目前 Store 的 state 調用提供的 selector（例如：回傳 selector(getState(), ...args) 的結果）。

- selector: Function - 一個 (state, ...args) => args 的 function。它 take 目前 state 和可選的參數並回傳一個目前 Store 的 state 的部份。
- args: Array<any> - 可選的參數被傳送到另外的 getState selector。

範例：
```javascript
import { select } from `redux-saga/effects`;

function* mySaga {
  const pid = yield select(state => state.getIn(['user', 'pid']));
}
```

## race(effects)

建立一個 Effect 描述來指示 middleware 在多個 Effect 之間去執行一個 Race（這有點類似於 Promise.race([...]) 行為）。

- effects: Object - 物件形式 {label: effect, ...}

範例：
```javascript
import { take, call, race } from `redux-saga/effects`;
import fetchUsers from './path/to/fetchUsers';

function* mySaga {
  const { response, cancel } = yield race({
    response: call(fetchUsers),
    cancel: take(CANCEL_FETCH)
  });
}
```

## all(effects)

相同於 all([...effects])，但讓你可以在 directionary 傳送帶有 label effects 的物件，就像 race(effects)

- effects: Object - 一個 directionary {label: effect, ...} 形式的物件

範例：
```javascript
import { fetchCustomers, fetchProducts } from './path/to/api';
import { all, call } from `redux-saga/effects`;

function* mySaga() {
  const { customers, products } = yield all({
    customers: call(fetchCustomers),
    products: call(fetchProducts)
  });
}
```

## all([...effects]) - parallel effects

建立一個 Effect 描述來指示 middleware 在平行情況下執行多個 Effect，並等待它們完成。它相當於 Promise#all API 的標準。

範例：
```javascript
import { all, take } from `redux-saga/effects`;
import {
  RECIEVE_LOGIN_STATUS,
  FAILURE_LOGIN_STATUS,
  RECIEVE_USERNAME,
  FAILURE_USERNAME
  } from `actions/login`;

function* mySaga() {
  yield all([
    take([RECIEVE_LOGIN_STATUS, FAILURE_LOGIN_STATUS]),
    take([RECIEVE_USERNAME, FAILURE_USERNAME]),
  ]);
}
```

## delay(ms, [val])

回傳一個 Promise，將在 ms 毫秒後 resolve val。

範例：
```javascript
  const delay = (ms) => new Promise(res => setTimeout(res, ms));
```