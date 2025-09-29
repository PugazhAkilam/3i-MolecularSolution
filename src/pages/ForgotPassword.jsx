import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from "../components/config";
function ForgotPasswordAndReset() {
  const [page, setPage] = useState("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    // Check for a token in the URL query parameters
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setPage("reset");
    }
  }, [location.search]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setLinkSent(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert("Error sending request.");
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
      alert("Password must have at least 8 chars, 1 capital, 1 number, 1 special char.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      if (response.ok) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert("Error resetting password.");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f3f4f6",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        {page === "email" ? (
          <Paper elevation={6} sx={{ border: "4px solid #2563eb", borderBottomColor: "#d97706", borderRadius: 2, p: 4 }}>
            <Box textAlign="center" mb={2}>
              <Typography variant="h4" fontWeight="bold" color="grey.800" mb={1}>
                Forgot Password
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Enter your email and we’ll send you a link to reset your password.
              </Typography>
            </Box>
            <form onSubmit={handleSendRequest}>
              <TextField
                fullWidth
                margin="normal"
                id="email"
                label="Email ID"
                type="email"
                variant="outlined"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {linkSent && <Alert severity="success" sx={{ mt: 2 }}>Reset link sent to your email!</Alert>}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Send Request
                </Button>
                <Link to="/login" variant="body2" fontWeight="bold">
                  Return to login
                </Link>
              </Box>
            </form>
          </Paper>
        ) : (
          <Box className="bg-gradient shadow-lg" sx={{ background: "linear-gradient(to bottom right, #0d6efd, #ffffff, #ffbe0b)", p: 3, borderRadius: 3, boxShadow: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  Create a new password
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Please choose a new password with a minimum of 8 characters.<br />
                  (Must include 1 capital, 1 special character, and 1 number)
                </Typography>
              </Box>
              <form onSubmit={handleResetPassword}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(v => !v)} edge="end">
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(v => !v)} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, fontWeight: "bold" }}
                >
                  Reset Password
                </Button>
                <Box textAlign="center" pt={2}>
                  <Link to="/login" variant="body2">
                    Return to Login
                  </Link>
                </Box>
              </form>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ForgotPasswordAndReset;