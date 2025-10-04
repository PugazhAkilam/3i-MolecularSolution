import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Chip,
    Select,
    MenuItem,
    FormControl,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,Grid,
    IconButton,
} from '@mui/material';
import { color, styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
// import ShowChartIcon from '@mui/icons-material/ShowChart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { RiCloseCircleFill } from "react-icons/ri";
import { API_URL} from '../config';
import { LuActivity } from "react-icons/lu";
import { FaHeartbeat } from "react-icons/fa";
import { FaLungs } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import CloseIcon from '@mui/icons-material/Close';

const VitalInfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    flexWrap: 'wrap',
}));

const VitalItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(1),
    '& .value': {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    '& .label': {
        color: theme.palette.text.secondary,
    },
}));

const ConsultationTab = ({ patientData }) => {
    // State to hold patient's medical history
    const [chiefComplaint, setChiefComplaint] = useState('');
    const [summaryNote, setSummaryNote] = useState('');
    const [preExistingProblems, setPreExistingProblems] = useState([]);
    const [allergy, setAllergy] = useState('');
    
    // State to manage prescriptions
    const [newMedicine, setNewMedicine] = useState({
        name: '',
        dosage: '',
        duration: '',
        frequency: '',
        notes: '',
    });
    const [prescriptions, setPrescriptions] = useState([]);

    // Loading and error states for fetching data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    console.log("Patient Data in ConsultationTab:", patientData);
    
    /**
     * Fetches existing medical history and prescriptions for the patient
     * when the component mounts or patientData changes.
     */
    useEffect(() => {
        const fetchMedicalHistory = async () => {
            if (!patientData || !patientData.patientId) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}/patient/getMedhistory/${patientData.patientId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch medical history');
                }
                const data = await response.json();
                
                setChiefComplaint(data.ChiefComplaint || '');
                setSummaryNote(data.SummaryNote || '');
                setPreExistingProblems(data.PreExisting || []);
                setAllergy(data.Allergy || '');
                setPrescriptions(data.prescriptions || []);

            } catch (err) {
                console.error('Error fetching medical history:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicalHistory();
    }, [patientData]);

    const handleAddMedicine = () => {
        if (newMedicine.name.trim() === '') return;
        setPrescriptions((prev) => [...prev, newMedicine]);
        setNewMedicine({ name: '', dosage: '', duration: '', frequency: '', notes: '' });
    };

    const handleDeleteMedicine = (indexToDelete) => {
        setPrescriptions((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    const handleDeleteProblem = (problemToDelete) => {
        setPreExistingProblems((prev) =>
            prev.filter((problem) => problem !== problemToDelete)
        );
    };

    const handleReset = () => {
        setChiefComplaint('');
        setSummaryNote('');
        setPreExistingProblems([]);
        setAllergy('');
        setPrescriptions([]);
        setNewMedicine({ name: '', dosage: '', duration: '', frequency: '', notes: '' });
    };

     const fetchMedicalHistory = async () => {
            if (!patientData || !patientData.patientId) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}/patient/getMedhistory/${patientData.patientId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch medical history');
                }
                const data = await response.json();
                
                setChiefComplaint(data.ChiefComplaint || '');
                setSummaryNote(data.SummaryNote || '');
                setPreExistingProblems(data.PreExisting || []);
                setAllergy(data.Allergy || '');
                setPrescriptions(data.prescriptions || []);

            } catch (err) {
                console.error('Error fetching medical history:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

    const handleSave = async () => {
        const payload = {
            patientId: patientData.patientId,
            appointmentId: patientData.appointmentId,
            chiefComplaint,
            summaryNote,
            preExistingProblems,
            allergy,
            prescriptions,
        };

        if (!payload.patientId || !payload.appointmentId) {
            alert("Patient or Appointment ID is missing. Cannot save.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/patient/saveConsultation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                alert(result.message);
                handleReset(); // Reset form after successful save
                await fetchMedicalHistory(); 
            } else {
                const errorData = await response.json();
                console.error('Failed to save data:', errorData.message);
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Failed to connect to the server.');
        }
    };

    if (loading) {
        return <Box sx={{ p: 4 }}>Loading patient history...</Box>;
    }

    if (error) {
        return <Box sx={{ p: 4, color: 'error.main' }}>Error: {error}</Box>;
    }

    return (
        <Box sx={{ padding: '0 30px' ,}}>
            
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Typography variant="body-1" sx={{ mb: 0 , fontWeight: 'bold'}} gutterBottom>
                Patient Vital Info
            </Typography>
            <Typography variant="body-2" sx={{ mb: 0 }} gutterBottom>
                (updated on 28-Jul-2025)
            </Typography>
        </Box>

          <VitalInfoBox sx={{ display: 'flex' }}>
  <VitalItem sx={{
    pl: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80px'
  }}>
    <Typography fontWeight={600} fontSize={15} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <LuActivity size={18} style={{ marginRight: 10 }} />
      Blood Pressure
    </Typography>
    <Typography variant="h6" color="#0F52BA" fontWeight={700} sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
      {patientData.bloodPressure || "120/80"}
      <Typography variant="caption" color="text.secondary" component="span" sx={{ fontWeight: "bold", fontSize: "15px" }}>
        mmHg
      </Typography>
    </Typography>
  </VitalItem>

  <VitalItem sx={{
    borderLeft: '2px solid #E5E7EB',
    pl: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80px'
  }}>
    
    <Typography fontWeight={600} fontSize={15} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <FaHeartbeat color="primary" size={18} style={{ marginRight: 10 }} />
      Pulse
    </Typography>
    <Typography variant="h6" sx={{ color: "#0F52BA", display: 'flex', alignItems: 'baseline', gap: 1 }} fontWeight={700}>
      {patientData.pulse || "-"}
      <Typography variant="caption" color="text.secondary" component="span" sx={{ fontWeight: "bold", fontSize: "15px" }}>
         {patientData.pulse? "BPM" : " "}
      </Typography>
    </Typography>
  </VitalItem>

  <VitalItem sx={{
    borderLeft: '2px solid #E5E7EB',
    pl: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80px'
  }}>
    <Typography fontWeight={600} fontSize={15} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <FaLungs color="primary" size={20} style={{ marginRight: 10 }} />
      Respiratory rate
    </Typography>
    <Typography variant="h6" sx={{ color: "#0F52BA", display: 'flex', alignItems: 'baseline', gap: 1 }} fontWeight={700}>
      {patientData.respiratoryRate || "-"}
      <Typography variant="caption" color="text.secondary" component="span" sx={{ fontWeight: "bold", fontSize: "15px" }}>
         {patientData.respiratoryRate? "Per min" : " "}
      </Typography>
    </Typography>
  </VitalItem>

  <VitalItem sx={{
    borderLeft: '2px solid #E5E7EB',
    pl: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '80px'
  }}>
    <Typography fontWeight={600} fontSize={15} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <IoPersonSharp color="primary" size={20} style={{ marginRight: 10 }} />
      Stress Level
    </Typography>
    <Typography variant="h6" sx={{ color: '#0F52BA', display: 'flex', alignItems: 'baseline', gap: 1 }} fontWeight={700}>
      {patientData.stressLevel || "-"}
    </Typography>
  </VitalItem>
</VitalInfoBox>
  <Box sx={{  p: 2 }}>
  <Grid container spacing={2}>
    {/* Chief Complaint */}
    <Grid item xs={12} md={10}>
      <Typography variant="body1" gutterBottom>
        Chief Complaint
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={1}
        value={chiefComplaint}
        onChange={(e) => setChiefComplaint(e.target.value)}
        sx={{ mb: 3 }}
      />
    </Grid>

    {/* Summary Note */}
    <Grid item xs={12} md={10}>
      <Typography variant="body1" gutterBottom>
        Summary Note
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Enter summary notes here"
        value={summaryNote}
        onChange={(e) => setSummaryNote(e.target.value)}
        sx={{ mb: 3 }}
      />
    </Grid>

    {/* Pre-existing Problems */}
    <Grid item xs={12} md={10}>
      <Typography variant="body1" gutterBottom>
        Pre-existing Problems
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          multiple
          value={preExistingProblems}
          onChange={(e) => setPreExistingProblems(e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDeleteProblem(value)}
                  deleteIcon={
                    <RiCloseCircleFill
                      size={20}
                      style={{ color: "#084480ff" }}
                    />
                  }
                  onMouseDown={(event) => event.stopPropagation()}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 0,
                    marginRight: "15px",
                  }}
                />
              ))}
            </Box>
          )}
          displayEmpty
        >
          {["Biabties", "Knee Pain", "Asthma", "Diabetes"].map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* Allergy Details */}
    <Grid item xs={12} md={10}>
      <Typography variant="body1" gutterBottom>
        Allergy Details
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="Enter allergy details here"
        value={allergy}
        onChange={(e) => setAllergy(e.target.value)}
        sx={{ mb: 3 }}
      />
    </Grid>
  </Grid>
</Box>


            


            <Typography variant="h6" gutterBottom>
                Prescription
            </Typography>
            <Table size="small">
              <TableHead>
  <TableRow sx={{ bgcolor: "#E7EEF8" }}>
    <TableCell sx={{ fontWeight: "bold" }}>Medicine Name</TableCell>
    <TableCell sx={{ fontWeight: "bold" }}>Dosage</TableCell>
    <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
    <TableCell sx={{ fontWeight: "bold" }}>Frequency</TableCell>
    <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
    <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
  </TableRow>
</TableHead>

                <TableBody>
                    {prescriptions.map((med, index) => (
                        <TableRow key={index}>
                            <TableCell>{med.name}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.duration}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                            <TableCell>{med.notes}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDeleteMedicine(index)} size="small">
                                    <DeleteIcon color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            <TextField
                                value={newMedicine.name}
                                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                                variant="outlined"
                              
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.dosage}
                                onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                                variant="outlined"
                               
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.duration}
                                onChange={(e) => setNewMedicine({ ...newMedicine, duration: e.target.value })}
                                variant="outlined"
                             
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.frequency}
                                onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })}
                                variant="outlined"
                                
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.notes}
                                onChange={(e) => setNewMedicine({ ...newMedicine, notes: e.target.value })}
                                variant="outlined"
                              
                            />
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={handleAddMedicine} size="small" color="primary">
                                <RiCloseCircleFill size={"25px"} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="outlined" onClick={handleAddMedicine} sx={{ mt: 2,fontWeight:"bold" }}>
                Add Medicine
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <Button variant="outlined" sx={{ mr: 2 }} onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default ConsultationTab;