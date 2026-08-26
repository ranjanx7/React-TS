function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.currentTarget.value);
}

function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
  console.log(event.currentTarget.value);
}

function handleMessage(event: React.ChangeEvent<HTMLTextAreaElement>) {
  console.log(event.currentTarget.value);
}

export function ChangeEvent() {
  return (
    <>
      <h1>ChangeEvent</h1>

      <input type="text" onChange={handleNameChange} />
      <br />
      <br />
      <select onChange={handleSelect}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <br />
      <br />
      <textarea onChange={handleMessage} />
    </>
  );
}
