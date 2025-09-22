import React, { useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton } from '@mui/material';
import { RiCloseCircleFill } from "react-icons/ri";

const VisitHistoryTable = ({ regId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchVisitHistory() {
      try {
        const res = await fetch(`http://localhost:8000/api/selectedPatient/${regId}`);
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.log("Failed to fetch visit history:", err);
      }
    }
    if (regId) {
      fetchVisitHistory();
    }
  }, [regId]);

  return (
    <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Visited Date</TableCell>
            <TableCell>Respiratory Rate</TableCell>
            <TableCell>BP Reading</TableCell>
            <TableCell>Pulse</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row._id || row.date}>
              <TableCell>
                {row.date ? new Date(row.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }) : null}
              </TableCell>
              <TableCell>{row.respiratoryRate}</TableCell>
              <TableCell>{row.bloodPressure}</TableCell>
              <TableCell>{row.pulse}</TableCell>
              <TableCell>Regular Checkup</TableCell>
              <TableCell>
                <Tooltip title="Delete">
                  <IconButton color="primary">
                    <RiCloseCircleFill />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitHistoryTable;
