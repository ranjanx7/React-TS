import { UserCard } from "./props.tsx";

import { StudentListArray } from "./propTypeArray.tsx";

import { StudentListObject } from "./propTypeObject.tsx";

import { Button } from "./propTypeFunction.tsx";

function App() {
  return (
    <>
      <UserCard name="Ranjan" age={22} />
      <UserCard name="Sunil" age={25} />

      <StudentListArray students={["Ranjan", "Sunil"]} />

      <StudentListObject
        students={[
          { id: 1, name: "Ranjan" },
          { id: 2, name: "Sunil" },
          { id: 3, name: "Ram" },
        ]}
      />

      <Button onClick={() => console.log("clicked")} />
    </>
  );
}
export default App;
