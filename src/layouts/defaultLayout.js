import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
} from 'actions/movie';
import Movie from 'containers/movie';
import LazyLoading from 'components/lazyLoading';
import { Tabs } from 'antd';
import Loading from 'components/loading';
import 'antd/dist/antd.css';
import './style.scss';

const TabPane = Tabs.TabPane;

class Default extends Component {

  loadMore = type => {
    const {
      latestData,
      hotData,
      freeData,
      requestGetMovieLatest,
      requestGetMovieHot,
      requestGetMovieFree
    } = this.props;
    const limit = 10;

    let latest = latestData.toJS();
    let hot = hotData.toJS();
    let free = freeData.toJS();

    switch (type) {
      case 'hot':
        if (hot.hasNext) {
        	requestGetMovieHot({ offset: hot.offset, limit });
        }
        break;
      case 'free':
        if (free.hasNext) {
          requestGetMovieFree({ offset: free.offset, limit });
        }
        break;
      default:
        if (latest.hasNext) {
          requestGetMovieLatest({ offset: latest.offset, limit });
        }
        break;
    };
	};

  callback = key => {
    console.log(key);
  }

  render() {
    const { latestData, hotData, freeData } = this.props;
    const latest = latestData.toJS();
    const hot = hotData.toJS();
    const free = freeData.toJS();

    return (
      <div className="movie-main">
        <Tabs defaultActiveKey="1" onChange={ this.callback }>
          <TabPane tab="最新活動" key="1">
            {
              latest && 
              <LazyLoading body loadingAct={ this.loadMore.bind(this, 'latest') }>
                <Movie data={ latest } />
              </LazyLoading>
            }
            { !latest && <Loading /> }
          </TabPane>
          <TabPane tab="熱門活動" key="2">
            {
              hot &&
              <LazyLoading body loadingAct={ this.loadMore.bind(this, 'hot') }>
                <Movie data={ hot } />
              </LazyLoading>
            }
            { !hot && <Loading /> }
          </TabPane>
          <TabPane tab="免費活動" key="3">
            {
              free &&
              <LazyLoading body loadingAct={ this.loadMore.bind(this, 'free') }>
                <Movie data={ free } />
              </LazyLoading>
            }
            { !free && <Loading /> }
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