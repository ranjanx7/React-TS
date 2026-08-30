// useReducer is another React Hook for managing state but in organized way.
// State : The current data.
// Reducer : The function that decides how state changes.
// Dispatch : Used to send an action to the reducer.

import { useReducer } from "react";

function reducer(state: number, action: string) {
  if (action === "INCREMENT") {
    return state + 1;
  }

  if (action === "DECREMENT") {
    return state - 1;
  }

  if (action === "RESET") {
    return 0;
  }

  return state;
}

export function MyComponentReducer() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => dispatch("INCREMENT")}>Increase</button>

      <button onClick={() => dispatch("DECREMENT")}>Decrease</button>

      <button onClick={() => dispatch("RESET")}>Reset</button>
    </>
  );
}
