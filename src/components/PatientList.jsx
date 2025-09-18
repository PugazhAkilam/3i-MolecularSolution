import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const dummyData = [
  {
    id: "P001",
    name: "Sarah Johnson",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    age: 28,
    lastVisit: "2024-01-15",
    bp: "120/80",
    bmi: 22.5,
  },
  {
    id: "P002",
    name: "Michael Brown",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    age: 45,
    lastVisit: "2024-01-14",
    bp: "130/85",
    bmi: 25.8,
  },
  {
    id: "P003",
    name: "Emily Davis",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    age: 32,
    lastVisit: "2024-01-13",
    bp: "118/75",
    bmi: 21.2,
  },
  {
    id: "P004",
    name: "David Wilson",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    age: 52,
    lastVisit: "2024-01-12",
    bp: "125/82",
    bmi: 24.3,
  },
  {
    id: "P005",
    name: "Lisa Anderson",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
    age: 39,
    lastVisit: "2024-01-11",
    bp: "115/78",
    bmi: 20.8,
  },
];

export default function PatientsList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("Date Added");

  return (
    <Box sx={{ bgcolor: "#fbfcfd", minHeight: "100vh", py: 4, px: { xs: 1, md: 4 } }}>
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          p: { xs: 1, md: 3 },
          borderRadius: 3,
          bgcolor: "#fff",
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Patients List
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          mb={2}
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
            sx={{ width: { xs: "100%", sm: 300 } }}
          />

          <Box display="flex" alignItems="center" gap={1}>
            <Button
              startIcon={<CalendarTodayIcon />}
              endIcon={<ArrowDropDownIcon />}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 2,
                minWidth: 130,
                bgcolor: "#fff",
                borderColor: "#eee",
                color: "#222",
                textTransform: "none",
              }}
            >
              {sort}
            </Button>
            <Select
              size="small"
              value={status}
              displayEmpty
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                minWidth: 100,
                borderRadius: 2,
                bgcolor: "#fff",
                borderColor: "#eee",
                color: "#222",
                ".MuiSelect-icon": { color: "#888" },
              }}
              IconComponent={ArrowDropDownIcon}
              renderValue={(selected) => (selected ? selected : "Status")}
            >
              <MenuItem value="">Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Patient ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Photo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Last Visit</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>BP</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>BMI</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Avatar src={row.photo} sx={{ width: 32, height: 32 }} />
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="500">{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.lastVisit}</TableCell>
                  <TableCell>{row.bp}</TableCell>
                  <TableCell>{row.bmi}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" color="success">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
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
        >
          <Typography variant="body2" color="text.secondary">
            Showing 1 to 5 of 2,547 patients
          </Typography>
          <Box>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2, minWidth: 64, mr: 1 }}
            >
              &lt; Prev
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2, minWidth: 64 }}
            >
              Next &gt;
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
