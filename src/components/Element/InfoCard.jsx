// InfoCard.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InfoCard = ({ title, description }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
