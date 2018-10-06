import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as thunk from 'redux-thunk';
import { Provider } from 'react-redux';
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
import App from './containers/App';

const store = createStore(
  combineReducers<RootState>({}),
  composeWithDevTools(applyMiddleware(thunk.default)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
