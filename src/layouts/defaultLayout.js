import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree
} from 'actions/movie';
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
      requestGetMovieHot,
      requestGetMovieFree,
      requestGetMovieLatest,
    } = this.props;

    requestGetMovieHot();
    requestGetMovieFree();
    requestGetMovieLatest();
  }

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
    const { latestData, hotData, freeData, process } = this.props;
    const latest = latestData.toJS() || [];
    const hot = hotData.toJS() || [];
    const free = freeData.toJS() || [];
    const latestMovieLoadingDone = checkProcessIsDone(process, 'movie-latest', 'api');
    const hotMovieLoadingDone = checkProcessIsDone(process, 'movie-hot', 'api');
    const freeMovieLoadingDone = checkProcessIsDone(process, 'movie-free', 'api');

    return (
      <div className="movie-main">
        <Tabs defaultActiveKey="1" onChange={ this.callback }>
          <TabPane tab="最新活動" key="1">
            {
              latest && latestMovieLoadingDone &&
              <LazyLoading body loadingAct={ this.loadMore.bind(this, 'latest') }>
                <Movie data={ latest } />
              </LazyLoading>
            }
            { !latestMovieLoadingDone && <Loading /> }
          </TabPane>
          <TabPane tab="熱門活動" key="2">
            {
              hot && hotMovieLoadingDone &&
              <LazyLoading body loadingAct={ this.loadMore.bind(this, 'hot') }>
                <Movie data={ hot } movieLoadingDone={ hotMovieLoadingDone } />
              </LazyLoading>
            }
            { !hotMovieLoadingDone && <Loading /> }
          </TabPane>
          <TabPane tab="免費活動" key="3">
            {
              free && freeMovieLoadingDone &&
              <LazyLoading body loadingAct={ this.loadMore.bind(this, 'free') }>
                <Movie data={ free } movieLoadingDone={ freeMovieLoadingDone } />
              </LazyLoading>
            }
            { !freeMovieLoadingDone && <Loading /> }
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
  process: state.getIn(['process']),
});

const actions = {
  requestGetMovieLatest,
  requestGetMovieHot,
  requestGetMovieFree,
  checkProcessIsDone
};

export default compose(
	connect(matStateToProps, actions)
)(Default);