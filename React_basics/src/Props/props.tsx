interface UserCardProps {
  name: string;
}
interface UserCardProps {
  age: number;
}

export function UserCard({ name, age }: UserCardProps) {
  return (
    <h2>
      {name} - {age}
    </h2>
  );
}
