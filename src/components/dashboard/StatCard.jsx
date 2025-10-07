import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import CountUp from 'react-countup';

const StatCard = ({ icon, value, label }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: 1,
        bgcolor: '#fff',
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          bgcolor: '#f4f7fe',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bold" color="#212244">
          <CountUp end={value} duration={2} separator="," />
        </Typography>
        <Typography color="#686f87" fontSize={15}>
          {label}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;
