// CustomDatePicker.js
import React from "react";
import { TextField } from "@mui/material";

const CustomDatePicker = ({ label, value, onChange }) => (
  <TextField
    type="date"
    label={label}
    value={value}
    onChange={onChange}
    InputLabelProps={{ shrink: true }}
    fullWidth
    margin="normal"
  />
);

export default CustomDatePicker;
