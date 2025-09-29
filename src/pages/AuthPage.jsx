import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router-dom';

// Add this import
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { API_URL } from '../components/config';

const AuthPage = () => {

  console.log("api",API_URL);
  
  // Add this line
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('password'); // 'otp' or 'password'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: null,
    mobile: '',
    password: '',
    confirmPassword: '',
    otp: ['', '', '', '', '', '']
  });
  const [showOTP, setShowOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOTPChange = (index, value) => {
    const newOTP = [...formData.otp];
    newOTP[index] = value;
    setFormData(prev => ({
      ...prev,
      otp: newOTP
    }));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAuthenticate = async () => {
    try {
      if (isLogin) {
        if (authMethod === 'otp') {
          // Call API to send OTP
          const response = await fetch(`${API_URL}/auth/send-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
            credentials: 'include'
          });
          
          const data = await response.json();
          
          if (data.success) {
            setShowOTP(true);
            toast.success('OTP sent to your email');
          } else {
            toast.error(data.message || 'Failed to send OTP');
          }
        } else {
          // Handle password login
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            }),
            credentials: 'include'
          });
          
          const data = await response.json();
          
          if (data.success) {
            login(data.user);
            
            // Redirect based on user type
            if (data.user.userType === 1) {
              navigate('/superadmin');
            } else if (data.user.userType === 2) {
              navigate('/admin');
            } else if (data.user.userType === 3) {
              navigate('/anchor');
            } else {
              navigate('/401');
            }
            
            toast.success('Login successful!');
          } else {
            toast.error(data.message || 'Login failed');
          }
        }
      } else {
        // Validate password match for registration
        if (authMethod === 'password' && formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        
        // Call API to register user
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            dob: formData.dob,
            mobile: formData.mobile,
            password: authMethod === 'password' ? formData.password : undefined
          }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (authMethod === 'otp') {
            setShowOTP(true);
            toast.success('Registration successful! OTP sent to your email');
          } else {
            toast.success('Registration successful! Please login');
            setIsLogin(true);
          }
        } else {
          toast.error(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      toast.error('An error occurred during authentication');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (authMethod === 'password') {
      handleAuthenticate();
      return;
    }
    
    try {
      // Call API to verify OTP
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp.join('')
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        login(data.user);
        
        // Redirect based on user type
        if (data.user.userType === 1) {
          navigate('/superadmin');
        } else if (data.user.userType === 2) {
          navigate('/admin');
        } else if (data.user.userType === 3) {
          navigate('/anchor');
        } else {
          navigate('/401');
        }
        
        toast.success('Login successful!');
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    }
  };
  return (
    
    <Box sx={{
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
    }}>
      <Box sx={{
        width: '100%',
        p: 4,
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        boxShadow: 5,
        gap: 4,
        display: 'flex',
        maxWidth: 1200,
      }}>
        <Box sx={{ flex: 1, maxWidth: 500 }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' ,textAlign:"center"}}>
         Zeal Travels
          </Typography>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            {isLogin ? 'Login' : 'Sign up'}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Button 
              variant={authMethod === 'otp' ? "contained" : "outlined"}
              onClick={() => setAuthMethod('otp')}
              sx={{ mr: 1 }}
            >
              OTP Login
            </Button>
            <Button 
              variant={authMethod === 'password' ? "contained" : "outlined"}
              onClick={() => setAuthMethod('password')}
            >
              Password Login
            </Button>
          </Box>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                />
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(newValue) => setFormData(prev => ({ ...prev, dob: newValue }))}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                      }
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  margin="normal"
                />
              </>
            )}
            
            <TextField
              fullWidth
              label="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                readOnly: showOTP
              }}
            />

            {authMethod === 'password' && (
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            )}

            {!isLogin && authMethod === 'password' && (
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            )}

            {authMethod === 'otp' && !showOTP ? (
              <Button
                variant="contained"
                fullWidth
                onClick={handleAuthenticate}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#90caf9',
                  '&:hover': { bgcolor: '#42a5f5' },
                  height: '48px',
                  borderRadius: '8px'
                }}
              >
              {isLogin ? 'Send OTP' : 'Register'}
              </Button>
            ) : authMethod === 'password' ? (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#90caf9',
                  '&:hover': { bgcolor: '#42a5f5' },
                  height: '48px',
                  borderRadius: '8px'
                }}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            ) : showOTP && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Enter OTP sent to your email
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3 }}>
                  {formData.otp.map((digit, index) => (
                    <TextField
                      key={index}
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      sx={{
                        width: '40px',
                        '& input': { textAlign: 'center', padding: '8px' }
                      }}
                      inputProps={{
                        maxLength: 1,
                        style: { fontSize: '1.2rem' }
                      }}
                    />
                  ))}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#90caf9',
                    '&:hover': { bgcolor: '#42a5f5' },
                    height: '48px',
                    borderRadius: '8px'
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
            
            {/* <Typography sx={{mt:2}} >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                  setShowOTP(false);
                  setFormData(prev => ({
                    ...prev,
                    name: '',
                    email: '',
                    dob: null,
                    mobile: '',
                    otp: ['', '', '', '', '', '']
                  }));
                }} 
                sx={{ color: '#90caf9', ml: 1 }}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </Link>
            </Typography> */}
          </form>
        </Box>
     
        <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://img.freepik.com/free-vector/flat-safer-internet-day-illustration_23-2151164065.jpg?uid=R113678162&ga=GA1.1.1558421036.1729161363&semt=ais_hybrid&w=740"
            alt="Sign up illustration"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>
      </Box>  
    </Box>
  );
};

export default AuthPage;