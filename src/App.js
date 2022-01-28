import React, { useState } from "react";
import { MyContext, someStrangeAction } from "./index";

const App = () => {
  const [content, setContent] = useState();
  return (
    <MyContext.Consumer>
      {(value) => {
        const addTodoAction = () => {
          value.dispatch({
            type: "ADD_TODO",
            id: 1,
            text: "Redux",
          });
          value.dispatch({
            type: "TOGGLE_TODO",
            id: 1,
            completed: true,
          });
          value.dispatch({
            type: "ADD",
          });
          value.dispatch(someStrangeAction());

          setContent(value.getState());
        };

        return (
          <div>
            <button onClick={addTodoAction}>Click</button>

            <p>{JSON.stringify(content, null, 4)}</p>
          </div>
        );
      }}
    </MyContext.Consumer>
  );
};

export default App;
