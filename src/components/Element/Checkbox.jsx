// CustomCheckbox.js
import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const CustomCheckbox = ({ label, checked, onChange }) => (
  <FormControlLabel
    control={<Checkbox checked={checked} onChange={onChange} />}
    label={label}
  />
);

export default CustomCheckbox;
