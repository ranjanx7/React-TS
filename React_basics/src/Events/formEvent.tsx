export function Form() {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Form submitted");
  }

  return (
    <>
      <h1>Form Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Name : </label>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
