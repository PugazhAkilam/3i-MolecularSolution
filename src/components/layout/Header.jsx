import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo2.png"


const Header = ({ handleDrawerToggle, isDarkMode, toggleTheme, drawerWidth,user,loading }) => {
  const navigate = useNavigate();
 const location=useLocation();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar>
        <IconButton
          color="primary"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, whiteSpace: 'nowrap' }}>
  <Box
    component="img"
    src={logo}
    alt="Logo"
    sx={{ height: 62, width: 62, mr: 1 }}
  />
  <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'black' }}>
    3i Molecular Solution
  </Typography>
</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleTheme}
            size={30}
            sunColor="orange"
            moonColor="#42a5f5"
          /> */}
          <IconButton color="graytext">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32 }} onClick={() => navigate('/admin/profile')}>
              A
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
