// StatusChip.js
import React from "react";
import { Chip } from "@mui/material";

const StatusChip = ({ label, color = "default" }) => (
  <Chip label={label} color={color} sx={{ fontSize: "12px" }} />
);

export default StatusChip;
