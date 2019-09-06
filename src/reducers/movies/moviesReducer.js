import Config from 'react-native-config';
import { FETCHING_DATA_FAILURE, FETCHING_DATA_SUCCESS, FETCHING_DATA } from './moviesActionTypes';

const initialState = {
  isFetching: false,
  searchResult: {},
  errors: '',
  favorites: {}
};

const filter = data => {
  const newData = data;
  newData.results = data.results.slice(0, Config.RESULTS_COUNT);
  return newData;
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
    default:
      return state;
  }
};

export default moviesReducer;
