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
import { formatDate } from '../../utils/formatDate';
import { getMedicalHistory } from '../../service/patientService';

const PreviousVisitTab = ({patientData}) => {
  // const visitData = {
  //   visitedDate: '02-Feb-2025',
  //   chiefComplaint: 'Cold and Cough for past 3 days',
  //   prescription: [
  //     { name: 'Paracetamol', dosage: '500mg', duration: '3 days', frequency: 'TDS', notes: 'After meals' },
  //     { name: 'Cough Syrup', dosage: '10ml', duration: '5 days', frequency: 'BD', notes: 'As needed' },
  //   ],
  //   vital: {
  //     bloodPressure: '120/80',
  //     heartRate: '75 bpm',
  //     pulse: '72 bpm',
  //     stressLevel: 'Low',
  //   },
  // };
     console.log("paditendata",patientData);
       const[loading,setLoading]=useState(true)
      const [prescriptions, setPrescriptions] = useState([]);
        const [error, setError] = useState(null);
  useEffect(() => {
        const fetchMedicalHistory = async () => {
            if (!patientData ) {
              console.log("efrwe");
              
                setLoading(false);
                return;
            }
             try {
                          const result = await getMedicalHistory(patientData.patientId);
                            // if (!response.ok) {
                            //     throw new Error('Failed to fetch medical history');
                            // }
                              if (result.success) {
                            const data = result.data;
                         
                            setPrescriptions(data.prescriptions || []);
                        } else {
                            throw new Error(result.error);
                        }

            } catch (err) {
                console.error('Error fetching medical history:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicalHistory();
    }, []);

    console.log("prescription", prescriptions);
    
  return (
    <>
  {prescriptions && prescriptions.map((data) => (
    <Box sx={{  flexGrow: 1, margin: '30px', border: '1px solid #E5E7EB'}}>
      <Typography variant="h6" gutterBottom sx={{backgroundColor: '#E7EEF8', fontSize: '15px', padding: '5px' }}>
       Visited Date: <b>{formatDate(data.updateDate)}</b>  
      </Typography>

      <Box sx={{ padding: '5px'}}>
         <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
          {data.ChiefComplaint}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, fontWeight: 'bold'}}>
        {data.SummaryNote}
      </Typography>

      <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
        Prescription
      </Typography>
<Table
  size="small"
  sx={{
    mb: 3,
    border: '1px solid #E7EEF8',
    borderRadius: 1,
    borderCollapse: 'separate',
    borderSpacing: 0,
  }}

>
  <TableHead sx={{ backgroundColor: '#E7EEF8' }}>
    <TableRow>
      <TableCell sx={{ fontWeight: 'bold' }}>Medicine Name</TableCell>
      <TableCell sx={{ fontWeight: 'bold' }}>Dosage</TableCell>
      <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
      <TableCell sx={{ fontWeight: 'bold' }}>Frequency</TableCell>
      <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.Prescription && data.Prescription.length > 0 ? (
      data.Prescription.map((med, index) => (
<TableRow
          key={index}
          sx={{
            '& td': {
              borderBottom: 'none', // remove bottom border from all cells
            },
          }}
        >          <TableCell>{med.MedicineName}</TableCell>
          <TableCell>{med.Dosage}</TableCell>
          <TableCell>{med.Duration}</TableCell>
          <TableCell>{med.Frequency}</TableCell>
          <TableCell>{med.Notes}</TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={5} align="center">
          Data not inserted
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>


      <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
        Vital
      </Typography>
      <Table size="small"  sx={{
    mb: 3,
    border: '1px solid #E7EEF8',
    borderRadius: 1,
    borderCollapse: 'separate',
    borderSpacing: 0,
  }}>
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
            <TableCell>{data.bloodPressure ? data.bloodPressure : '-'}</TableCell>
            <TableCell>{data.heartRate ? data.heartRate : '-'}</TableCell>
            <TableCell>{data.pulse ? data.pulse : '-'}</TableCell>
            <TableCell>{data.stressLevel ? data.stressLevel : '-'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </Box>
    </Box>  
  ))}
       

               
  
    
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

