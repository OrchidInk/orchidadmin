import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Divider,
} from '@mui/material';
import {
  FaBell,
  FaCog,
  FaMoon,
  FaSun,
  FaHome,
  FaChevronDown,
  FaStore,
  FaCar,
  FaUserAlt,
  FaShieldAlt,
  FaClipboard,
} from 'react-icons/fa';
import { FiberManualRecord } from '@mui/icons-material';
import NavbarSearch from '../Search/navbarSearch'; // Assuming NavbarSearch is in this path
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const Header = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useTheme();
  const router = useRouter()

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    router.push(path)
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a1a', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        {/* Left: Logo and Search */}
        <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00ffba', mr: 3 }}>
            OR<span style={{ color: theme.palette.primary.main }}>CH</span>ID
          </Typography>
          <NavbarSearch />
        </Box>

        {/* Right: Icons */}
        <Box display="flex" alignItems="center">
          <IconButton color="inherit">
            <FaBell style={{ color: '#00ffba' }} />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <FaSun style={{ color: '#00ffba' }} /> : <FaMoon style={{ color: '#00ffba' }} />}
          </IconButton>
          <IconButton color="inherit">
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>C</Avatar>
          </IconButton>
          <IconButton color="inherit">
            <FaCog style={{ color: '#00ffba' }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Green Divider */}
      <Divider sx={{ bgcolor: '#00ffba', height: '2px' }} />

      {/* Navigation Menus */}
      <Toolbar sx={{ justifyContent: 'center', bgcolor: '#1a1a1a' }}>
        {/* Dashboard Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaHome />}
          onClick={handleMenuOpen}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          My Dashboard
        </Button>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: menuAnchorEl ? `${menuAnchorEl.clientWidth}px` : 'auto', // Match the width of the button
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation('/admin/dashboard')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#00ffba',
                '&:hover': {
                  bgcolor: '#2d2d2d',
                },
              }}
            >
              <FiberManualRecord sx={{ fontSize: 8, color: '#00ffba', mr: 1 }} />
              Analysis
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation('/dashboard/wallet')}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: '#2d2d2d',
                },
              }}
            >
              My wallet
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation('/dashboard/iot')}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: '#2d2d2d',
                },
              }}
            >
              IOT
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Add more menus similarly */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaStore />}
          onClick={handleMenuOpen}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Төрөл
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
