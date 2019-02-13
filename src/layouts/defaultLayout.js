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
import Loading from 'components/loading';
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
            { latestData && <Movie data={latestData} />}
            { !latestData && <Loading />}
          </TabPane>
          <TabPane tab="熱門活動" key="2">
            { hotData && <Movie data={hotData} /> }
            { !hotData && <Movie data={hotData} /> }
          </TabPane>
          <TabPane tab="免費活動" key="3">
            { freeData && <Movie data={freeData} /> }
            { !freeData && <Movie data={freeData} /> }
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