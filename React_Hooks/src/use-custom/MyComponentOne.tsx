import { useCounter } from "./useCounter";

export function MyComponentOne() {
  const { count, increment, decrement } = useCounter();

  return (
    <>
      <h1>{count}</h1>

      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}
