import Config from 'react-native-config';
import {
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from './moviesActionTypes';

export const fetchFailure = error => ({
  type: FETCHING_DATA_FAILURE,
  payload: { error }
});

export const fetchRequest = () => ({
  type: FETCHING_DATA
});

export const fetchSuccess = response => ({
  type: FETCHING_DATA_SUCCESS,
  payload: { response }
});

export const search = q => dispatch => {
  const url = `${Config.API_URL}/search/movie?api_key=${Config.API_KEY}&query=${q}`;
  dispatch(fetchRequest());
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(fetchSuccess(data)))
    .catch(error => {
      dispatch(fetchFailure(error));
      return Promise.reject(error);
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
