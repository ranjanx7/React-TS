import { useState } from "react";

export function GenericsUnionTypes() {
  const [value, setValue] = useState<string | number>("");

  return (
    <div>
      <button onClick={() => setValue("Hello")}>Set String</button>

      <button onClick={() => setValue(100)}>Set Number</button>

      <p>{value}</p>
    </div>
  );
}
