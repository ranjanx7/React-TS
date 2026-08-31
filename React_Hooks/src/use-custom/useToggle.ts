import { useState } from "react";

export function useToggle() {
  const [isOn, setIsOn] = useState(false);

  function toggle() {
    setIsOn((prev) => !prev);
  }

  return {
    isOn,
    toggle,
  };
}
