// Omit<T> — Remove what you don't need
interface User {
  contact: number;
  name: string;
  email: string;
}

type UserProps = Omit<User, "email">;

export function UserInfo({ name, contact }: UserProps) {
  return (
    <p>
      {name} : {contact}
    </p>
  );
}
