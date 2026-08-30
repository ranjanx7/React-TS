import { ComponentB } from "./ComponentTwo";
import "./Component.css";
import { useState } from "react";
export function ComponentOne() {
  const [user, setUser] = useState("ranjan");

  return (
    <div className="box">
      <h1>Component One</h1>
      <h2>{`Hello ${user}`}</h2>
      <ComponentB user={user} />
    </div>
  );
}
