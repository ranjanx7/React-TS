// ComponentProps becomes especially useful when you don't want to manually
// extract or duplicate the props definition, or when working with components from libraries.
interface ButtonProps {
  text: string;
  color: string;
}

export function Button({ text, color }: ButtonProps) {
  return <button style={{ color }}>{text}</button>;
}
