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
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "./config";

// A utility function to calculate age, to keep the main component clean
const calculateAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// The dialog component remains unchanged
function RegistrationDialog({ open, onClose, onYes, onNo }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" PaperProps={{ sx: { borderRadius: 2, p: 0 } }}>
            <DialogContent sx={{ position: 'relative', pb: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2, position: 'relative' }}>
                    <Typography variant="h6" fontWeight="bold">
                        Registration
                    </Typography>
                    <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                    The patient record has been saved. Do you want to continue to the appointment scheduling page?
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
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state || {};
    const isEditMode = locationState.action === 'edit';

    const [sex, setSex] = useState("male");
    const [dob, setDob] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", mobile: "", email: "",
        address1: "", address2: "", state: "", city: "",
        pincode: "", height: "", weight: ""
    });

    /**
     * useEffect hook to fetch data on component load.
     * It conditionally fetches either existing patient details (edit mode)
     * or the next available ID (new mode).
     */
    useEffect(() => {
        const fetchData = async () => {
            if (isEditMode && locationState.regId) {
                // Fetch patient details for edit mode
                const regId = locationState.regId;
                try {
                    // This is the missing API call to get patient details
                    const res = await fetch(`${API_URL}/patient/getPatientDetails/${regId}`);
                    const data = await res.json();
                    if (res.ok) {
                        setPatientId(data.patientId);
                        setFormData({
                            firstName: data.firstName || "", lastName: data.lastName || "",
                            mobile: data.mobile || "", email: data.email || "",
                            address1: data.addressLine1 || "", address2: data.addressLine2 || "",
                            state: data.state || "", city: data.city || "",
                            pincode: data.pincode || "", height: data.height || "",
                            weight: data.weight || ""
                        });
                        setSex(data.sex || "male");
                        if (data.dob) setDob(new Date(data.dob));
                    } else {
                        console.error("Failed to fetch patient details:", data.message);
                    }
                } catch (err) {
                    console.error("Network error fetching patient details:", err);
                }
            } else {
                // Fetch next available patient ID for new patient mode
                try {
                    const res = await fetch(`${API_URL}/patient/getNextPatientId`);
                    const data = await res.json();
                    if (res.ok) {
                        setPatientId(data.nextPatientId);
                    }
                } catch (err) {
                    console.error("Failed to fetch next patient ID", err);
                }
            }
        };

        fetchData();
    }, [isEditMode, locationState.regId]);

    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSexChange = (event, newSex) => {
        if (newSex !== null) setSex(newSex);
    };
    
    // Unified save function that handles both POST and PUT requests
    const handleSave = async () => {
        const patientData = {
            ...formData,
            height: Number(formData.height),
            weight: Number(formData.weight),
            sex,
            dob: dob ? dob.toISOString() : null,
            age: calculateAge(dob),
        };

        let apiUrl;
        let method;
        
        if (isEditMode) {
            apiUrl = `${API_URL}/patient/updatePatient/${patientId}`;
            method = "PUT";
        } else {
            apiUrl = `${API_URL}/patient/newPatientRegistration`;
            method = "POST";
            patientData.regId = patientId; // Add regId for new patient
        }

        try {
            const res = await fetch(apiUrl, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patientData)
            });
            const data = await res.json();
            
            if (res.ok) {
                console.log("Success:", data.message);
                setDialogOpen(true);
            } else {
                console.error("Save failed:", data.message);
                alert("Save failed: " + data.message);
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("An error occurred. Please try again.");
        }
    };
    
    const handleDialogYes = () => {
        setDialogOpen(false);
        navigate('/admin/appointment-step1', {
            state: {
                regId: patientId,
                name: formData.firstName + " " + formData.lastName,
                mobile: formData.mobile,
                age: calculateAge(dob),
                action: isEditMode ? 'edit' : 'new'
            }
        });
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
            
                bgcolor: "#fff",
                boxShadow: 1,
            }}>
                <Typography fontWeight={600} fontSize={18} gutterBottom>
                    {isEditMode ? "Edit Patient Registration" : "New Patient Registration"}
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
                            <TextField label="Mobile *" fullWidth value={formData.mobile} onChange={handleInputChange("mobile")} />
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
                        <Button variant="outlined" color="primary" onClick={()=>navigate(-1)}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            {isEditMode ? "Update" : "Save & Register"}
                        </Button>
                    </Box>
                </Paper>
                <RegistrationDialog 
                    open={dialogOpen} 
                    onClose={() => setDialogOpen(false)} 
                    onYes={handleDialogYes} 
                    onNo={handleDialogNo} 
                />
            </Box>
        </Box>
    );
}