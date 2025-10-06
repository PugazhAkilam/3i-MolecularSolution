import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { formatTimeSlot } from "../../utils/formatTime";
import { getAppointment } from "../../service/appointmentService";

function AppointmentStep2() {
  const [scanResults, setScanResults] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
   const [editMode, setEditMode] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();
   const location = useLocation();
const { date, selectedTime, selectedDoctor, patient ,action,appointmentId} = location.state || {};
   console.log("locat",location.state);
   
    const [appointment, setAppointment] = useState({
    date: null,
    time: '',
    doctor: '',
    patient: null,
  });
console.log("appaat",appointment);
useEffect(() => {
   if(action === 'edit'){
    setEditMode(true);
   }

    if (date && selectedTime && selectedDoctor && patient) {
      setAppointment({
        date,
        time: selectedTime,
        doctor: selectedDoctor,
        patient,
        
      });
    }
  }, [date, selectedTime, selectedDoctor, patient]);



   useEffect(() => {
          async function fetchAppointmentDetails() {
            if (appointmentId) {
             
              try {
                const appointment = await getAppointment(appointmentId);
                if (appointment) {
                  console.log("loapp",appointment);
                   setScanResults({
        pulse:appointment.pulse,
        bloodPressure: appointment.bloodPressure,
        respiratoryRate:appointment.respiratoryRate,
        stressLevel: appointment.stressLevel,
      });
            
                }
              } catch (err) {
                console.error('Failed to fetch appointment details', err);
              }
            }
          }
          fetchAppointmentDetails();
        }, [appointmentId]);




 const [captureMode, setCaptureMode] = useState("now");
console.log(selectedDoctor, date, selectedTime);

 const handleContinue = () => {
  console.log("Continue clicked in Capture Now mode");
  navigate("/admin/appointment-step3", { state: { 
    appointment,
    scanResults ,
    action: editMode ? 'edit' : 'new',
    appointmentId: editMode ? appointmentId : null
    } });
};

  const handleChange = (event, newMode) => {
    if (newMode !== null) {
      setCaptureMode(newMode);
    }
  };
  // Start webcam stream when cameraOn becomes true
  useEffect(() => {
  if (cameraOn) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          alert("Error accessing camera: " + err.message);
          setCameraOn(false);
        });
    } else {
      alert("Camera API not supported or unavailable.");
      setCameraOn(false);
    }
  } else {
    // Stop webcam when cameraOff
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }
  return () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };
}, [cameraOn]);

  const handleScan = () => {
    setScanResults(null);
    setCapturedImage(null);
    setCameraOn(true);
    setScanning(true);

    // After 5 seconds, capture image and show results
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgDataUrl = canvas.toDataURL("image/png");
        setCapturedImage(imgDataUrl);
      }
      setScanResults({
        pulse: 78,
        bloodPressure: "118/77",
        respiratoryRate: 16,
        stressLevel: "Normal",
      });
      setScanning(false);
      setCameraOn(false);
    }, 5000);
  };


  return (
    // <Box
    //   sx={{
    //     bgcolor: "#f8fafc",
    //     fontFamily: "'Roboto', sans-serif",
    //     p: 3,
    //   }}
    // >
      <Box
        sx={{
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: "white",
          p: 4,
          borderRadius: 2,
      
        }}
      >
        {/* Header */}
        <Box borderBottom={1} borderColor="grey.200" pb={3} mb={3}>
          {/* <Typography variant="h4" fontWeight="bold" color="text.primary">
            Appointment
          </Typography> */}
          <Typography variant="h6" fontWeight="600" mb={1}>
               {editMode ? 'Update' : 'Add'} an appointment{" "}
            <Typography component="span" variant="body2" color="text.secondary">
                         (Step 2 of 3)
                       </Typography>
          </Typography>
          {appointment.patient ? (
          <Typography>
            {appointment.patient.firstName}{appointment.patient.lastName} | Mob: {appointment.patient.mobile} | Age: {appointment.patient.age} | Doc: {appointment.doctor} | 
            App: 
            {appointment.date ? 
              new Date(appointment.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
            
            : ''} - {formatTimeSlot(appointment.time)}
              
            {/* {appointment.time.toUpperCase()} */}
          </Typography>
        ) : (
          <Typography>No patient data available</Typography>
        )}
        
        </Box>
        {/* Main Content */}
        <Box>
          <Typography variant="h6" fontWeight="600" mb={2}>
            Patient Vital Update
          </Typography>
       <ToggleButtonGroup
      value={captureMode}
      exclusive
      onChange={handleChange}
      aria-label="capture mode"
      size="small"
 sx={{
      bgcolor: '#EEEEEE', // light gray background for the group
      borderRadius: '5px',
      p: 0.5,
      ".MuiToggleButton-root": {
        border: "none",
        borderRadius: '5px',
        px: 2,
        color: "text.secondary",  
        backgroundColor: 'transparent',
        "&:hover": {
          backgroundColor: "#c0c0c0",
        }
      },
      ".MuiToggleButton-root.Mui-selected": {
        backgroundColor: "#ffffff", // selected button bg white
        color: "#000000",           // selected button text color
        fontWeight: "bold",
      },
      ".MuiToggleButton-root:not(:last-of-type)": {
        marginRight: '4px', // add spacing between buttons
      }
    }}    >
      <ToggleButton 
  value="now"
  aria-label="capture now"
  
>
  Capture Now
</ToggleButton>


      <ToggleButton
        value="later"
        aria-label="capture later"

      >
        Capture Later
      </ToggleButton>
    </ToggleButtonGroup>
        {
          captureMode === "now" && (
            <Grid container spacing={4}>
            {/* LEFT SIDE: How to take assessment & Patient Vitals */}
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                {/* How to take assessment */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                    How to take assessment
                  </Typography>
                  <Box component="ol" sx={{ pl: 3, color: "text.secondary", fontSize: 14 }}>
                    <li>Ensure good lighting for clear visibility.</li>
                    <li>Position your device's camera so it's level with your eyes.</li>
                    <li>Avoid talking or moving your head.</li>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mt={3}>
                    Click <b>START</b> to take a 30 seconds face scan and get insights
                    into your health.
                  </Typography>
                </Box>
                {/* Patient Vital Info */}
                <Paper
                  elevation={1}
                  sx={{ p: 3, borderRadius: 2, border: 1, borderColor: "grey.300" }}
                >
                  <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                    Patient Vital Info
                  </Typography>
                  {/* <Typography variant="caption" color="text.secondary" mb={3}>
                    (Updated on 25-Jul-2025)
                  </Typography> */}
                  <Stack spacing={3}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ShowChartIcon color="primary" />
                      <Typography variant="body2" fontWeight="500" color="text.primary">
                        Blood Pressure:{" "}
                        {scanResults?.bloodPressure || (
                          <span style={{ color: "#888" }}>--/--</span>
                        )}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FavoriteBorderIcon color="primary" />
                      <Typography variant="body2" fontWeight="500" color="text.primary">
                        Pulse:{" "}
                        {scanResults?.pulse !== undefined ? scanResults.pulse : (
                          <span style={{ color: "#888" }}>--</span>
                        )}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PeopleOutlineIcon color="primary" />
                      <Typography variant="body2" fontWeight="500" color="text.primary">
                        Respiratory rate:{" "}
                        {scanResults?.respiratoryRate !== undefined ? scanResults.respiratoryRate : (
                          <span style={{ color: "#888" }}>--</span>
                        )}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonOutlineIcon color="primary" />
                      <Typography variant="body2" fontWeight="500" color="text.primary">
                        Stress Level:{" "}
                        {scanResults?.stressLevel || (
                          <span style={{ color: "#888" }}>--</span>
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
            {/* RIGHT SIDE: Camera/Scan Panel */}
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  maxWidth: 360,
                  mx: "auto",
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                {/* Red border corners */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    borderTop: "4px solid red",
                    borderLeft: "4px solid red",
                    width: 64,
                    height: 64,
                    borderTopLeftRadius: 16,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    borderTop: "4px solid red",
                    borderRight: "4px solid red",
                    width: 64,
                    height: 64,
                    borderTopRightRadius: 16,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    borderBottom: "4px solid red",
                    borderLeft: "4px solid red",
                    width: 64,
                    height: 64,
                    borderBottomLeftRadius: 16,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    borderBottom: "4px solid red",
                    borderRight: "4px solid red",
                    width: 64,
                    height: 64,
                    borderBottomRightRadius: 16,
                  }}
                />

                {/* Video or image display area */}
                <Box
                  sx={{
                    height: 384,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {!cameraOn && !capturedImage && !scanning && (
                    <Typography color="text.disabled" fontSize={14}>
                      Position your face in front of the camera
                    </Typography>
                  )}

                  {cameraOn && !capturedImage && (
                    <video
                      ref={videoRef}
                      style={{ width: "100%", height: "100%", borderRadius: 8 }}
                      autoPlay
                      muted
                      playsInline
                    />
                  )}

                  {scanning && (
                    <Typography
                      color="primary"
                      fontWeight="bold"
                      sx={{
                        position: "absolute",
                        fontSize: 20,
                        bgcolor: "background.paper",
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      Scanning...
                    </Typography>
                  )}

                  {capturedImage && (
                    <img
                      src={capturedImage}
                      alt="Captured"
                      style={{ width: "100%", height: "100%", borderRadius: 8 }}
                    />
                  )}
                </Box>

                {/* Hidden canvas for image capture */}
                <canvas ref={canvasRef} style={{ display: "none" }} />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <InfoOutlinedIcon fontSize="medium" color="disabled" />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleScan}
                    disabled={scanning}
                  >
                    {scanning ? "Scanning..." : "Scan"}
                  </Button>
                  <CameraAltIcon fontSize="medium" color="disabled" />
                </Box>
              </Box>

              {/* Vitals Summary Below Camera */}
              <Box
                sx={{
                  mt: 2,
                  maxWidth: 360,
                  mx: "auto",
                  border: 1,
                  borderColor: "grey.300",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "50%",
                      p: 2,
                      borderRight: 1,
                      borderColor: "grey.300",
                      textAlign: "center",
                      bgcolor: "grey.100",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Pulse
                    </Typography>
                  </Box>
                  <Box sx={{ width: "50%", p: 2, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Blood Pressure
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    color: "text.disabled",
                    fontSize: 14,
                  }}
                >
                  {scanResults ? (
                    <>
                      <b>{scanResults.pulse}</b> bpm / <b>{scanResults.bloodPressure}</b>{" "}
                      mmHg
                    </>
                  ) : (
                    <>Position your face in front of the camera</>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          )
        }  
        </Box>
        {/* Footer */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: 1,
            borderColor: "grey.200",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button variant="outlined" sx={{ textTransform: "none", color: "text.primary" }} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
             <Button variant="outlined" onClick={()=>navigate('/admin/appointment')}>Cancel</Button>
           <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
        onClick={handleContinue}
      >
       {editMode 
  ? 'Update & Continue' 
  : captureMode === "now" 
    ? 'Continue' 
    : 'Skip & Continue'
}

      </Button>
          </Box>
        </Box>
      </Box>
    // </Box>
  );
}

export default AppointmentStep2;