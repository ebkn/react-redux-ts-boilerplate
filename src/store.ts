import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as thunk from 'redux-thunk';

let composeWithDevTools: any;
if (process.env.NODE_ENV !== 'development') {
  /* tslint:disable-next-line:no-var-requires */
  composeWithDevTools = require('redux-devtools-extension/logOnlyInProduction').composeWithDevTools;
} else {
  /* tslint:disable-next-line:no-var-requires */
  composeWithDevTools = require('redux-devtools-extension').composeWithDevTools;
}

import { RootState } from './state';
// import reducers here
// ex) article: ArticleReducer

const store = createStore(
  combineReducers<RootState>({
  }),
  composeWithDevTools(applyMiddleware(thunk.default)),
);
export default store;
