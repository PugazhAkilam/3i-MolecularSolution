import React from 'react';
import { Box, Typography } from '@mui/material';

const rowStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  mb: 1,
  // color: 'text.secondary',
};

const labelStyle = {
  minWidth: '60px', // fixed width for labels
  // color: 'text.secondary',
  fontWeight: 'semi-bold'
};

const valueStyle = {
  // fontWeight: 'bolder',
  flex: 1,
  fontWeight: 'bold',
  fontSize: '14px'
};
const PatientDetails = ({ patientData, appointmentData }) => {

    console.log("pdata",patientData);
    
  return (
    <Box sx={{ p: 3, minWidth: 250 }}>
      <Box sx={{  border: '1px solid #E7EEF8' , padding: '10px 7px', borderRadius: '10px', marginBottom: '15px'}}>
        <Typography variant="h6" sx={{fontSize: "14px", fontWeight: 'bold'}} gutterBottom>
        Patient Details
      </Typography>
      <Box sx={rowStyle}>
        <Typography variant="body2" sx={labelStyle}>Name:</Typography>
        <Typography variant="h6" sx={valueStyle}>{patientData.firstName} {patientData.lastName}</Typography>
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
      <Box sx={{ ...rowStyle }}>
        <Typography variant="body2" sx={labelStyle}>Height:</Typography>
        <Typography variant="body2" sx={valueStyle}>{patientData.height} cm</Typography>
      </Box>
      </Box>
      
      <Box sx={{  border: '1px solid #E7EEF8' , padding: '10px 7px', borderRadius: '10px', marginBottom: '15px'}}>
      <Typography variant="h6" sx={{fontSize: "14px", fontWeight: 'bold'}} gutterBottom>
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
    <Box  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }} >
  <Typography variant="body2" sx={labelStyle}>
    Address:
  </Typography>
  <Typography variant="body2" sx={valueStyle}>
    {patientData.addressLine1?.split(",").map((part, index) => (
      <React.Fragment key={index}>
        {part.trim()}
        {index < patientData.addressLine1.split(",").length - 1 && <br />}
      </React.Fragment>
    ))}
  </Typography>
</Box>

      </Box>


      <Box sx={{  border: '1px solid #E7EEF8' , padding: '10px 7px', borderRadius: '10px'}}>
      <Typography variant="h6"  sx={{fontSize: "14px", fontWeight: 'bold'}} gutterBottom>
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

    </Box>
  );
};

export default PatientDetails;

