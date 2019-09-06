// @Vendors
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// @Actions
import {
  search,
  addMovieToFavorite,
  deleteMovieFromFavorite,
  selectMovie,
  getTrailerKey
} from '../moviesActions';

// @Action types
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
} from '../moviesActionTypes';

// @Test Helpers
import mockFetch from '../../../../test/fetch';

// @Mocks
const { JSON_PARSE_TIME } = mockFetch;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  movies: { isFetching: false, lastSearch: 'mock' }
});
const loadingStore = mockStore({
  movies: { isFetching: true }
});
jest.useRealTimers();

describe('Movies actions test suite', () => {
  beforeEach(() => {
    store.clearActions();
    loadingStore.clearActions();
  });

  test('[search] should not dispatch any action if already fetching', () => {
    loadingStore.dispatch(search('a'));
    expect(loadingStore.getActions()).toEqual([]);
  });

  test('[search] should not dispatch any action if no search value is provided', () => {
    store.dispatch(search(''));
    expect(store.getActions()).toEqual([]);
  });

  test('[search] should not dispatch any action if search value equals last search', () => {
    store.dispatch(search('mock'));
    expect(store.getActions()).toEqual([]);
  });

  test('[search] should dispatch request and failure actions if API call fails', async done => {
    mockFetch.fetchFailure();
    await store.dispatch(search('aaa'));
    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: FETCHING_DATA },
        { type: FETCHING_DATA_FAILURE, payload: { error: mockFetch.MOCK_ERROR } }
      ]);
      done();
    }, JSON_PARSE_TIME);
  });

  test('[search] should dispatch request and success actions if API call succeds', async done => {
    mockFetch.fetchSuccess(JSON.stringify({ response: 'mock data' }));
    await store.dispatch(search('aaa'));
    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: FETCHING_DATA },
        {
          type: FETCHING_DATA_SUCCESS,
          payload: { response: { response: 'mock data' }, lastSearch: 'aaa' }
        }
      ]);
      done();
    }, JSON_PARSE_TIME);
  });

  test('[addMovieToFavorite] Should dispatch add favorite action with the provided movie', () => {
    store.dispatch(addMovieToFavorite('mock'));
    expect(store.getActions()).toEqual([{ type: ADD_FAVORITE, payload: { movie: 'mock' } }]);
  });

  test('[deleteMovieFromFavorite] Should dispatch delete favorite action with the provided movie id', () => {
    store.dispatch(deleteMovieFromFavorite('mock id'));
    expect(store.getActions()).toEqual([
      { type: REMOVE_FAVORITE, payload: { movieId: 'mock id' } }
    ]);
  });

  test('[selectMovie] Should dispatch select movie action with the provided movie id', () => {
    store.dispatch(selectMovie('mock id'));
    expect(store.getActions()).toEqual([{ type: SELECT_MOVIE, payload: { movieId: 'mock id' } }]);
  });

  test('[getTrailerKey] should dispatch request and failure actions if API call fails', async done => {
    mockFetch.fetchFailure();
    await store.dispatch(getTrailerKey());
    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: TRAILER_FETCH_KEY_PERFORMED },
        { type: TRAILER_FETCH_KEY_FAILURE, payload: { error: mockFetch.MOCK_ERROR } }
      ]);
      done();
    }, JSON_PARSE_TIME);
  });

  test('[getTrailerKey] should dispatch request and success actions if API call succeds', async done => {
    mockFetch.fetchSuccess(JSON.stringify({ response: 'mock data' }));
    await store.dispatch(getTrailerKey());
    setTimeout(() => {
      expect(store.getActions()).toEqual([
        { type: TRAILER_FETCH_KEY_PERFORMED },
        { type: TRAILER_FETCH_KEY_SUCCESS, payload: { response: { response: 'mock data' } } }
      ]);
      done();
    }, JSON_PARSE_TIME);
  });
});
