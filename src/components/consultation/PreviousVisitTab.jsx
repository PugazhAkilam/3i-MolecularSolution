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
import { API_URL } from '../config';

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
                const response = await fetch(`${API_URL}/patient/getMedhistory/${patientData.patientId}`);
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

      <Box sx={{  flexGrow: 1, margin: '30px', border: '1px solid #E5E7EB'}}>
      <Typography variant="h6" gutterBottom sx={{backgroundColor: '#E7EEF8', fontSize: '15px', padding: '5px' }}>
       Visited Date: <b>{visitData.visitedDate}</b>  
      </Typography>

      <Box sx={{ padding: '5px'}}>
         <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Chief Complaint
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, fontWeight: 'bold'}}>
        {visitData.chiefComplaint}
      </Typography>

      <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
        Prescription
      </Typography>
      <Table size="small" sx={{ mb: 3, border: '1px solid #E7EEF8', borderRadius: 1, overflow: 'hidden' }}>
        <TableHead sx={{ backgroundColor: '#E7EEF8' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Medicine Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Dosage</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Frequency</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
                            <TableCell>name</TableCell>
                            <TableCell> dosage</TableCell>
                            <TableCell>23</TableCell>
                            <TableCell>22</TableCell>
                            <TableCell>regular checkup</TableCell>
                         
                        </TableRow>
         {/* {prescriptions.map((med, index) => (
                        <TableRow key={index}>
                            <TableCell>{med.name} name</TableCell>
                            <TableCell>{med.dosage} dosage</TableCell>
                            <TableCell>{med.duration}23</TableCell>
                            <TableCell>{med.frequency}22</TableCell>
                            <TableCell>{med.notes}regular checkup</TableCell>
                         
                        </TableRow>
                    ))} */}
        </TableBody>
      </Table>

      <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
        Vital
      </Typography>
      <Table size="small" sx={{ mb: 3, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
        <TableHead sx={{ backgroundColor: '#E7EEF8' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Blood Pressure</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Heart rate</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Pulse</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Stress level</TableCell>
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
    </Box>   

      <Box sx={{  flexGrow: 1, margin: '30px', border: '1px solid #E5E7EB'}}>
      <Typography variant="h6" gutterBottom sx={{backgroundColor: '#E7EEF8', fontSize: '15px', padding: '5px' }}>
       Visited Date:  <b>{visitData.visitedDate} </b> 
      </Typography>

      <Box sx={{ padding: '5px'}}>
         <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Chief Complaint
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, fontWeight: 'bold'}}>
        {visitData.chiefComplaint}
      </Typography>

      <Typography variant="body2" sx={{ mt: 3, mb: 2 }}>
        Prescription
      </Typography>
      <Table size="small" sx={{ mb: 3, border: '1px solid #E7EEF8', borderRadius: 1, overflow: 'hidden' }}>
        <TableHead sx={{ backgroundColor: '#E7EEF8'}}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} >Medicine Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Dosage</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Duration</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Frequency</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           <TableRow >
                            <TableCell>name</TableCell>
                            <TableCell> dosage</TableCell>
                            <TableCell>23</TableCell>
                            <TableCell>22</TableCell>
                            <TableCell>regular checkup</TableCell>
                         
                        </TableRow>
         {/* {prescriptions.map((med, index) => (
                        <TableRow key={index}>
                            <TableCell>{med.name}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.duration}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                            <TableCell>{med.notes}</TableCell>
                         
                        </TableRow>
                    ))} */}
        </TableBody>
      </Table>

              

      <Typography variant="body2" sx={{ mt: 3, mb: 2 }}>
        Vital
      </Typography>
      <Table size="small" sx={{ mb: 3, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
        <TableHead sx={{ backgroundColor: '#E7EEF8' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Blood Pressure</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Heart rate</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Pulse</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Stress level</TableCell>
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
    </Box>                   
  
    
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Reset
        </Button>
        <Button variant="contained">Save</Button>
      </Box> */}
      </>
  );
};

export default PreviousVisitTab;

