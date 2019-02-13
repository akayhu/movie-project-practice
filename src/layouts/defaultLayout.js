import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
} from 'actions/movie';
import Movie from 'containers/movie';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';

const TabPane = Tabs.TabPane;

class Default extends Component {

  callback = key => {
    console.log(key);
  }

  render() {
    const { latestData, hotData, freeData } = this.props;
    return (
      <div className="movie-main">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="最新活動" key="1">
            <Movie data={latestData} />
          </TabPane>
          <TabPane tab="熱門活動" key="2">
            <Movie data={hotData} />
          </TabPane>
          <TabPane tab="免費活動" key="3">
            <Movie data={freeData} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const matStateToProps = (state, props) => ({
	latestData: state.getIn(['movie', 'movieData', 'latestData']),
	hotData: state.getIn(['movie', 'movieData', 'hotData']),
	freeData: state.getIn(['movie', 'movieData', 'freeData']),
});

const actions = {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
};

export default compose(
	connect(matStateToProps, actions)
)(Default);