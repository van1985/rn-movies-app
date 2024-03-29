import Config from 'react-native-config';
import {
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SELECT_MOVIE,
  TRAILER_FETCH_KEY_PERFORMED,
  TRAILER_FETCH_KEY_SUCCESS,
  TRAILER_FETCH_KEY_FAILURE
} from './moviesActionTypes';

export const fetchFailure = (error, type) => ({
  type,
  payload: { error }
});

export const fetchRequest = type => ({ type });

export const fetchSuccess = (data, type) => ({
  type,
  payload: { ...data }
});

export const search = q => (dispatch, getState) => {
  const { isFetching: alreadyFetching, lastSearch } = getState().movies;
  if (alreadyFetching || !q || q === lastSearch) {
    return null;
  }
  const url = `${Config.API_URL}/search/movie?api_key=${Config.API_KEY}&query=${q}`;
  dispatch(fetchRequest(FETCHING_DATA));
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(fetchSuccess({ response: data, lastSearch: q }, FETCHING_DATA_SUCCESS)))
    .catch(error => {
      dispatch(fetchFailure(error, FETCHING_DATA_FAILURE));
    });
};

export const addMovieToFavorite = movie => ({
  type: ADD_FAVORITE,
  payload: { movie }
});

export const deleteMovieFromFavorite = movieId => ({
  type: REMOVE_FAVORITE,
  payload: { movieId }
});

export const selectMovie = movieId => dispatch => {
  dispatch({ type: SELECT_MOVIE, payload: { movieId } });
};

export const getTrailerKey = () => (dispatch, getState) => {
  const moviesState = getState().movies;
  const movieId = moviesState.currentSelectedId;
  const url = `${Config.API_URL}/movie/${movieId}/videos?api_key=${Config.API_KEY}`;
  dispatch(fetchRequest(TRAILER_FETCH_KEY_PERFORMED));
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(fetchSuccess({ response: data }, TRAILER_FETCH_KEY_SUCCESS)))
    .catch(error => {
      dispatch(fetchFailure(error, TRAILER_FETCH_KEY_FAILURE));
    });
};
