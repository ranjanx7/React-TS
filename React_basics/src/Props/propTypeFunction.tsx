interface ButtonProps {
  onClick: () => void; // function takes nothing.
}
export function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click Me</button>;
}
