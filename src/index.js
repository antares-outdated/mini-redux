import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, combineReducers, thunk, applyMiddleware } from "./redux";
import App from "./app";
import { todosReducer } from "./redux/todo";

export const MyContext = createContext();

const initialState = {
  todoState: [],
  counterState: 0,
};

function counterReducer(state, action) {
  if (action.type === "ADD") {
    return state + 1;
  } else if (action.type === "ADD_TEXT") {
    return state + 1000;
  } else {
    return state;
  }
}

export function someStrangeAction() {
  return async function (dispatch, getState) {
    if (getState().counterState % 2) {
      dispatch({
        type: "ADD_TEXT",
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch({
      type: "TOGGLE_TODO",
      id: 1,
    });
  };
}

const reducer = combineReducers({
  todoState: todosReducer,
  counterState: counterReducer,
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer, initialState);

ReactDOM.render(
  <MyContext.Provider value={store}>
    <App />
  </MyContext.Provider>,
  document.getElementById("root")
);
