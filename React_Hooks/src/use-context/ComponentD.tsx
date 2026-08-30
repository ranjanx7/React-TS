import { useContext } from "react";
import { UserContext } from "./ComponentA";
export function ComponentD() {
  const user = useContext(UserContext);
  return (
    <div className="box">
      <h1>Component D</h1>
      <h2>Hello {user}</h2>
    </div>
  );
}
