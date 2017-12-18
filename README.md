# Redux iterator middleware

Use (async) generators as action creators to yield actions. This middleware will handle dispatched iterators ('nextable' objects).

[![NPM Version][npm-image]][npm-url] ![NPM Downloads][downloads-image] [![GitHub issues][issues-image]][issues-url] [![Licence][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/redux-iterate.svg
[npm-url]: https://www.npmjs.com/package/redux-iterate.svg
[downloads-image]: https://img.shields.io/npm/dw/redux-iterate.svg
[deps-image]: https://david-dm.org/doasync/redux-iterate.svg
[issues-image]: https://img.shields.io/github/issues/doasync/redux-iterate.svg
[issues-url]: https://github.com/doasync/redux-iterate/issues
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/doasync/redux-iterate/master/LICENSE

## Installation

```bash
npm install --save redux-iterate
```

Then, to enable Iterator Middleware, use applyMiddleware():

```javascript
import { createStore, applyMiddleware } from 'redux';
import iterate from 'redux-iterate';
import rootReducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(iterate)
);
```

## Usage

You can use generators as action creators with this middleware enabled.

Yield action objects to dispatch them! Forget about wrapping each time with `dispatch`:

```javascript
// Action creator
export const signIn = async function* (payload) {
  const { username, password } = payload;
  let state = yield; // won't be dispatched, just returns current state
  yield signInStart();
  try {
    const response = await axios.post(API_SIGN_IN, { username, password });
    yield signInEnd();
    yield signInSuccess(response.data);
    return username;
  } catch (error) {
    yield signInEnd();
    yield signInError(error);
  }
};
```

`yield` always returns a new state. If you yield nothing (undefined), it just returns current state (nothing happens):

```javascript
// Inside generator
const params = getDataFromState(yield); // yield expression
```

To invoke your action creator/generator directly wrap it into a dispatch call using `connect` from `react-redux` or `bindActionCreators` from `redux`.

If you want to do something when your binded action is done, `return` some data from generator and get it with .then:

```javascript
signIn().then(username => {
  console.log(username)
});
```

Yep, nice) Tell your friend.

## Author

@doasync
