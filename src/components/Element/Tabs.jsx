// CustomTabs.js
import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const CustomTabs = ({ value, onChange, tabs }) => {
  return (
    <Box>
      <Tabs value={value} onChange={(_, newValue) => onChange(newValue)}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;
