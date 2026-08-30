interface ComponentDProps {
  user: string;
}
export function ComponentFour(props: ComponentDProps) {
  return (
    <div className="box">
      <h1>Component Four</h1>
      <h2>Hello {props.user}</h2>
    </div>
  );
}
