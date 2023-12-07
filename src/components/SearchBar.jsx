import React, { useState } from "react";
import { TextInput } from "./ui/TextInput";

export const SearchBar = ({ onSearch }) => {
  const [searchField, setSearchField] = useState("");

  const handleChange = (searchTerm) => {
    setSearchField(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div>
      <label>Search Events</label>
      <TextInput changeFn={handleChange} />
    </div>
  );
};
