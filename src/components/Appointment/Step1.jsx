import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getPatientDetails } from '../../service/patientService';
import { getAppointmentDetails } from '../../service/appointmentService';
import { formatDate } from "../../utils/formatDate";
import { formatTimeSlot } from "../../utils/formatTime";

const TIME_SLOTS = {
  morning: ["9 am", "10 am", "11 am", "12 am"],
  noon: ["2 pm", "3 pm", "4 pm", "5 pm"],
  evening: ["6 pm", "7 pm", "8 pm", "9 pm"],
};

const DOCTORS = ["Dr.Ram", "Dr.Nitin", "Dr.Kumar"];
const BOOKED_TIMES = new Set(["9 am", "10 am", "5 pm", "8 pm", "9 pm"]);

export default function AppointmentStep1() {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("10 am");
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
  const [patient, setPatient] = useState(null);
    const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
 const location = useLocation();
  const patientData = location.state || {};
  console.log("patdata",patientData);
   console.log("pat",patient);
   
  
    useEffect(() => {
      async function fetchPatientDetails() {
        if (patientData.regId) {
          try {
            const data = await getPatientDetails(patientData.regId);
            setPatient(Array.isArray(data.data) ? data.data[0] : data.data);
          } catch (err) {
            console.error('Failed to fetch patient details', err);
          }
        }
      }
      fetchPatientDetails();
    }, [patientData.regId]);

      useEffect(() => {
        async function fetchAppointmentDetails() {
          if (patientData.action === 'edit' && patientData.data && patientData.data.appointmentId) {
            setEditMode(true);
            try {
              const appointment = await getAppointmentDetails(patientData.data.patientId);
              if (appointment) {
                console.log("loapp",appointment);
                
             setSelectedTime(appointment.time ? formatTimeSlot(appointment.time) : "10 am");
                setSelectedDoctor(appointment.doctor || DOCTORS[0]);
                setDate(appointment.date ? new Date(appointment.date) : new Date());
              }
            } catch (err) {
              console.error('Failed to fetch appointment details', err);
            }
          }
        }
        fetchAppointmentDetails();
      }, [patientData]);
 

  return (
    <Card sx={{ width: "100%", borderRadius: 2 }}>
      <CardContent>
        {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
          Appointment
        </Typography> */}

        <Box borderRadius={2} p={1}>
          <Typography variant="h6" fontWeight="600" mb={1}>
           {editMode ? 'Update' : 'Add'} an appointment{" "}
            <Typography component="span" variant="body2" color="text.secondary">
              (Step 1 of 3)
            </Typography>
          </Typography>

          {/* Patient Info from localStorage */}
          <Typography color="text.secondary" mb={3}>
              {patient ? (
                <>
                  <b>
                    Patient Id: {patient.patientId} | {patient.firstName} {patient.lastName}
                  </b>{" "}
                  | Mob: {patient.mobile} | Age: {patient.age}
                </>
              ) : (
                "No patient data found"
              )}
          </Typography>

          <Divider sx = {{ my: 2 }} />

          {/* Doctor select */}
          <Box mt={4} width={230}>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              style={{
                width: "50%",
                padding: "8px",
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            >
              {DOCTORS.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Date & Time Pickers */}
          <Typography variant="subtitle1" fontWeight="500" mt={1} mb={2}>
            Select Date &amp; Time
          </Typography>

          <Grid container spacing={4} alignItems="flex-start">
            {/* Calendar on the left */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#fcfcfc",
                  borderRadius: 2,
                  p: 2,
                  minHeight: 380,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    renderInput={() => null}
                    showDaysOutsideCurrentMonth
                  />
                </LocalizationProvider>
              </Paper>
            </Grid>

            {/* Time slots on the right */}
            <Grid item xs={12} md={8}>
              <Box sx={{ mt: { xs: 2, md: 2 } }}>
                {Object.entries(TIME_SLOTS).map(([section, times]) => (
                  <Box key={section} mb={3}>
                    <Typography fontWeight="600" mb={1} textTransform="capitalize">
                      {section}
                    </Typography>
                    <Grid container spacing={1} justifyContent="flex-start">
                      {times.map((time) => {
                        const isBooked = BOOKED_TIMES.has(time);
                        const selected = selectedTime === time;

                        return (
                          <Grid item xs={6} sm={3} key={time}>
                            <Button
                              fullWidth
                              disabled={isBooked}
                              variant={selected ? "contained" : "outlined"}
                              color={
                                isBooked ? "secondary" : selected ? "primary" : undefined
                              }
                              onClick={ () => !isBooked && setSelectedTime(time)}
                              sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": { bgcolor: isBooked ? "none" : undefined },
                              }}
                            >
                              {time}
                            </Button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Appointment Details */}
          <Box mt={4}>
            <Typography fontWeight={600}>Appointment Details</Typography>
            <Grid container spacing={2} mt={1} color="text.secondary" direction="column">
              <Grid item xs={12}>
                <Typography>
                  <strong>Doctor:</strong> {selectedDoctor}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Date:</strong>{" "}
                  
                  {formatDate(date)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Time:</strong> {selectedTime.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Buttons */}
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
            <Button variant="outlined" onClick={()=>navigate('/admin/appointment')}>Cancel</Button>
           <Button
  variant="contained"
  onClick={() =>
    navigate("/admin/appointment-step2", {
      state: { date,
         selectedTime, 
         selectedDoctor,
          patient, 
          appointmentId: patientData.data ? patientData.data.appointmentId : null,
          action: editMode ? 'edit' : 'new' },
    })
  }
>
  {editMode ? 'Update & Continue' : 'Continue'}
</Button>

          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
