# react-redux-ts-boilerplate

[![Build Status](https://travis-ci.org/ebkn/react-redux-ts-boilerplate.svg?branch=master)](https://travis-ci.org/ebkn/react-redux-ts-boilerplate)

This is a boilerplate for developing SPA using React + Redux + TypeScript + Webpack.

For type safe actions, I use [typescript-fsa](https://github.com/aikoven/typescript-fsa), [typescript-fsa-reducers](https://github.com/dphilipson/typescript-fsa-reducers).

## Usage
```sh
$ git clone git@github.com:ebkn/react-redux-ts-boilerplate.git

$ cd react-redux-ts-boilerplate

$ yarn

$ yarn start
```

## Sample codes
### index.tsx
```js
...
import { RootState } from './state';
import { authReducer } from './reducers/auth';
import { articleReducer } from './reducers/article';

const store = createStore(
  combineReducers<RootState>({
    auth: authReducer,
    article: articleReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk.default)),
);
...
```

### state.ts
```js
import { ArticleState } from './reducers/article';

export type RootState = {
  article: ArticleState;
};
```

### `/actions`
not async action
```js
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
export const articleActions = {
  updateContent: actionCreator<{content: string}>('UPDATE_CONTENT'),
};
```

async action
```js
import { actionCreatorFactory, Success, Failure } from 'typescript-fsa';

export interface Article {
  content: string;
}

const actionCreator = actionCreatorFactory();
const fetchArticle =
  actionCreator.async<{}, {article: Article}, {error: string}>('FETCH_ARTICLE');

export const articleAsyncActions = {
  startedFetch: fetchArticle.started,
  failedFetch: fetchArticle.failed,
  doneFetch: fetchArticle.done,
}
```

### `/reducers`
```js
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Article, articleAsyncActions } from '../actions/article';

export interface ArticleState {
  isFetching: boolean;
  article: Article;
}

const initialState: ArticleState = {
  isFetching: false,
  article: {
    content: '',
  },
};

export const articleReducer = reducerWithInitialState(initialState)
  .case(articleAsyncActions.startedFetch, (state, {}) => {
    return (Object as any).assign({}, state, {
      isFetching: true,
    });
  })
  .case(articleAsyncActions.doneFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      article: payload.result.article,
      isFetching: false,
    });
  })
  .case(articleAsyncActions.failedFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      error: payload.error.error,
      isFeching: false,
    });
  }
```
