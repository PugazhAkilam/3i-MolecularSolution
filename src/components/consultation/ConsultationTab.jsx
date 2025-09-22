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
    TableBody,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { RiCloseCircleFill } from "react-icons/ri";

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
                const response = await fetch(`http://localhost:8000/getMedhistory/${patientData.patientId}`);
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
                const response = await fetch(`http://localhost:8000/getMedhistory/${patientData.patientId}`);
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
            const response = await fetch('http://localhost:8000/saveConsultation', {
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
        <Box sx={{ padding: '0 30px' }}>
            <Typography variant="h6" sx={{ mb: 0 }} gutterBottom>
                Patient Vital Info
            </Typography>

            <VitalInfoBox>
                <VitalItem>
                    <Typography fontWeight={600} fontSize={15} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ShowChartIcon color="primary" fontSize="small" />
                        Blood Pressure
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight={700} sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        {patientData.bloodPressure || "120/80"}
                        <Typography variant="caption" color="text.secondary" component="span" sx={{ fontWeight: "bold", fontSize: "15px" }}>
                            mmHg
                        </Typography>
                    </Typography>
                </VitalItem>
                <VitalItem>
                    <Typography fontWeight={600} fontSize={15} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <FavoriteBorderIcon color="primary" fontSize="small" />
                        Pulse
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#2466d2", display: 'flex', alignItems: 'baseline', gap: 1 }} fontWeight={700}>
                        {patientData.pulse || "Pulse"}
                        <Typography variant="caption" color="text.secondary" component="span" sx={{ fontWeight: "bold", fontSize: "15px" }}>
                            BPM
                        </Typography>
                    </Typography>
                </VitalItem>
                <VitalItem>
                    <Typography fontWeight={600} fontSize={15} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PeopleAltOutlinedIcon color="primary" fontSize="small" />
                        Respiratory rate
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#2466d2", display: 'flex', alignItems: 'baseline', gap: 1 }} fontWeight={700}>
                        {patientData.respiratoryRate || "respiratoryRate"}
                        <Typography variant="caption" color="text.secondary" component="span" sx={{ fontWeight: "bold", fontSize: "15px" }}>
                            Per min
                        </Typography>
                    </Typography>
                </VitalItem>
                <VitalItem>
                    <Typography fontWeight={600} fontSize={15} sx={{ mb: 0.5 }}>
                        <PersonOutlineIcon color="primary" fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Stress Level
                    </Typography>
                    <Typography
                        fontWeight={700}
                        color="primary"
                        sx={{ px: 1, display: 'inline-block', fontSize: "22px" }}
                    >
                        {patientData.stressLevel || "stressLevel"}
                    </Typography>
                </VitalItem>
            </VitalInfoBox>

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

            <Typography variant="body1" gutterBottom>
                Pre-existing Problems
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <Select
                    multiple
                    value={preExistingProblems}
                    onChange={(e) => setPreExistingProblems(e.target.value)}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    onDelete={() => handleDeleteProblem(value)}
                                    onMouseDown={(event) => event.stopPropagation()}
                                />
                            ))}
                        </Box>
                    )}
                    displayEmpty
                >
                    {['Biabties', 'Knee Pain', 'Asthma', 'Diabetes'].map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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

            <Typography variant="h6" gutterBottom>
                Prescription
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f7fa" }}>
                        <TableCell>Medicine Name</TableCell>
                        <TableCell>Dosage</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Notes</TableCell>
                        <TableCell>Actions</TableCell>
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
                                    <DeleteIcon color="error" />
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
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.dosage}
                                onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.duration}
                                onChange={(e) => setNewMedicine({ ...newMedicine, duration: e.target.value })}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.frequency}
                                onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                value={newMedicine.notes}
                                onChange={(e) => setNewMedicine({ ...newMedicine, notes: e.target.value })}
                                variant="outlined"
                                size="small"
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
            <Button variant="outlined" onClick={handleAddMedicine} sx={{ mt: 2 }}>
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