import { RSAA } from 'redux-api-middleware';
import generalConfig from 'config/general';

/**
 * [RSAA] 取電影列表 最新活動
 */
export const REQUEST_GET_MOVIE_LATEST = 'REQUEST_GET_MOVIE_LATEST';
export const RECIEVE_GET_MOVIE_LATEST = 'RECIEVE_GET_MOVIE_LATEST';
export const FAILURE_GET_MOVIE_LATEST = 'FAILURE_GET_MOVIE_LATEST';

export const requestGetMovieLatest = param => ({
	[RSAA]: {
		endpoint: `${generalConfig.aipHost}/movie/latest`,
		types: [
			REQUEST_GET_MOVIE_LATEST,
			RECIEVE_GET_MOVIE_LATEST,
			FAILURE_GET_MOVIE_LATEST,
		],
		method: 'GET',
		headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'zvCLtEEJcp2XRNvqiDEuY6OkgOMdUPRm8JlOQyDi'
    },
		// body: JSON.stringify(param),
		// credentials: 'include',
	},
});

/**
 * [RSAA] 取電影列表 熱門活動
 */
export const REQUEST_GET_MOVIE_HOT = 'REQUEST_GET_MOVIE_HOT';
export const RECIEVE_GET_MOVIE_HOT = 'RECIEVE_GET_MOVIE_HOT';
export const FAILURE_GET_MOVIE_HOT = 'FAILURE_GET_MOVIE_HOT';

export const requestGetMovieHot = param => ({
	[RSAA]: {
		endpoint: `${generalConfig.aipHost}/movie/hot`,
		types: [
			REQUEST_GET_MOVIE_HOT,
			RECIEVE_GET_MOVIE_HOT,
			FAILURE_GET_MOVIE_HOT,
		],
		method: 'GET',
		headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'zvCLtEEJcp2XRNvqiDEuY6OkgOMdUPRm8JlOQyDi'
    },
		// body: JSON.stringify(param),
		// credentials: 'include',
	},
});

/**
 * [RSAA] 取電影列表 免費活動
 */
export const REQUEST_GET_MOVIE_FREE = 'REQUEST_GET_MOVIE_FREE';
export const RECIEVE_GET_MOVIE_FREE = 'RECIEVE_GET_MOVIE_FREE';
export const FAILURE_GET_MOVIE_FREE = 'FAILURE_GET_MOVIE_FREE';

export const requestGetMovieFree = param => ({
	[RSAA]: {
		endpoint: `${generalConfig.aipHost}/movie/hot`,
		types: [
			REQUEST_GET_MOVIE_FREE,
			RECIEVE_GET_MOVIE_FREE,
			FAILURE_GET_MOVIE_FREE,
		],
		method: 'GET',
		headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'zvCLtEEJcp2XRNvqiDEuY6OkgOMdUPRm8JlOQyDi'
    },
		// body: JSON.stringify(param),
		// credentials: 'include',
	},
});