import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import DefaultLayout from './layouts/defaultLayout';
import * as serviceWorker from './serviceWorker';
// import {
//   requestGetMovieLatest,
//   requestGetMovieHot,
//   requestGetMovieFree
// } from 'actions/movie';
import 'antd/dist/antd.css';

// const initialize = () => {
//   // 取得最新活動電影列表
//   store.dispatch(requestGetMovieLatest());

//   // 取得熱門活動電影列表
//   store.dispatch(requestGetMovieHot());

//   // 取得免費活動電影列表
//   store.dispatch(requestGetMovieFree());
// };

// initialize();

const App = () => (
  <Provider store={ store }>
    <DefaultLayout />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
