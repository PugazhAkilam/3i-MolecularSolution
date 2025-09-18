import React from 'react';
import { Box, Typography } from '@mui/material';

const rowStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  mb: 1,
};

const labelStyle = {
  minWidth: '70px', // fixed width for labels
  color: 'text.secondary',
  fontWeight: 'normal',
};

const valueStyle = {
  fontWeight: 'bold',
  flex: 1,
};

const PatientDetails = ({ patientData, appointmentData }) => {
  return (
    <Box sx={{ p: 3, minWidth: 250 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Patient Details
      </Typography>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Name:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.name}</Typography>
      </Box>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Age:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.age}</Typography>
      </Box>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Sex:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.sex}</Typography>
      </Box>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Weight:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.weight} kg</Typography>
      </Box>
      <Box sx={{ ...rowStyle, mb: 2 }}>
        <Typography variant="body2" sx={labelStyle}>Height:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.height} cm</Typography>
      </Box>

      <Typography variant="h6" component="h2" gutterBottom>
        Patient Contact
      </Typography>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Mobile:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.mobile}</Typography>
      </Box>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Email:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.email}</Typography>
      </Box>
      <Box sx={{ ...rowStyle, mb: 2 }}>
        <Typography variant="body2" sx={labelStyle}>Address:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.address}</Typography>
      </Box>

      <Typography variant="h6" component="h2" gutterBottom>
        Appointment Details
      </Typography>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Doctor:</Typography>
        <Typography variant="body2" sx={valueStyle}>{appointmentData.doctor}</Typography>
      </Box>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Date:</Typography>
        <Typography variant="body2" sx={valueStyle}>{appointmentData.date}</Typography>
      </Box>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Time:</Typography>
        <Typography variant="body2" sx={valueStyle}>{appointmentData.time}</Typography>
      </Box>
    </Box>
  );
};

export default PatientDetails;

