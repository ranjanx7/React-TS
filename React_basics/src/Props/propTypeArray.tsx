interface StudentListProps {
  students: string[];
}
export function StudentListArray({ students }: StudentListProps) {
  return (
    <ul>
      {students.map((student) => (
        <li key={student}>{student}</li>
      ))}
    </ul>
  );
}
