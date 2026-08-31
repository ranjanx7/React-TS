// useEffect(funtion, [dependency])

// 1. useEffect(()=>{})             // runs after every re-render
// 2. useEffect(()=>{},[])          // runs only on mount
// 3. useEffect(()=>{}, [value])    // runs on mount + every time value changes

import { useState, useEffect } from "react";

export function MyComponentOne() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("blue");

  useEffect(() => {
    document.title = `${count}  ${color}`;
  }, []);

  function add() {
    setCount((count) => count + 1);
  }

  function changeColor() {
    setColor((color) => (color === "blue" ? "red" : "blue"));
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={add}>Increment</button>

      <h1>Color: {color}</h1>
      <button onClick={changeColor}>Change color</button>
    </>
  );
}
