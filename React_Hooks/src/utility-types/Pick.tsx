// Pick<T> only what you need

interface User {
  id: number;
  name: string;
  email: string;
}

type UserCardProps = Pick<User, "name" | "email">;

export function UserCard({ name, email }: UserCardProps) {
  return (
    <div>
      {name} : {email}
    </div>
  );
}
