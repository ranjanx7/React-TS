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

//
//map() is a standard JavaScript array method that transforms each item in an array into something else.
//The key prop is a special attribute that gives each list element a unique identity in React.
