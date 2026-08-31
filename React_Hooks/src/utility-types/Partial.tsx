//Partial<User> makes everything optional:

interface User {
  id: number;
  name: string;
  email: string;
}

type UpdateUserProps = Partial<User>;

export function UpdateUser({ name }: UpdateUserProps) {
  return <p>{name}</p>;
}
