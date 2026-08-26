export function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event.currentTarget); // element where the handler is attached.
  console.log(event.target); // element that was actually clicked.
}

export function Mouse() {
  return (
    <>
      <h1>MouseEvent</h1>

      <button onClick={handleClick}>
        <span>Click Me</span>
      </button>
    </>
  );
}
