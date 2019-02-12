import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
} from 'actions/movie';

class Default extends Component {

  getMovieDataLatest = () => {
    this.props.requestGetMovieLatest();
  }

  getMovieDataHot = () => {
    this.props.requestGetMovieHot();
  }

  getMovieDataFree = () => {
    this.props.requestGetMovieFree();
  }

  render() {
    return (
      <Fragment>
        <button type="button" onClick={ this.getMovieDataLatest }>取最新活動電影資料到reducer</button>
        <button type="button" onClick={ this.getMovieDataHot }>取熱門活動電影資料到reducer</button>
        <button type="button" onClick={ this.getMovieDataFree }>取免費活動電影資料到reducer</button>
      </Fragment>
    );
  }
}

const actions = {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
};

export default compose(
	connect(null, actions)
)(Default);
