// InfoTooltip.jsx
import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const InfoTooltip = ({ text }) => (
  <Tooltip title={text}>
    <IconButton size="small"><InfoIcon fontSize="small" /></IconButton>
  </Tooltip>
);

export default InfoTooltip;
