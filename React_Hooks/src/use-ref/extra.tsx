//useState re-renders the Component when state value changes
//useRef does not re-render the component when state value changes

import { useEffect, useRef } from "react";

export function MyComponentTwo() {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Component rendered");
  });

  function handle1() {
    inputRef1.current?.focus();
    if (inputRef1.current) inputRef1.current.style.backgroundColor = "yellow";
    if (inputRef2.current) inputRef2.current.style.backgroundColor = "";
  }

  function handle2() {
    inputRef2.current?.focus();
    if (inputRef1.current) inputRef1.current.style.backgroundColor = "";
    if (inputRef2.current) inputRef2.current.style.backgroundColor = "yellow";
  }

  return (
    <div>
      <button onClick={handle1}>Click Me 1</button>
      <input ref={inputRef1} />

      <button onClick={handle2}>Click Me 2</button>
      <input ref={inputRef2} />
    </div>
  );
}
