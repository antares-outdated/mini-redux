export const createStore = (reducer, initialState) => {
  let state = initialState;
  return {
    dispatch: (action) => {
      state = reducer(state, action);
    },
    getState: () => state,
  };
};

export const combineReducers = (reducersMap) => {
  return function combinationReducer(state, action) {
    const nextState = {};
    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
};

export const thunk = (store) => (dispatch) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return dispatch(action);
};

export const applyMiddleware = (middleware) => {
  return function createStoreWithMiddleware(createStore) {
    return (reducer, state) => {
      const store = createStore(reducer, state);

      return {
        dispatch: (action) => middleware(store)(store.dispatch)(action),
        getState: store.getState,
      };
    };
  };
};
