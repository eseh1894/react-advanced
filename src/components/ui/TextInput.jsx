import React from "react";

export const TextInput = ({ changeFn }) => (
  <input
    className="input"
    border="1px solid #949494"
    onChange={(e) => changeFn(e.target.value)}
    placeholder="Search..."
  />
);
