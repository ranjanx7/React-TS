import { UserCard } from "./Props/props.tsx";
import { StudentListArray } from "./Props/propTypeArray.tsx";
import { StudentListObject } from "./Props/propTypeObject.tsx";
import { Button } from "./Props/propTypeFunction.tsx";
//

import { GenericsNull } from "./Use_State/genericsNull.tsx";
import { GenericsUndefined } from "./Use_State/genericsUndefined.tsx";
import { GenericsObjects } from "./Use_State/genericsObjects.tsx";
import { GenericsArrays } from "./Use_State/genericsArrays.tsx";
import { GenericsUnionTypes } from "./Use_State/genericsUnionTypes.tsx";
import { FunctionalUpdate } from "./Use_State/functionalUpdate.tsx";

//
import { Mouse } from "./Events/mouseEvent.tsx";
import { ChangeEvent } from "./Events/changeEvent.tsx";
import { Form } from "./Events/formEvent.tsx";
import { KeyboardEventExample } from "./Events/keyEvents.tsx";

function App() {
  return (
    <>
      <h1 style={{ backgroundColor: "yellow" }}>Typing Props</h1>
      //props
      <UserCard name="Ranjan" age={22} />
      <UserCard name="Sunil" age={25} />
      //propTypeArray
      <StudentListArray students={["Ranjan", "Sunil"]} />
      //propTypeObject
      <StudentListObject
        students={[
          { id: 1, name: "Ranjan" },
          { id: 2, name: "Sunil" },
          { id: 3, name: "Ram" },
        ]}
      />
      //propTypeFunction
      <br />
      <br />
      <Button onClick={() => console.log("clicked")} />
      <br />
      <br />
      <br />
      <br />
      <h1 style={{ backgroundColor: "yellow" }}>Typing useState</h1>
      <br />
      <br />
      <br />
      <GenericsNull />
      <br />
      <GenericsUndefined />
      <br />
      <GenericsObjects />
      <br />
      <GenericsArrays />
      <br />
      <GenericsUnionTypes />
      <br />
      <FunctionalUpdate />
      <h1 style={{ backgroundColor: "yellow" }}>Typing Events</h1>
      <Mouse />
      <ChangeEvent />
      <br />
      <br />
      <Form />
      <br />
      <br />
      <KeyboardEventExample />
    </>
  );
}
export default App;
