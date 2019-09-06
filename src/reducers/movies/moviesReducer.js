import Config from 'react-native-config';
import { cloneDeep, reject, map, get, find } from 'lodash';
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

const initialState = () => ({
  isFetching: false,
  searchResult: {},
  errors: '',
  favorites: [],
  currentSelectedId: null,
  trailersData: {
    isFetching: false,
    errors: '',
    success: false,
    trailersKeys: {}
  }
});

const filter = (state, data) => {
  const newState = cloneDeep(data);

  newState.results = map(newState.results, result => {
    const movieId = get(result, 'id');
    if (find(state.favorites, ['id', movieId])) {
      return Object.assign(result, { favorite: true });
    }
    return Object.assign(result, { favorite: false });
  });

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

const moviesReducer = (state = initialState(), { type, payload }) => {
  switch (type) {
    case FETCHING_DATA:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: payload.errors
      };
    case FETCHING_DATA_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        searchResult: filter(state, payload.response)
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
    case SELECT_MOVIE:
      return {
        ...state,
        currentSelectedId: payload.movieId
      };
    case TRAILER_FETCH_KEY_PERFORMED:
      return {
        ...state,
        trailersData: {
          isFetching: true,
          success: false,
          errors: '',
          trailersKeys: {}
        }
      };
    case TRAILER_FETCH_KEY_FAILURE:
      return {
        ...state,
        trailersData: {
          ...state.trailersData,
          isFetching: false,
          errors: payload.errors
        }
      };
    case TRAILER_FETCH_KEY_SUCCESS:
      return {
        ...state,
        trailersData: {
          ...state.trailersData,
          isFetching: false,
          success: true,
          trailersKeys: payload.response.results
        }
      };
    default:
      return state;
  }
};

export default moviesReducer;
