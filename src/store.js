import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {autoRehydrate} from 'redux-persist';
import * as reducers from './redux/index.js';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
});

export default createStore(
    combineReducers(reducers),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware, 
            logger
        ),
        autoRehydrate()
    )
);
