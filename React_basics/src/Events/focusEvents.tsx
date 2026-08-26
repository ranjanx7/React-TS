// import React, { useState } from "react";

// export function FocusEventExample() {
//   const [status, setStatus] = useState("Not focused");

//   function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
//     setStatus("Input is ACTIVE (Focused)");
//   }

//   function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
//     setStatus("Input is INACTIVE (Blurred)");
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         placeholder="Click in and out of me"
//       />
//       <p>Status: {status}</p>
//     </div>
//   );
// }
