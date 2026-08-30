import { ComponentFour } from "./ComponentFour";
interface ComponentCProps {
  user: string;
}
export function ComponentThree(props: ComponentCProps) {
  return (
    <div className="box">
      <h1>Component Three</h1>
      <h2>Hello {props.user}</h2>
      <ComponentFour user={props.user} />
    </div>
  );
}
