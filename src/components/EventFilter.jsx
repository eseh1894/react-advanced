import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

export const EventFilter = ({ categories, onSelectCategory }) => {
  return (
    <Menu>
      <MenuButton as={Button}>Filter</MenuButton>
      <MenuList>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
