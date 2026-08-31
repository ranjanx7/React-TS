//useState re-renders the Component when state value changes
//useRef does not re-render the component when state value changes

import { useState, useEffect, useRef } from "react";

export function MyComponent() {
  const ref = useRef(0);
  // const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("Component rendered");
  });

  function add() {
    // setNumber(number + 1);
    // console.log(number);
    ref.current = ref.current + 1;
    console.log(ref.current);
  }

  return (
    <div>
      <button onClick={add}>Increment</button>
    </div>
  );
}
