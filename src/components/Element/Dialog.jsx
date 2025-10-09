// CustomDialog.js
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const CustomDialog = ({ open, title, children, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={onConfirm} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
