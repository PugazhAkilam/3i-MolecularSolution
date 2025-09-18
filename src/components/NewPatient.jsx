import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

function RegistrationDialog({ open, onClose, onYes, onNo }) {
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" PaperProps={{ sx: { borderRadius: 2, p: 0 } }}>
      <DialogContent sx={{ position: 'relative', pb: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2, position: 'relative' }}>
          <Typography variant="h6" fontWeight="bold">
            Registeration
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          The new patient has been registered, and you are redirected to Schedule an appointment page
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onYes}
          sx={{ minWidth: 64, fontWeight: 'bold', textTransform: 'none', mr: 2 }}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onNo}
          sx={{ minWidth: 64, fontWeight: 'bold', textTransform: 'none' }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function NewPatientRegistration() {
     
  const [sex, setSex] = React.useState("male");
  const [dob, setDob] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [ registeredCount, setRegisteredCount ] = useState();
   const registerPatientCount = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/registeredPatientCount');
        const data = await res.json();
        // console.log("res-data",data.count);        
        setRegisteredCount(data.count);
      } catch(err) {
        console.log("Failed to fetch registered patient count");
        console.log("error", err);       
      }
    }

  useEffect(() => {
    registerPatientCount();
  }, []);

  console.log();
  
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    pincode: "",
    height: "",
    weight: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSexChange = (event, newSex) => {
    if (newSex !== null) setSex(newSex);
  };

  const patientId = `P${(registeredCount + 1).toString().padStart(4, '0')}`;
  console.log("p",patientId);
  
  console.log("registeredCount", registeredCount);
  // Save data into localStorage


  const handleRegister = async () => {

    function calculateAge(dob) {
        if (!dob) return "";

         const today = new Date();
         const birthDate = new Date(dob);

         let age = today.getFullYear() - birthDate.getFullYear();
         const m = today.getMonth() - birthDate.getMonth();

  // If birthday hasn't occurred yet this year, subtract 1
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

    const newPatient = {
      regId: patientId,
      ...formData,
      height: Number(formData.height),
      weight: Number(formData.weight),
      sex,
      dob: dob || null, // keep as Date object or null
      age: calculateAge(dob),
      
    };

    // const existingData = JSON.parse(localStorage.getItem("patientsData")) || [];
    // localStorage.setItem("patientsData", JSON.stringify([...existingData, newPatient]));
    console.log("form", formData);
    console.log("newPatient", newPatient);
    
    

    const res = await fetch('http://localhost:8000/api/newPatientRegistration', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient)
    });
    const data = await res.json();
    // localStorage.setItem("patient", JSON.stringify(data));
    console.log("newPatientRegistration data",data);

     await registerPatientCount(); // ✅ refresh the registeredCount
    
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogYes = () => {
    setDialogOpen(false);
    navigate('/admin/appointment-step1');
  };
  const handleDialogNo = () => {
    setDialogOpen(false);
    navigate('/admin');
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{
        mx: "auto",
        p: { xs: 1, md: 3 },
        borderRadius: 3,
        bgcolor: "#fff",
        boxShadow: 1,
      }}>
        <Typography fontWeight={600} fontSize={18} gutterBottom>
          New Patient Registeration{" "}
        </Typography>
        <Paper sx={{ p: 4, borderRadius: 2 }} elevation={0}>
          <Typography fontWeight={600} fontSize={16} mb={3}>
            Patient Information
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={4}>
              <TextField label="Patient ID" value={patientId} fullWidth disabled />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={4}>
              <TextField label="First Name *" fullWidth
                value={formData.firstName}
                onChange={handleInputChange("firstName")} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Last Name *" fullWidth value={formData.lastName} onChange={handleInputChange("lastName")} />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mb={3}>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Of Birth *"
                  value={dob}
                  onChange={setDob}
                  format="dd-MMM-yyyy"
                  slotProps={{ textField: { fullWidth: true, placeholder: "Select date" } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex' }}>
                <Typography fontWeight={500} mt={1} mr={1}>
                  Sex *
                </Typography>
                <ToggleButtonGroup
                  value={sex}
                  exclusive
                  onChange={handleSexChange}
                  size="small"
                  sx={{
                    border: "1px solid #b1b7bf",
                    borderRadius: 1,
                    ".MuiToggleButton-root": { borderRadius: 0, border: "none", px: 2, color: "#616161" },
                    ".MuiToggleButton-root.Mui-selected": { backgroundColor: "#e9f0ff", color: "#1976d2", fontWeight: "bold" },
                    ".MuiToggleButton-root:not(:last-child)": { borderRight: "1px solid #b1b7bf" }
                  }}
                >
                  <ToggleButton value="male">Male</ToggleButton>
                  <ToggleButton value="female">Female</ToggleButton>
                  <ToggleButton value="not_answer">Not to Answer</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>
          </Grid>

          <Typography fontWeight={600} fontSize={16} mb={3}>
            Contact Info
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={4}>
              <TextField label="Mobile *" fullWidth value={formData.mobile} onChange={handleInputChange("mobile")}  />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Email ID" fullWidth value={formData.email} onChange={handleInputChange("email")} />
            </Grid>
            <Grid item xs={8}>
              <TextField label="Address" fullWidth sx={{ mb: 2 }} value={formData.address1} onChange={handleInputChange("address1")} />
            </Grid>
            <Grid item xs={8}>
              <TextField label="Address Line 2" fullWidth sx={{ mb: 2 }} value={formData.address2} onChange={handleInputChange("address2")} />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={2.6}>
              <TextField label="State" fullWidth value={formData.state} onChange={handleInputChange("state")} />
            </Grid>
            <Grid item xs={2.7}>
              <TextField label="City" fullWidth value={formData.city} onChange={handleInputChange("city")} />
            </Grid>
            <Grid item xs={2.7}>
              <TextField label="Pin code" fullWidth value={formData.pincode} onChange={handleInputChange("pincode")} />
            </Grid>
          </Grid>

          <Typography fontWeight={600} fontSize={16} mb={2}>
            Health Info
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={2}>
              <TextField label="Height(cm) *" fullWidth value={formData.height} onChange={handleInputChange("height")} />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Weight(kg) *" fullWidth value={formData.weight} onChange={handleInputChange("weight")} />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="primary">Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleRegister}>Save & Register</Button>
          </Box>
        </Paper>
        <RegistrationDialog open={dialogOpen} onClose={handleDialogClose} onYes={handleDialogYes} onNo={handleDialogNo} />
      </Box>
    </Box>
  );
}
