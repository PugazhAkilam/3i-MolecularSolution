import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { RiCloseCircleFill } from "react-icons/ri";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { formatTo12Hour } from "../../utils/formatDate";
import VisitHistoryTable from "../visitHis/VisitHistoryTable";

const visitHistory = [
  {
    date: "10-Feb-2024",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    bp: "120/80",
    pulse: "72",
    notes: "Regular checkup",
  },
  {
    date: "15-Jan-2024",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bp: "118/78",
    pulse: "68",
    notes: "Fever",
  },
];

export default function AppointmentReviewStep3() {
  const navigate = useNavigate();
  
  
  const location = useLocation();
  const { appointment, scanResults,action } = location.state || {};
  

  console.log("s3",appointment);
  console.log("ss",scanResults);
  
  
  const [open, setOpen] = React.useState(false);

  const handleSave = async () => {

    const newAppointment = {...appointment, ...scanResults };
    console.log("nA",newAppointment);
    
    try {
      const res = await fetch(`http://localhost:8000/api/editAppointment/${appointment.patient.appointmentId}`, {
        method: "PUT",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAppointment)
      });
      const data = res.json();
      console.log("res-data", data);
      
    } catch(err) {
      console.log("error",err);      
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
   console.log("patientId,doctor,date,time,bp,streslevel,respiratoryRate,pulse ");
// const formatTo12Hour = (isoString) => {
//     // Return an empty string if the input is not a valid string or is empty
//     if (typeof isoString !== 'string' || !isoString.trim()) {
//         return "";
//     }
    
//     // Create a Date object from the ISO string
//     const date = new Date(isoString);

//     // Get the hour from the Date object in local time
//     let hours = date.getHours();
    
//     // Determine the AM/PM suffix
//     const suffix = hours >= 12 ? 'PM' : 'AM';
    
//     // Convert 24-hour format to 12-hour format
//     hours = hours % 12;
//     // The hour '0' should be '12'
//     hours = hours === 0 ? 12 : hours;

//     // Return the formatted string
//     return `${hours} ${suffix}`;
// };

// Example usage:
const isoTime = "1970-01-01T15:00:00.000Z";
const formattedTime = formatTo12Hour(isoTime); 

console.log(formattedTime); 
// Depending on your local time zone, the output will be different.
// For IST (UTC+5:30), the output will be "8:30 PM".
// The provided format `1970-01-01T15:00:00.000Z` is UTC, so it will be converted
// to the equivalent time in the user's local time zone. For example, 15:00 UTC
// is 8:30 PM in India Standard Time.
 
  return (
    <>
      <Card sx={{ maxWidth: "100%", mx: "auto", borderRadius: 3, mt: 4 }}>
        <CardContent sx={{ p: { xs: 1, md: 4 } }}>
          {/* Header */}
          <Typography variant="h5" fontWeight="bold">
            Appointment
          </Typography>
          <Typography fontWeight={600} mt={0.5}>
            Add an appointment{" "}
            <Typography component="span" variant="body2" color="text.secondary">
              (Step 3 of 3)
            </Typography>
          </Typography>
        {appointment.patient ? (
                  <Typography>
                    {appointment.patient.firstName}{" "}{appointment.patient.lastName}   | Mob: {appointment.patient.mobile} | Age: {appointment.patient.age} | Doc: {appointment.doctor} | App: {appointment.date ? new Date(appointment.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }) : ''} - {formatTo12Hour(appointment.time)}
                  </Typography>
                ) : (
                  <Typography>No patient data available</Typography>
                )}
          <Divider sx={{ my: 2 }} />

          {/* Patient/Appointment Details */}
          <Grid container spacing={2} mb={1}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight="600" mb={1}>
                Patient Details
              </Typography>
              {appointment.patient?(
<>
    <Typography>
                <b>Name:</b> {appointment.patient.name}
              </Typography>
              <Typography>
                <b>Age:</b> {appointment.patient.age}
              </Typography>
              <Typography>
                <b>Sex:</b> {appointment.patient.gender||"male"}
              </Typography>
              <Typography>
                <b>Weight:</b>  {appointment.patient.weight|| "69"}
              </Typography>
              <Typography>
                <b>Height:</b> {appointment.patient.height||"176"}
              </Typography>
</>
              ):(
                <></>
              )}
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight="600" mb={1}>
                Appointment Details
              </Typography>
              {
                appointment?(<>
                  <Typography>
                <b>Doctor:</b> {appointment.doctor}
              </Typography>
              <Typography>
                <b>Date:</b> {appointment.date ? new Date(appointment.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }) : ''}
              </Typography>
              <Typography>
                <b>Time:</b>  {appointment.time.toUpperCase()}
              </Typography>
                
                </>):(<></>)
              }
            
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Patient Vital Info */}
          <Typography fontWeight="600" mb={2}>
            Patient Vital Info{" "}
            <Typography component="span" fontSize={13} color="text.secondary">
              (updated on 28-Jul-2025)
            </Typography>
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={3}>
              <Typography fontWeight={600} fontSize={15}>
                <ShowChartIcon color="primary" fontSize="small" /> Blood Pressure
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                {scanResults?scanResults.bloodPressure:""}{" "}
                <Typography variant="caption" color="text.secondary">
                  mmHg
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography fontWeight={600} fontSize={15}>
                <FavoriteBorderIcon color="primary" fontSize="small" /> Pulse
              </Typography>
              <Typography variant="h6" sx={{ color: "#2466d2" }} fontWeight={700}>
                {scanResults?scanResults.
pulse:""}{" "}
                <Typography variant="caption" color="text.secondary">
                  BPM
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography fontWeight={600} fontSize={15}>
                <PeopleAltOutlinedIcon color="primary" fontSize="small" /> Respiratory rate
              </Typography>
              <Typography variant="h6" sx={{ color: "#2466d2" }} fontWeight={700}>
                {scanResults?scanResults.respiratoryRate:""}{" "}
                <Typography variant="caption" color="text.secondary">
                  Per min
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography fontWeight={600} fontSize={15}>
                <PersonOutlineIcon color="primary" fontSize="small" /> Stress Level
              </Typography>
              <Typography
                fontWeight={700}
                color="primary"
                sx={{ bgcolor: "#f7fafc", px: 1, borderRadius: 1 }}
              >
               {scanResults?scanResults.stressLevel:""}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />

          {/* Visit History Table */}
          <Typography fontWeight="600" mb={1}>
            Visit History
          </Typography>
            <VisitHistoryTable regId={appointment.patient.patientId} />

          {/* Action Buttons */}
          <Grid container justifyContent="flex-end" spacing={2} mt={3}>
            <Grid item>
              <Button variant="outlined">Cancel</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSave}>
                Save &amp; Continue
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <b>Registration</b>
          <IconButton aria-label="close" onClick={handleClose} size="large">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" mb={1}>
            The new appointment has been registered, and you are redirected to patient page
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => navigate("/admin/appointment")}
            variant="contained"
            color="primary"

          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
