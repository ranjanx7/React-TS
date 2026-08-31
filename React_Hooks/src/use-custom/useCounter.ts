import { useState } from "react";

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState<number>(initialValue);

  function increment() {
    setCount((count) => count + 1);
  }

  function decrement() {
    setCount((count) => count - 1);
  }

  return {
    count,
    increment,
    decrement,
  };
}
