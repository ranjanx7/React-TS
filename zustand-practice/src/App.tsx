import { useCounterStore } from "./store/counterStore";

function App() {
  const count = useCounterStore((state) => state.count);

  // Extracting the action methods to modify the store state.
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={increment}>+</button>

      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;
