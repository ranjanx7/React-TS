// useContext lets components access shared data without passing props through every level.

import { useState, createContext } from "react";
import { ComponentB } from "./ComponentB";

export const UserContext = createContext<string>("");

export function ComponentA() {
  const [user, setUser] = useState("ranjan");

  return (
    <div className="box">
      <h1>Component A</h1>
      <h2>{`Hello ${user}`}</h2>

      <UserContext.Provider value={user}>
        <ComponentB />
      </UserContext.Provider>
    </div>
  );
}

//

//

import "./Component.css";
