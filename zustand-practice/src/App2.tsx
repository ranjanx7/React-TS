import { useUserStore } from "./store2/userStore";

function App() {
  const name = useUserStore((state) => state.name);
  const age = useUserStore((state) => state.age);

  // Extracting the action methods to modify the store state.
  const setName = useUserStore((state) => state.setName);
  const increaseAge = useUserStore((state) => state.increaseAge);

  return (
    <div>
      <h1>User Information</h1>

      <p>Name: {name}</p>
      <p>Age: {age}</p>

      <button onClick={() => setName("Gita")}>Change Name</button>

      <button onClick={increaseAge}>Increase Age</button>
    </div>
  );
}

export default App;
