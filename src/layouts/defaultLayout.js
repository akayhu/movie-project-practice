import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { requestGetMovieLatest } from 'actions/movie';
// import logo from './../logo.svg';
import '../App.css';
import '../index.css';

class Default extends Component {

  getMovieData = () => {
    this.props.requestGetMovieLatest();
  }

  render() {
    return (
      <button type="button" onClick={this.getMovieData}>取最新活動電影資料到reducer</button>
    );
  }
}

export default compose(
	connect(null, { requestGetMovieLatest })
)(Default);
