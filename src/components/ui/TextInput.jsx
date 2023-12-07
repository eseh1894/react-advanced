import React from "react";

export const TextInput = ({ changeFn }) => (
  <input className="input" onChange={(e) => changeFn(e.target.value)} />
);
