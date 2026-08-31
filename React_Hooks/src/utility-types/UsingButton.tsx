import type { ComponentProps } from "react";
import { Button } from "./ButtonComponent";

type MyButtonProps = ComponentProps<typeof Button>;

export function MyButton({ text, color }: MyButtonProps) {
  return <Button text={text} color={color} />;
}
