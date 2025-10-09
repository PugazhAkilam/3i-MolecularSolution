import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const DashboardChart = ({ title, chart, height, width, titleMb }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        bgcolor: '#fff',
        height: { xs: 350, md: 400 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 1,
      }}
    >
      <Typography fontWeight="bold" sx={{ mb: titleMb || 2, alignSelf: 'flex-start' }}>
        {title}
      </Typography>
      <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: width }, height: { xs: 270, md: height } }}>
        {chart}
      </Box>
    </Paper>
  );
};

export default DashboardChart;
