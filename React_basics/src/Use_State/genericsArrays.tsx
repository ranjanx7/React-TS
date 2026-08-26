import { useState } from "react";

export function GenericsArrays() {
  const [names, setNames] = useState<string[]>([]);

  const addName = () => {
    setNames([...names, "Ram"]);
  };

  return (
    <div>
      <button onClick={addName}>Add Name</button>

      {names.map((name) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  );
}
