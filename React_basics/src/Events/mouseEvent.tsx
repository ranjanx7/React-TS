export function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event.currentTarget);
  console.log(event.target);
}

export function Mouse() {
  return (
    <>
      <h1>MouseEvent</h1>
      <button onClick={handleClick}>Click Me</button>
    </>
  );
}
