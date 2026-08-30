import { ComponentC } from "./ComponentC";

export function ComponentB() {
  return (
    <div className="box">
      <h1>Component B</h1>
      <ComponentC />
    </div>
  );
}
