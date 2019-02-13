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