import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box>
      <Navigation />
      <Box backgroundColor="blue.100">
        <Outlet />
      </Box>
    </Box>
  );
};
