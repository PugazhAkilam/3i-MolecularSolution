// AvatarWithFallback.jsx
import React from "react";
import { Avatar } from "@mui/material";

const AvatarWithFallback = ({ name, src }) => {
  const initials = name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "?";

  return (
    <Avatar src={src}>
      {!src && initials}
    </Avatar>
  );
};

export default AvatarWithFallback;
