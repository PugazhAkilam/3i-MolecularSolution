import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Collapse } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMenuItems } from './MenuItems';
import { useState } from 'react';
import  logo from '../../assets/logo2.png';
import Swal from 'sweetalert2';
import { API_URL } from '../config';


const SideDrawer = ({ isDarkMode, isMobile, setMobileOpen,user,loading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = getMenuItems(user,loading);
  const [openSubMenu, setOpenSubMenu] = useState('');

  const handleMenuClick = (item) => {
    if (item.subMenu) {
      setOpenSubMenu(openSubMenu === item.text ? '' : item.text);
    } else {
      navigate(item.path);
      if (isMobile) setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out of your account!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
      });
  
      if (result.isConfirmed) {
        // try {
        //   await fetch(`${API_URL}/auth/logout`, {
        //     method: 'POST',
        //     credentials: 'include'
        //   });
        //   Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
        //   navigate('/login');
        // } catch (err) {
        //   console.error('Logout error:', err);
        //   Swal.fire('Error!', 'Failed to logout. Please try again.', 'error');
        // }       
         localStorage.removeItem("userData");
         navigate('/login');
      }
    };
  return (
    <Box sx={{       backgroundColor:"#F8F9FE",backdropFilter: 'blur(10px)'}} >
     
      <List sx={{ p: 0, m: 0, display: 'flex', flexDirection: 'column', height: '100%' ,}}>
        <Box sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <>
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleMenuClick(item)}
                  selected={location.pathname === item.path}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgb(11,58,132)',
                      color: '#fff',
                      '& .MuiListItemIcon-root': {
                        color: '#fff',
                      },
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgb(11,58,132)',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.subMenu && (openSubMenu === item.text ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.subMenu && (
                <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem) => (
                      <ListItemButton
                        key={subItem.text}
                        sx={{ pl: 4 }}
                        onClick={() => {
                          navigate(subItem.path);
                          if (isMobile) setMobileOpen(false);
                        }}
                        selected={location.pathname === subItem.path}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </>
          ))}
        </Box>

        <Divider />

        <Box sx={{mt:2}}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: '#ff5252',
                  color: '#fff',
                  '& .MuiListItemIcon-root': {
                    color: '#fff',
                  
                  },
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </List>
    </Box>
  );
};

export default SideDrawer;