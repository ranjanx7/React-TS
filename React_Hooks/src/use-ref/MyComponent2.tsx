import { useRef } from "react";

export function MyComponentTwo() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();
    if (inputRef.current) inputRef.current.style.backgroundColor = "green";
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
