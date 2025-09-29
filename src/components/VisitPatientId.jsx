import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RiCloseCircleFill } from "react-icons/ri";
import { useLocation, useNavigate } from 'react-router-dom';
import VisitHistoryTable from './visitHis/VisitHistoryTable';
import { API_URL } from "./config";


export default function VisitorHistoryId() {
  const [data, setData] = useState([]);
  const [patient, setPatient] = useState([]);
  const [appointment, setAppointment] = useState({});
  const location = useLocation();
  const navigate=useNavigate();
  const patientData = location.state || {};
  console.log("patientData", patientData);
  console.log("patId", patientData.regId);
  console.log("patient",patient);
  
  // console.log("visitor appointment",data);
  

  useEffect(() => {
  const fetchAllDetails = async () => {
    try {
      console.log("patId", patientData.regId);

      // // Fetch selected patient
      // const selectedPatientRes = await fetch(`http://localhost:8000/api/selectedPatient/${patientData.regId}`);
      // const selectedPatientData = await selectedPatientRes.json();
      // console.log("res-data selectedPatient", selectedPatientData.data);
      // setData(selectedPatientData.data);

      // Fetch patient details
      const patientDetailsRes = await fetch(`${API_URL}/patient/patientDetails/${patientData.regId}`);
      const patientDetailsData = await patientDetailsRes.json();
      console.log("res-data patientDetails", patientDetailsData.data);
      setPatient(patientDetailsData.data);

      // Fetch appointment details
      const appointmentRes = await fetch(`${API_URL}/appointment/appointmentDetails/${patientData.regId}`);
      const appointmentData = await appointmentRes.json();
      console.log("res-data appointmentDetails", appointmentData.data);
      setAppointment(appointmentData.data);

    } catch (err) {
      console.log("error", err);
      console.log("failed to fetch details for selected patientId.");
    }
  };

  if (patientData.regId) {
    fetchAllDetails();
  }
}, [patientData.regId]);
  
console.log("appointment",appointment);

  return (
    <Box sx={{ p: 1, bgcolor: '#ffffff', minHeight: '100vh' }}>
      
      {/* Header */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Visitor History
      </Typography>
      {/* Patient History */}
      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>

      
        <Typography variant="subtitle1"  fontWeight={600}>
          Patient History
        </Typography>
        <Typography variant="body2" mt={0.5} color="text.secondary">
          {patientData.regId} | {patientData.name}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={1} mt={2}>
          {/* Patient Details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Patient Details
            </Typography>
            <Stack direction="row" spacing={3}>
              <Stack spacing={0.5}>
                {patient && patient.map((row) => (
                  <>
                  <Typography variant="body2">
                  Name:&nbsp;<b>{row.firstName} {row.lastName}</b>
                </Typography>
                <Typography variant="body2">Age: {row.age}</Typography>
                <Typography variant="body2">Sex: {row.sex}</Typography>
                <Typography variant="body2">Weight: {row.weight} kg</Typography>
                <Typography variant="body2">Height: {row.height} cm</Typography>
                </>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={600}>
              Contact Details
            </Typography>
            {patient && patient.map((row) => (
              <>
              <Stack spacing={0.5}>
              <Typography variant="body2">Mobile: {row.mobile}</Typography>
              <Typography variant="body2" color="text.secondary">
                Email: <b>{row.email}</b>
              </Typography>
              <Typography variant="body2">
                Address: {row.addressLine1}
              </Typography>
            </Stack>
              </>
            ))}
            
          </Grid>
        </Grid>

        {/* Vital Info */}
        <Typography variant="body2" mb={2}>
          Patient Vital Info <span style={{ color: '#848484' }}>(updated on{appointment.date ? new Date(appointment.date).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}) : null})</span>
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>

           
          
          <Grid item xs={6} sm={3}>
           
              <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                {appointment.bloodPressure}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Blood Pressure
              </Typography>
            </Stack>
            </Grid>
          <Grid item xs={6} sm={3}>
            <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                {appointment.pulse}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pulse (BPM)
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                {appointment.respiratoryRate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Respiratory rate (Per min)
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                {appointment.stressLevel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stress Level
              </Typography>
            </Stack>
          </Grid>
           
          
        </Grid>

           {/* Visit History Table */}
      <Typography variant="h6" fontWeight={500} mb={2}>
        Visit History
      </Typography>

      <VisitHistoryTable regId={patientData.regId} />
      {/* <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Visited Date</TableCell>
              <TableCell>respiratoryRate</TableCell>
              <TableCell>BP Reading</TableCell>
              <TableCell>Pulse</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        
            {data && data.map((row) => (
              
                 <TableRow>
              <TableCell>{row.date ? new Date(row.date).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}) : null}</TableCell>
              <TableCell>
             {row.respiratoryRate}
              </TableCell>
              <TableCell>{row.bloodPressure}</TableCell>
              <TableCell>{row.pulse}</TableCell>
              <TableCell>Regular Checkup</TableCell>
              <TableCell>
                <Tooltip title="Delete">
                                     
                                         <IconButton
                                       color="primary"
                                       >
                                     <RiCloseCircleFill />
                                      
                                         </IconButton>
                                       </Tooltip>
              </TableCell>
            </TableRow>

            ))}
                   
          </TableBody>
        </Table>
      </TableContainer> */}

      {/* Action Buttons */}
               <Box
                 mt={4}
                 display="flex"
                 justifyContent="space-between"
                 alignItems="center"
                 gap={2}
               >
                 <Button variant="outlined" onClick={() => navigate(-1)}>
                   Back
                 </Button>
                 {/* <Box display="flex" gap={2}>
                   <Button variant="outlined">Cancel</Button>
                  <Button
         variant="contained"
       >
         Continue
       </Button>
       
                 </Box> */}
               </Box>
      </Paper>
    </Box>
  );
}