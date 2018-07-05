import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as thunk from 'redux-thunk';
import { RootState } from './state';
// import reducers here
// ex) article: ArticleReducer

export const store = createStore(
  combineReducers<RootState>({
  }),
  composeWithDevTools(applyMiddleware(thunk.default)),
);
