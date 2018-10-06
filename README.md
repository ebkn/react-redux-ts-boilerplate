# react-redux-ts-boilerplate

[![Build Status](https://travis-ci.org/ebkn/react-redux-ts-boilerplate.svg?branch=master)](https://travis-ci.org/ebkn/react-redux-ts-boilerplate)

This is a boilerplate for developing SPA using React + Redux + TypeScript + Webpack.

For type safe actions, I use [typescript-fsa](https://github.com/aikoven/typescript-fsa), [typescript-fsa-reducers](https://github.com/dphilipson/typescript-fsa-reducers).

## Usage
```sh
$ git clone git@github.com:ebkn/react-redux-ts-boilerplate.git

$ cd react-redux-ts-boilerplate

$ yarn install

# run tsc server and webpack-dev-server
$ yarn start
#=> http://localhost:8080

# run linter
$ yarn lint
# with fix
$ yarn lint:fix

# run storybook server
$ yarn storybook
# => http://localhost:9001

# build
$ yarn build

# build storybook
$ yarn build-storybook
```

## Sample codes
### index.tsx
```js
...
import { RootState } from './state';
import { footReducer } from './reducers/foo';
import { barReducer } from './reducers/bar';

const store = createStore(
  combineReducers<RootState>({
    foo: fooReducer,
    bar: barReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk.default)),
);
...
```

### state.ts
```js
import { FooState } from './reducers/foo';
import { BarState } from './reducers/bar';

export type RootState = {
  foo: FooState;
  boo: BarState;
};
```

### `/actions`
not async action
```js
import { actionCreatorFactory } from 'typescript-fsa';

export interface UpdateAction {
  content: string;
}

const actionCreator = actionCreatorFactory();
export const fooActions = {
  updateFoo: actionCreator<UpdateAction>('UPDATE_FOO'),
};
```

async action
```js
import { actionCreatorFactory, Success, Failure } from 'typescript-fsa';

export interface fetchAction {
  content: string;
}

const actionCreator = actionCreatorFactory();
const fetchArticle = actionCreator.async<{}, fetchAction, { error: string }>('FETCH_ARTICLE');

export const articleAsyncActions = {
  startedFetch: fetchArticle.started,
  failedFetch: fetchArticle.failed,
  doneFetch: fetchArticle.done,
}
```

### `/reducers`
```js
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Foo, fetchAction, articleAsyncActions } from '../actions/foo';

export interface FooState extends Foo {
  isFetching: boolean;
}

const initialState: FooState = {
  isFetching: false,
  content: '',
};

export const fooReducer = reducerWithInitialState(initialState)
  .case(
    fooAsyncActions.startedFetch,
    (state: FooState, {}) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .case(
    fooAsyncActions.doneFetch,
    (state: FooState, payload: fetchAction) => {
      const { content } = paylod;
      return {
        ...state,
        content,
        isFetching: false,
      };
    }
  )
  .case(
    articleAsyncActions.failedFetch,
    (state: FooState, payload: { error: string }) => {
      const { error } = payload;
      return {
        ...state
        error,
        isFeching: false,
      };
    }
  );
```
