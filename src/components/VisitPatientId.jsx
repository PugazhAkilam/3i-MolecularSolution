import React from 'react';
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


export default function VisitorHistoryId() {
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
          PID: P5123 | Rakshita
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
                <Typography variant="body2">
                  Name:&nbsp;<b>Rakshita</b>
                </Typography>
                <Typography variant="body2">Age: 35</Typography>
                <Typography variant="body2">Sex: Female</Typography>
                <Typography variant="body2">Weight: 65 kg</Typography>
                <Typography variant="body2">Height: 160 cm</Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={600}>
              Contact Details
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2">Mobile: 9994403456</Typography>
              <Typography variant="body2" color="text.secondary">
                Email: <b>Not Available</b>
              </Typography>
              <Typography variant="body2">
                Address: #33, gandhi Nagar, 2nd cross street
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Vital Info */}
        <Typography variant="body2" mb={2}>
          Patient Vital Info <span style={{ color: '#848484' }}>(updated on 10-Feb-2025)</span>
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={6} sm={3}>
            <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                120/80
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Blood Pressure
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                72
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pulse (BPM)
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                18
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Respiratory rate (Per min)
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Stack alignItems="center">
              <Typography fontWeight={600} variant="body1" color="primary">
                Moderate
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
      <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Visited Date</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>BP Reading</TableCell>
              <TableCell>Pulse</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Row 1 */}
            <TableRow>
              <TableCell>10-Feb-2024</TableCell>
              <TableCell>
                <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }} />
              </TableCell>
              <TableCell>##### #####</TableCell>
              <TableCell>###</TableCell>
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
            {/* Row 2 */}
            <TableRow>
              <TableCell>15-Jan-2024</TableCell>
              <TableCell>
                <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }} />
              </TableCell>
              <TableCell>##### #####</TableCell>
              <TableCell>###</TableCell>
              <TableCell>Fever</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>

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
                 <Box display="flex" gap={2}>
                   <Button variant="outlined">Cancel</Button>
                  <Button
         variant="contained"
       >
         Continue
       </Button>
       
                 </Box>
               </Box>
      </Paper>
    </Box>
  );
}
