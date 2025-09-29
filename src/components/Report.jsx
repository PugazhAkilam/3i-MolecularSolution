import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
  IconButton
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const sidebarLinks = [
  { label: "Dashboard", icon: <HomeIcon /> },
  { label: "Visitors", icon: <PeopleIcon /> },
  { label: "Reports", active: true, icon: <FolderIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
  { label: "Help", icon: <HelpOutlineIcon /> },
  { label: "Logout", icon: <ArrowBackIosNewIcon /> },
];

const summary = [
  { title: "Total Visitors", value: "245" },
  { title: "Average Wait Time", value: "15 minutes" },
  { title: "Peak Visit Time", value: "10:00 AM - 12:00 PM" },
];

const days = ["S", "M", "T", "W", "T", "F", "S"];

function CalendarGrid({ month, activeDays, arrow, align }) {
  return (
    <Paper elevation={0} sx={{ minWidth: 300, flex: 1, p: 1, bgcolor: "background.paper" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {align === "left" && (
          <IconButton>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        )}
        <Typography fontWeight={700} align="center">
          {month}
        </Typography>
        {align === "right" && (
          <IconButton>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
      <Grid container>
        {days.map((d, idx) => (
          <Grid item xs={1.71} key={d}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 13,
                color: "#0d171b",
                pb: 0.5,
              }}>
              {d}
            </Typography>
          </Grid>
        ))}
        {Array(30)
          .fill(null)
          .map((_, i) => (
            <Grid item xs={1.71} key={i} sx={{ pb: 0.5 }}>
              <Button
                variant={activeDays.includes(i + 1) ? "contained" : "text"}
                sx={{
                  minWidth: 0,
                  width: "100%",
                  height: 48,
                  bgcolor: activeDays.includes(i + 1) ? "#1193d4" : "#e7eff3",
                  color: activeDays.includes(i + 1) ? "#fff" : "#0d171b",
                  borderRadius: "50%",
                  fontWeight: "600",
                  fontSize: 14,
                }}>
                {i + 1} 
              </Button>
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
}

export default function ReportsPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <Container maxWidth={false} sx={{ display: "flex", pt: 5 }}>
        {/* Sidebar */}
       

        {/* Main Content */}
        <Box
          sx={{
            maxWidth: 960,
            flex: 1,
            mx: "auto",
            bgcolor: "#fff",
            borderRadius: 3,
            p: 3,
            minWidth: 400,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", mb: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight={700} color="#0d171b" fontSize={32} mb={1}>
                Reports
              </Typography>
              <Typography color="#4c809a" fontSize={14} mb={2}>
                Generate and export reports on visitor activity.
              </Typography>
            </Box>
          </Box>
          <Typography fontWeight={700} color="#0d171b" fontSize={18} px={2} pb={1} pt={3}>
            Report Filters
          </Typography>
          {/* Filters */}
          <Box sx={{ display: "flex", gap: 4, px: 2, py: 1, maxWidth: 500 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#0d171b" }}>Doctor</InputLabel>
              <Select sx={{ bgcolor: "#f8fafc", borderRadius: 2 }} label="Doctor" defaultValue="">
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="two">two</MenuItem>
                <MenuItem value="three">three</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "#0d171b" }}>Purpose of Visit</InputLabel>
              <Select sx={{ bgcolor: "#f8fafc", borderRadius: 2 }} label="Purpose of Visit" defaultValue="">
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="two">two</MenuItem>
                <MenuItem value="three">three</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Calendar */}
          <Box sx={{ display: "flex", gap: 6, flexWrap: "wrap", py: 4 }}>
            <CalendarGrid month="July 2024" activeDays={[5]} align="left" />
            <CalendarGrid month="August 2024" activeDays={[7]} align="right" />
          </Box>
          {/* Actions */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Button
              variant="contained"
              sx={{
                minWidth: 84,
                maxWidth: 480,
                borderRadius: 2,
                height: 40,
                px: 4,
                bgcolor: "#1193d4",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
              }}>
              Generate Report
            </Button>
          </Box>
          <Typography fontWeight={700} color="#0d171b" fontSize={18} px={2} pb={1} pt={3}>
            Report Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", p: 2 }}>
            {summary.map((item) => (
              <Card
                key={item.title}
                variant="outlined"
                sx={{
                  minWidth: 158,
                  flex: 1,
                  borderRadius: 2,
                  borderColor: "#cfdfe7",
                  boxShadow: "none",
                }}>
                <CardContent>
                  <Typography color="#0d171b" fontWeight={500} fontSize={16} mb={1}>
                    {item.title}
                  </Typography>
                  <Typography color="#0d171b" fontWeight={700} fontSize={24}>
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          {/* Visitor Count by Day and Avg Wait Time Chart */}
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", px: 2, py: 6 }}>
            {/* Visitor Count by Day */}
            <Box sx={{ minWidth: 250, flex: 1, bgcolor: "#fff", borderRadius: 2 }}>
              <Typography color="#0d171b" fontWeight={500} fontSize={16} mb={1}>
                Visitor Count by Day
              </Typography>
              <Grid container spacing={2} alignItems="flex-end" sx={{ minHeight: 100 }}>
                {[
                  { day: "Mon", height: "50%" },
                  { day: "Tue", height: "80%" },
                  { day: "Wed", height: "30%" },
                  { day: "Thu", height: "30%" },
                  { day: "Fri", height: "100%" },
                  { day: "Sat", height: "20%" },
                  { day: "Sun", height: "80%" },
                ].map(({ day, height }) => (
                  <Grid item xs key={day}>
                    <Box
                      sx={{
                        width: "100%",
                        bgcolor: "#e7eff3",
                        borderTop: "2px solid #4c809a",
                        height,
                        mb: 1,
                        borderRadius: 1,
                      }}
                    />
                    <Typography color="#4c809a" fontWeight={700} fontSize={13} align="center">
                      {day}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {/* Average Wait Time by Hour */}
            <Box sx={{ minWidth: 250, flex: 1 }}>
              <Typography color="#0d171b" fontWeight={500} fontSize={16} mb={1}>
                Average Wait Time by Hour
              </Typography>
              <Box sx={{ py: 2 }}>
                {/* Static SVG preserved from original; can be replaced with MUI charts */}
                <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path
                    d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                    fill="url(#paint0_linear_1131_5935)"
                  />
                  <path
                    d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                    stroke="#4c809a"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#e7eff3"></stop>
                      <stop offset="1" stopColor="#e7eff3" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  {["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"].map((hr) => (
                    <Typography color="#4c809a" fontWeight={700} fontSize={13}>
                      {hr}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Export Button */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Button
              variant="contained"
              sx={{
                minWidth: 84,
                maxWidth: 480,
                borderRadius: 2,
                height: 40,
                px: 4,
                bgcolor: "#e7eff3",
                color: "#0d171b",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
              }}>
              Export Report
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
