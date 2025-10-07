// InputField.js
import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ label, value, onChange, type = "text", ...props }) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputField;
