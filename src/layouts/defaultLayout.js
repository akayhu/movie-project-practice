import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree,
} from 'actions/movie';
import {
  fetchMovieLatest,
  fetchMovieHot,
  fetchMovieFree,
  FETCH_MOVIE_LATEST,
  FETCH_MOVIE_HOT,
  FETCH_MOVIE_FREE
} from 'actions/fetchMovie';
import { checkProcessIsDone } from 'utils/process';
import Movie from 'containers/movie';
import LazyLoading from 'components/lazyLoading';
import { Tabs } from 'antd';
import Loading from 'components/loading';
import './style.scss';

const TabPane = Tabs.TabPane;

class Default extends Component {

  componentDidMount = () => {
    const {
      fetchMovieLatest,
      fetchMovieHot,
      fetchMovieFree,
    } = this.props;

    fetchMovieLatest();
    fetchMovieHot();
    fetchMovieFree();
  }

  loadMore = type => {
    const {
      latestData,
      hotData,
      freeData,
      fetchMovieLatest,
      fetchMovieHot,
      fetchMovieFree
    } = this.props;
    const limit = 10;

    let latest = latestData.toJS();
    let hot = hotData.toJS();
    let free = freeData.toJS();

    switch (type) {
      case 'hot':
        if (hot.hasNext) {
        	fetchMovieHot({ offset: hot.offset, limit });
        }
        break;
      case 'free':
        if (free.hasNext) {
          fetchMovieFree({ offset: free.offset, limit });
        }
        break;
      default:
        if (latest.hasNext) {
          fetchMovieLatest({ offset: latest.offset, limit });
        }
        break;
    };
	};

  callback = key => {
    console.log(key);
  }

  renderTabContent = (contentData) => {
    return (
      <TabPane tab={ contentData.title } key={ contentData.key }>
        {
          contentData.data && contentData.movieLoadingDone &&
          <LazyLoading body loadingAct={ this.loadMore.bind(this, contentData.type) }>
            <Movie data={ contentData.data } />
          </LazyLoading>
        }
        { !contentData.movieLoadingDone && <Loading /> }
      </TabPane>
    );
  }

  render() {
    const {
      latestData,
      hotData,
      freeData,
      process
    } = this.props;
    const latest = latestData.toJS() || [];
    const hot = hotData.toJS() || [];
    const free = freeData.toJS() || [];
    const latestMovieLoadingDone = checkProcessIsDone(process, FETCH_MOVIE_LATEST, 'api');
    const hotMovieLoadingDone = checkProcessIsDone(process, FETCH_MOVIE_HOT, 'api');
    const freeMovieLoadingDone = checkProcessIsDone(process, FETCH_MOVIE_FREE, 'api');

    const latestMovieContent = {
      title: '最新活動',
      key: '1',
      type: 'latest',
      data: latest,
      movieLoadingDone: latestMovieLoadingDone
    };

    const hotMovieContent = {
      title: '熱門活動',
      key: '2',
      type: 'hot',
      data: hot,
      movieLoadingDone: hotMovieLoadingDone
    };

    const freeMovieContent = {
      title: '免費活動',
      key: '3',
      type: 'free',
      data: free,
      movieLoadingDone: freeMovieLoadingDone
    };

    return (
      <div className="movie-main">
        <Tabs defaultActiveKey="1" onChange={ this.callback }>
          { this.renderTabContent(latestMovieContent) }
          { this.renderTabContent(hotMovieContent) }
          { this.renderTabContent(freeMovieContent) }
        </Tabs>
      </div>
    );
  }
}

const matStateToProps = (state, props) => ({
	latestData: state.getIn(['movie', 'movieData', 'latestData']),
	hotData: state.getIn(['movie', 'movieData', 'hotData']),
  freeData: state.getIn(['movie', 'movieData', 'freeData']),
  process: state.getIn(['process']),
});

const actions = {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree,
  checkProcessIsDone,
  fetchMovieLatest,
  fetchMovieHot,
  fetchMovieFree,
};

export default compose(
	connect(matStateToProps, actions)
)(Default);