import { useToggle } from "./useToggle";

export function MyComponentTwo() {
  const { isOn, toggle } = useToggle();

  return (
    <>
      <h1>{isOn ? "ON" : "OFF"}</h1>

      <button onClick={toggle}>Toggle</button>
    </>
  );
}
