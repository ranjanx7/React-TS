import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
}

export function Form2() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
    alert("Signup successful!");
  }

  return (
    <div>
      <h1>Signup Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>

          <input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <br />

        <div>
          <label>Email:</label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <br />

        <div>
          <label>Password:</label>

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <br />

        <div>
          <label>Age:</label>

          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
            })}
          />

          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <br />

        <div>
          <label>Gender:</label>

          <select
            {...register("gender", {
              required: "Please select your gender",
            })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        <br />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
