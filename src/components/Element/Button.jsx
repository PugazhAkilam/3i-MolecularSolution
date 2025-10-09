// Button.js
import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ label, onClick, color = "primary", variant = "contained" }) => {
  return (
    <MuiButton onClick={onClick} color={color} variant={variant}>
      {label}
    </MuiButton>
  );
};

export default Button;
