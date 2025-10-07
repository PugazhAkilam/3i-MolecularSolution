// GridContainer.jsx
import React from "react";
import { Box } from "@mui/material";

const GridContainer = ({ children, columns = 3, gap = 2 }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gap={gap}
    >
      {children}
    </Box>
  );
};

export default GridContainer;
