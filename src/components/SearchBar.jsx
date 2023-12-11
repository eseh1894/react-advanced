import React, { useState } from "react";
import { TextInput } from "./ui/TextInput";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = ({ onSearch }) => {
  const [searchField, setSearchField] = useState("");

  const handleChange = (searchTerm) => {
    setSearchField(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div>
      <Search2Icon />
      <TextInput changeFn={handleChange} />
    </div>
  );
};
