export function KeyboardEventExample() {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      alert(`You pressed Enter!`);
    }
  }

  return (
    <div>
      <label>Type and press Enter: </label>
      <input type="text" onKeyDown={handleKeyDown} />
    </div>
  );
}
