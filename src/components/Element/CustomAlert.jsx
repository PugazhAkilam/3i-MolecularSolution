// CustomAlert.js
import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const CustomAlert = ({ type = "info", title, message }) => {
  return (
    <Alert severity={type} sx={{ mb: 2 }}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

export default CustomAlert;
