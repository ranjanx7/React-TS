import { ComponentThree } from "./ComponentThree";

interface ComponentBProps {
  user: string;
}
export function ComponentB(props: ComponentBProps) {
  return (
    <div className="box">
      <h1>Component Two</h1>
      <h2>Hello {props.user}</h2>
      <ComponentThree user={props.user} />
    </div>
  );
}
