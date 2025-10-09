// Toast.js
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ open, onClose, message, severity = "info" }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
    <Alert severity={severity} onClose={onClose}>{message}</Alert>
  </Snackbar>
);

export default Toast;
