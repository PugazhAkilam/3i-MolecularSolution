// CustomDrawer.js
import React from "react";
import { Drawer, Box, Typography } from "@mui/material";

const CustomDrawer = ({ open, onClose, title, children }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {children}
    </Box>
  </Drawer>
);

export default CustomDrawer;
