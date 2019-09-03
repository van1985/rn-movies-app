import {
    FETCHING_DATA_FAILURE,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA
} from "./dummyActionTypes";

const initialState = {
    isFetching: false,
    searchResult: {},
    errors: ""
};

const dummyReducer = (state = initialState, { type, payload }) => {
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
                searchResult: payload.response
            };
        }
        default:
            return state;
    }
};

export default dummyReducer;
