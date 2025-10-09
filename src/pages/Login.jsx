import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { API_URL } from '../components/config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate=useNavigate()
    const { login } = useAuth(); 
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const [ userData, setUserData] = useState( {
    userName: "",
    password: ""
  } ); 

const handleChange = (e) => {
  const { name, value } = e.target;
  setUserData((prev) => ({...prev, [name]: value}));
}

const handleSubmit = async () => {
    try {
      const result = await login(userData);
      
      if (result.success) {
        navigate('/admin', { replace: true });
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Error occurred. Please try again');
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);



  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f7f7fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: 4,
          overflow: 'visible',
          p: 2,
          background: 'linear-gradient(180deg, #2563eb 0%, #d97706 100%)',
          boxShadow: 3,
          maxWidth: 900,
          width: '100%',
        }}
      >
        {/* Left illustration container - hidden on xs screen */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', sm: 'flex' }, // hide on xs, show from sm up
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            minHeight: 220,
            minWidth: 320,
          }}
        >
          {/* Put your image or SVG here */}
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/hospital-illustration-svg-png-download-10845694.png"
            alt="Medical Illustration"
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
        </Box>

        {/* Right form card - always visible */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            background: '#fff',
            borderRadius: 3,
            boxShadow: '0px 4px 24px rgba(0,0,0,0.05)',
            p: { xs: 3, sm: 5 },
            minWidth: { sm: 380 },
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign={{ xs: 'center', sm: 'left' }}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }} textAlign={{ xs: 'center', sm: 'left' }}>
            To Velora
          </Typography>
          <form>
            <TextField
              label="Name"
              placeholder="User Name"
              fullWidth
              margin="normal"
              required
              variant="outlined"
              size="small"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              placeholder="Enter Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              size="small"
              name="password"
              value={userData.password}
              onChange={ handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Keep me signed in"
              sx={{ mt: 1 }}
            />
            <Button fullWidth onClick={ handleSubmit } variant="contained" color="primary" sx={{ mt: 2, mb: 1 }}>
              Login
            </Button>
            <Box textAlign="center">
              <Link href="./forgotpassword" variant="body2" underline="hover">
                Forgot your password?
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;