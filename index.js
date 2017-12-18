function createIteratorMiddleware () {
  return ({ dispatch, getState }) => next => (action) => {
    if (isNextable(action)) {
      return handleIterator(action, dispatch, getState);
    }

    return next(action);
  };
}

async function handleIterator (iterator, dispatch, getState) {
  let { done, value } = await iterator.next(getState());

  while (done === false) {
    if (value !== undefined) {
      dispatch(value);
    }
    ({ done, value } = await iterator.next(getState()));
  }

  return value;
}

function isNextable (obj) {
  return typeof obj === 'object' && typeof obj.next === 'function';
}

const iterate = createIteratorMiddleware();

export default iterate;
