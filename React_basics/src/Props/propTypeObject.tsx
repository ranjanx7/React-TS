interface Student {
  id: number;
  name: string;
}
interface StudentListProps {
  students: Student[];
}

export function StudentListObject({ students }: StudentListProps) {
  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
}
