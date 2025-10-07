import React, { useEffect } from "react";
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
  Tooltip,
  Box
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
import VisitHistoryTable from "../visitHis/VisitHistoryTable";
import { API_URL } from "../config";
import { formatTimeSlot } from "../../utils/formatTime";
import PreviousVisitTab from "../consultation/PreviousVisitTab";

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
  const { appointment, scanResults,action,appointmentId } = location.state || {};
  console.log("loc",location.state);
  

  console.log("s3",appointment);
  console.log("ss",scanResults);
  
   const [editMode, setEditMode] = React.useState(false);
  const [open, setOpen] = React.useState(false);

   useEffect(() => {
    if (action === 'edit') {
      setEditMode(true);
    }
  }, [action]);


 const newAppointment = { ...appointment, ...scanResults};
    console.log("newAppointment:", newAppointment);
  const handleSave = async () => {
    // Combine existing appointment data with new scan results
    const newAppointment = { ...appointment, ...scanResults };
    console.log("newAppointment:", newAppointment);

    let apiUrl;
    let method;

    // Determine API endpoint and method based on whether an appointment ID exists
    if (editMode && appointmentId) {
        // If an appointmentId exists, it's an update
        apiUrl = `${API_URL}/appointment/editAppointment/${appointmentId}`;
        method = "PUT";
    } else if (newAppointment.patient.patientId) {
        // If it's a new registration, it's a create operation
        apiUrl = `${API_URL}/appointment/createAppointment`;
        method = "POST";
    } else {
        // Handle case where neither ID is available
        console.error("No valid appointment ID or registration ID found.");
        return; // Exit the function to prevent an API call
    }

    try {
        const res = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAppointment)
        });

        // Always await the response data to avoid a common promise-related error
        const data = await res.json();
        console.log("res-data", data);

        if (res.ok) {
          console.log("Appointment saved successfully!");
          
           // alert("Appointment saved successfully!");
        } else {
            alert(`Error: ${data.message || 'Failed to save appointment.'}`);
        }

    } catch (err) {
        console.log("error", err);
        alert("An error occurred. Please try again.");
    }

    // This is called after the API request attempt, regardless of success or failure
    setOpen(true);
};
  const handleClose = () => {
    setOpen(false);
  };
   console.log("patientId,doctor,date,time,bp,streslevel,respiratoryRate,pulse ");

 
  return (
    <>
      <Card sx={{ maxWidth: "100%", mx: "auto", borderRadius: 2 }}>
        <CardContent sx={{ p: { xs: 1, md: 4 } }}>
          {/* Header */}
          {/* <Typography variant="h5" fontWeight="bold">
            Appointment
          </Typography> */}
         <Typography variant="h6" fontWeight="600" mb={1}>
                   {editMode ? 'Update' : 'Add'} an appointment{" "}
                    <Typography component="span" variant="body2" color="text.secondary">
                      (Step 3 of 3)
                    </Typography>
                  </Typography>
        {appointment.patient ? (
                  <Typography>
                    {appointment.patient.firstName}{appointment.patient.lastName} | Mob: {appointment.patient.mobile} | Age: {appointment.patient.age} | Doc: {appointment.doctor} | App: {appointment.date ? new Date(appointment.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }) : ''} - {formatTimeSlot(appointment.time)}
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
                <b>Name:</b> {appointment.patient.firstName}{appointment.patient.lastName}
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
                <b>Time:</b> {formatTimeSlot(appointment.time)}
              </Typography>
                
                </>):(<></>)
              }
            
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Patient Vital Info */}
          <Typography fontWeight="600" mb={2}>
            Patient Vital Info{" "}
           
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={3}>
              <Typography fontWeight={600} fontSize={15}>
                <ShowChartIcon color="primary" fontSize="small" /> Blood Pressure
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                {scanResults?scanResults.bloodPressure:""}{" "}
                <Typography variant="caption" color="text.secondary">
                {scanResults? "mmHg":""}  
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
                      {scanResults? "BPM":""}  
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
                    {scanResults? "Per min":""}  
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
          {
            editMode?(<>
               <Typography fontWeight="600" mb={1}>
            Visit History
          </Typography>
          <PreviousVisitTab patientData={appointment.patient} />
            </>
            ):(
              <></>
            )
          }
        
            
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
              onClick={handleSave}
            >
         {editMode ? 'Update & Continue' : 'Continue'}
            </Button>
            
                      </Box>
                    </Box>
            
         
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
