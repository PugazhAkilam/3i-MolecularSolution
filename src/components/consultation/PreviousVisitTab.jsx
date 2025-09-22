// PreviousVisitTab.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from '@mui/material';

const PreviousVisitTab = ({patientData}) => {
  const visitData = {
    visitedDate: '02-Feb-2025',
    chiefComplaint: 'Cold and Cough for past 3 days',
    prescription: [
      { name: 'Paracetamol', dosage: '500mg', duration: '3 days', frequency: 'TDS', notes: 'After meals' },
      { name: 'Cough Syrup', dosage: '10ml', duration: '5 days', frequency: 'BD', notes: 'As needed' },
    ],
    vital: {
      bloodPressure: '120/80',
      heartRate: '75 bpm',
      pulse: '72 bpm',
      stressLevel: 'Low',
    },
  };
      const [loading, setLoading] = useState(true);
      const [prescriptions, setPrescriptions] = useState([]);
        const [error, setError] = useState(null);
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
                
                // setChiefComplaint(data.ChiefComplaint || '');
                // setSummaryNote(data.SummaryNote || '');
                // setPreExistingProblems(data.PreExisting || []);
                // setAllergy(data.Allergy || '');
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

  return (
    <>
    <Box sx={{  flexGrow: 1, margin: '30px' }}>
      <Typography variant="h6" gutterBottom>
        Visited Date: {visitData.visitedDate}
      </Typography>

      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Chief Complaint
      </Typography>
      <Typography variant="body1" sx={{ mb: 3}}>
        {visitData.chiefComplaint}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Prescription
      </Typography>
      <Table size="small" sx={{ mb: 3, border: '1px solid #E7EEF8', borderRadius: 1, overflow: 'hidden' }}>
        <TableHead sx={{ backgroundColor: '#E7EEF8' }}>
          <TableRow>
            <TableCell>Medicine Name</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Notes</TableCell>
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
                         
                        </TableRow>
                    ))}
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Vital
      </Typography>
      <Table size="small" sx={{ mb: 3, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
        <TableHead sx={{ backgroundColor: '#E7EEF8' }}>
          <TableRow>
            <TableCell>Blood Pressure</TableCell>
            <TableCell>Heart rate</TableCell>
            <TableCell>Pulse</TableCell>
            <TableCell>Stress level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{visitData.vital.bloodPressure}</TableCell>
            <TableCell>{visitData.vital.heartRate}</TableCell>
            <TableCell>{visitData.vital.pulse}</TableCell>
            <TableCell>{visitData.vital.stressLevel}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
    
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Reset
        </Button>
        <Button variant="contained">Save</Button>
      </Box>
      </>
  );
};

export default PreviousVisitTab;

