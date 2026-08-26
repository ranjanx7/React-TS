import { useState } from "react";

export function SimpleForm() {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmittedName(name);
  };

  return (
    <div>
      <h2>Simple Form</h2>

      <label htmlFor="">Name:</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />

        <button type="submit">Submit</button>
      </form>

      <h3>Submitted Data:</h3>

      <p>Name: {submittedName}</p>
    </div>
  );
}
