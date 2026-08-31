// useEffect(function, [dependency])

import { useState, useEffect } from "react";

export function MyComponentTwo() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    console.log("Event listener added");

    return () => {
      window.removeEventListener("resize", handleSize); //cleanup function
      console.log("Event listener removed");
    };
  });
  function handleSize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  return (
    <>
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </>
  );
}

//
