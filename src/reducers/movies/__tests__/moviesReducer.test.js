// @Reducers
import moviesReducer from '../moviesReducer';

// @Action types
import {
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA,
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from '../moviesActionTypes';

// @Mocks
const mockInitialState = () => ({
  firstSearchPerformed: false,
  isFetching: false,
  lastSearch: '',
  success: false,
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

describe('Movies reducer test suite', () => {
  test('[INITIAL] Should return initial state when no state is provided', () => {
    expect(moviesReducer(undefined, { type: 'UNKNOWN' })).toEqual(mockInitialState());
  });

  test('[UNKNOWN] Should return current state when action is not known', () => {
    const currentState = { ...mockInitialState(), isFetching: true };
    expect(moviesReducer(currentState, { type: 'UNKNOWN' })).toEqual(currentState);
  });

  test('[FETCHING_DATA] Should turn on fetching flag and reset success, error and results. It should also always turn on first search performed', () => {
    const currentState = {
      ...mockInitialState(),
      isFetching: false,
      success: true,
      errors: 'mock',
      searchResult: 'mock'
    };
    const expectedState = { ...mockInitialState(), isFetching: true, firstSearchPerformed: true };
    expect(moviesReducer(currentState, { type: FETCHING_DATA })).toEqual(expectedState);
  });

  test('[FETCHING_DATA_FAILURE] Should turn on fetching flag and reset success, error and results. It should also always turn on first search performed', () => {
    const currentState = { ...mockInitialState(), isFetching: true };
    const expectedState = { ...mockInitialState(), isFetching: false, errors: 'mock' };
    expect(
      moviesReducer(currentState, { type: FETCHING_DATA_FAILURE, payload: { errors: 'mock' } })
    ).toEqual(expectedState);
  });

  test('[FETCHING_DATA_SUCCESS] Should turn on fetching flag and reset success, error and results. It should also always turn on first search performed', () => {
    const currentState = { ...mockInitialState(), isFetching: true, favorites: [{ id: '1' }] };
    const expectedState = {
      ...mockInitialState(),
      isFetching: false,
      success: true,
      lastSearch: 'aaa',
      searchResult: { results: [{ id: '1' }, { id: '2' }] },
      favorites: [{ id: '1' }]
    };
    expect(
      moviesReducer(currentState, {
        type: FETCHING_DATA_SUCCESS,
        payload: { response: { results: [{ id: '1' }, { id: '2' }] }, lastSearch: 'aaa' }
      })
    ).toEqual(expectedState);
  });

  test('[ADD_FAVORITE] Should add favorite to favorites list', () => {
    const currentState = { ...mockInitialState(), isFetching: true, favorites: [{ id: '1' }] };
    const expectedState = {
      ...mockInitialState(),
      isFetching: true,
      favorites: [{ id: '1' }, { id: '2' }]
    };
    expect(
      moviesReducer(currentState, { type: ADD_FAVORITE, payload: { movie: { id: '2' } } })
    ).toEqual(expectedState);
  });

  test('[REMOVE_FAVORITE] Should add favorite to favorites list', () => {
    const currentState = {
      ...mockInitialState(),
      isFetching: true,
      favorites: [{ id: '1' }, { id: '2' }]
    };
    const expectedState = { ...mockInitialState(), isFetching: true, favorites: [{ id: '1' }] };
    expect(
      moviesReducer(currentState, { type: REMOVE_FAVORITE, payload: { movieId: '2' } })
    ).toEqual(expectedState);
  });
});
