import React from 'react';
import { Box, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from '../components/layout/Header';
import SideDrawer from '../components/layout/Drawer';
import useLayout from '../hooks/useLayout';

const drawerWidth = 240;
 const headerHeight = 64;
const AdminLayout = () => {
  const {
    mobileOpen,
    setMobileOpen,
    isDarkMode,
    toggleTheme,
    isMobile,
    handleDrawerToggle,
    handleLogout,
    openSubMenu,
    handleSubMenuToggle,
    user,
    loading
  } = useLayout();

  return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FE' }}>
      {/* Fixed full-width header */}
      <Header
        sx={{ width: '100%', position: 'fixed', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Spacer box to offset content below fixed header */}
      <Box sx={{ height: `${headerHeight}px`, width: '100%' }} />

      <Box sx={{ display: 'flex', minHeight: `calc(100vh - ${headerHeight}px)` }}>
        {/* Mobile temporary drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: `${headerHeight}px`,
                height: `calc(100% - ${headerHeight}px)`,
              },
            }}
          >
            <SideDrawer />
          </Drawer>
        )}

        {/* Desktop permanent drawer */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            open
            sx={{
            
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: `${headerHeight}px`,
                height: `calc(100% - ${headerHeight}px)`,
                borderRight: '1px solid #eee',
                backgroundColor:"#F8F9FE",
                mt:0.07
              },
            }}
          >
            <SideDrawer />
          </Drawer>
        )}

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // border: '1px solid #e71212ff',
            p: 3,
            mt:0,
            // bgcolor: 'CBCBCB',
            minHeight: `calc(100vh - ${headerHeight}px)`,
            ml: { sm: `${drawerWidth}px` }, // offset for permanent drawer on desktop, none on mobile
            width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
