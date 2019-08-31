import {createStore, combineReducers, applyMiddleware} from 'redux'

import dorms from './../reducers/dorms'
import auth from './../reducers/auth'
import { logger,promise } from './middleware';

// state global
const reducers = combineReducers({
  dorms,
  auth
})

const store = createStore(
  reducers,
  applyMiddleware(logger, promise)
);

export default store