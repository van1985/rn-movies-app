import { combineReducers } from "redux";
import dummyReducer from "./dummy/dummyReducer";

export default combineReducers({
    search: dummyReducer
});
