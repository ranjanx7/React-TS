interface UserCardProps {
  name: string;
  age: number;
}

export function UserCard({ name, age }: UserCardProps) {
  return (
    <h2>
      {name} - {age}
    </h2>
  );
}
