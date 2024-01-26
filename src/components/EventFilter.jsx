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
            onClick={() => {
              console.log("Selected Category ID:", category.id);
              onSelectCategory(category.id);
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
