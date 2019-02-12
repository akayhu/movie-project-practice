import { createStore, compose, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancer(applyMiddleware(apiMiddleware))(createStore);

const configureStore = initialState => {
	return createStoreWithMiddleware(rootReducer, initialState);
};

const store = configureStore();

export default store;