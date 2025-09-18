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
  const [patient, setPatient] = useState({
    regId: '',
    name: '',
    mobile: '',
    age: ''
  });
  const navigate = useNavigate();
 const location = useLocation();
  const patientData = location.state || {};
  console.log("pat",patientData);
  
  // Load the last registered patient from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patientsData")) || [];
    if (stored.length > 0) {
      setPatient(stored[stored.length - 1]); // get latest patient
    }
  }, []);
 useEffect(() => {
    if (patientData.regId) {
      setPatient({
        regId: patientData.regId,
        name: patientData.name,
        mobile: patientData.mobile,
        age: patientData.age
      });
    }
  }, [patientData]);

  return (
    <Card sx={{ width: "100%", borderRadius: 3, my: 4 }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Appointment
        </Typography>

        <Box borderRadius={2} p={1}>
          <Typography variant="h6" fontWeight="600" mb={1}>
            Add an appointment{" "}
            <Typography component="span" variant="body2" color="text.secondary">
              (Step 1 of 3)
            </Typography>
          </Typography>

          {/* Patient Info from localStorage */}
          <Typography color="text.secondary" mb={3}>
            {patient ? (
              <>
                
                <b>
                                 
              Patient Id: {patient.regId} |   {patient.name} 
                </b>{" "}
                | Mob: {patient.mobile} | Age:{" "}
                {patient.age
                 }
              </>
            ) : (
              "No patient data found"
            )}
          </Typography>

          <Divider sx = {{ my: 2 }} />

          {/* Doctor select */}
          <Box mt={4} width={200}>
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
                  {date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
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
            <Button variant="outlined">Cancel</Button>
           <Button
  variant="contained"
  onClick={() =>
    navigate("/admin/appointment-step2", {
      state: { date, selectedTime, selectedDoctor, patient },
    })
  }
>
  Continue
</Button>

          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
