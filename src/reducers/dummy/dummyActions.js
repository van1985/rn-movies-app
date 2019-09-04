import Config from 'react-native-config';
import { FETCHING_DATA_FAILURE, FETCHING_DATA_SUCCESS, FETCHING_DATA } from './dummyActionTypes';

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
  const url = `${Config.API_URL}/search/movie?api_key=9abae8074b73a28c58d4e143766d6691&query=${q}`;
  dispatch(fetchRequest());
  return fetch(url)
    .then(response => response.json())
    .then(data => dispatch(fetchSuccess(data)))
    .catch(error => {
      dispatch(fetchFailure(error));
      return Promise.reject(error);
    });
};
