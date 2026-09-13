import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
}

export function Form1() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(formData);
    alert("Signup successful!");
  }

  return (
    <div>
      <h1>Signup Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Gender:</label>

          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <br />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
