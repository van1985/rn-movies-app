import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger({
  timestamps: true,
  duration: true
});

const myStore = createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

export default myStore;
