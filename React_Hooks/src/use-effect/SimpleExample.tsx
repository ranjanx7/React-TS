import { useEffect, useState } from "react";

export function MyComponentZero() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component rendered");
  }, []);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
