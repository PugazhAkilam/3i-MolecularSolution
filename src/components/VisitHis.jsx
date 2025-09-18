import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,  IconButton,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import { RiCloseCircleFill } from "react-icons/ri";
import { FaCalendarPlus } from "react-icons/fa";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
//import api from "../api"; // import your configured axios instance
import { getRegisteredPatients } from '../service/patientService'; // adjust path as needed
import { formatDate } from '../utils/formatDate';
const DOCTORS = ["Dr. Meera", "Dr. Ram", "Dr. Vikram"];

export default function VisitorHistory() {
  const [patientRows, setPatientRows] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // Fetch data from API when component mounts
  
    useEffect(() => {
      const fetchRegisteredPatients = async () => {
        try {
          const data = await getRegisteredPatients();
          setPatientRows(data.data);
        } catch (err) {
          console.log('error', err);
        }
      };
      fetchRegisteredPatients();
    }, []);
  

  // Filter rows based on search, doctor, and date
  const filteredRows = patientRows.filter((row) => {
    const matchesSearch =
      !search ||
      row.name?.toLowerCase().includes(search.toLowerCase()) ||
      row.mobile?.includes(search);
    const matchesDoctor = !selectedDoctor || row.doctor === selectedDoctor;
    const matchesDate = !selectedDate || row.date === selectedDate;
    return matchesSearch && matchesDoctor && matchesDate;
  });

  return (
    <Box sx={{ bgcolor: "#f7fafd", minHeight: "100vh", py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Visitor History
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Patients List
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
        mb={1.5}
      >
        <TextField
          size="small"
          placeholder="Search by name or mobile number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: 330 } }}
        />

        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#d1d5db",
              borderRadius: 2,
              textTransform: "none",
              color: "text.primary",
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              width: { xs: "100%", sm: "auto" },
            }}
            startIcon={<CalendarTodayIcon sx={{ color: "text.secondary" }} />}
            endIcon={<ArrowDropDownIcon sx={{ color: "text.secondary" }} />}
          >
            Select Date
          </Button>
          <Select
            size="small"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            displayEmpty
            sx={{
              minWidth: 110,
              borderRadius: 2,
              bgcolor: "#fff",
              borderColor: "#eee",
              color: "#222",
              ".MuiSelect-icon": { color: "#888" },
            }}
            IconComponent={ArrowDropDownIcon}
            renderValue={(selected) => (selected ? selected : "Doctor")}
          >
            <MenuItem value="">Doctor</MenuItem>
            {DOCTORS.map((doc) => (
              <MenuItem value={doc} key={doc}>
                {doc}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#cfe0faff" }}>
              <TableCell sx={{ fontWeight: 600 }}>Reg ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Visited Doctor</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Visited Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row,i) => (
               <TableRow key={i}>
                               <TableCell>
                                 <Link  color="primary" fontWeight={600} onClick={() => navigate(`/admin/VisitPatientId`)}>
                                   {row.reg_patientId}
                                 </Link>
                               </TableCell>
                               <TableCell>{row.firstName} {row.lastName}</TableCell>
                               <TableCell>{row.mobile}</TableCell>
                               <TableCell>{row.age}</TableCell>
                               <TableCell>{row.doctor}</TableCell>
                               <TableCell>{formatDate(row.date)}</TableCell>
                               {/* <TableCell>
                                 <IconButton color="primary" onClick={() => navigate('/admin/appointment-step1')}><EditIcon /></IconButton>
                                 <IconButton color="primary" onClick={() => navigate('/admin/appointment-step1')}><FaCalendarPlus size={20} /></IconButton>
                                 <IconButton color="primary"><RiCloseCircleFill /></IconButton>
                               </TableCell> */}
                             </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontSize={14}
        color="text.secondary"
      >
        <span>Showing {filteredRows.length} patients</span>
        <Box>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2,
              minWidth: 80,
              mr: 1,
              px: 2,
              textTransform: "none",
            }}
          >
            &lt; Prev
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2,
              minWidth: 80,
              px: 2,
              textTransform: "none",
            }}
          >
            Next &gt;
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
