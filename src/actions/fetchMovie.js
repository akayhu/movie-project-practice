export const FETCH_MOVIE_LATEST = 'FETCH_MOVIE_LATEST';
export const fetchMovieLatest = (param = { offset: 0, limit: 10 }) => ({
	type: FETCH_MOVIE_LATEST,
	param
});

export const FETCH_MOVIE_HOT = 'FETCH_MOVIE_HOT';
export const fetchMovieHot = (param = { offset: 0, limit: 10 }) => ({
	type: FETCH_MOVIE_HOT,
	param
});

export const FETCH_MOVIE_FREE = 'FETCH_MOVIE_FREE';
export const fetchMovieFree = (param = { offset: 0, limit: 10 }) => ({
	type: FETCH_MOVIE_FREE,
	param
});