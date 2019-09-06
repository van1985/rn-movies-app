import Config from 'react-native-config';
import { cloneDeep, reject } from 'lodash';
import {
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from './moviesActionTypes';

const initialState = {
  isFetching: false,
  searchResult: {},
  errors: '',
  favorites: []
};

const filter = data => {
  const newState = cloneDeep(data);
  newState.results = newState.results.slice(0, Config.RESULTS_COUNT);
  return newState;
};

const addFavorite = (state, movie) => {
  const newState = cloneDeep(state);
  newState.favorites.push(movie);
  return newState.favorites;
};

const removeFavorite = (state, idMovie) => {
  const newState = cloneDeep(state);
  const favoritesUpdate = reject(newState.favorites, { id: idMovie });
  return favoritesUpdate;
};

const moviesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_DATA:
      return {
        ...initialState,
        isFetching: true
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...initialState,
        isFetching: false,
        errors: payload.errors
      };
    case FETCHING_DATA_SUCCESS: {
      return {
        ...initialState,
        isFetching: false,
        searchResult: filter(payload.response)
      };
    }
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: addFavorite(state, payload.movie)
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: removeFavorite(state, payload.movieId)
      };
    default:
      return state;
  }
};

export default moviesReducer;
