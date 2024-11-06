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
  FaShoppingBag,
  FaClipboard,
  FaUserAlt,
  FaUserAltSlash,
  FaUserClock,
  FaTaxi,
} from 'react-icons/fa';
import NavbarSearch from '../Search/navbarSearch';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { adminDashboard, adminDashboardWallet, adminMenuAdd, adminMenuList, adminProductAdd, adminProductList, adminSubMenuAdd, adminsubMenuList } from '@/@core/utils/type/router';

const Header = () => {
  const theme = useTheme();
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState<string>(''); // Track the active item
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [typeAnchorEl, setTypeAnchorEl] = useState<null | HTMLElement>(null);
  const [productAnchorEl, setProductAnchorEl] = useState<null | HTMLElement>(null);
  const [organizationAnchorEl, setOrganizationAnchorEl] = useState<null | HTMLElement>(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState<null | HTMLElement>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  const handleMenuOpen = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setter(event.currentTarget);
    };

  const handleMenuClose = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => () => {
    setter(null);
  };

  const handleNavigation = (path: string, setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>, item: string) => {
    router.push(path);
    setActiveItem(item); // Set the active item
    setter(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a1a', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        <Box display="flex" alignItems="center" sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00ffba', mr: 3 }}>
            OR<span style={{ color: theme.palette.primary.main }}>CH</span>ID
          </Typography>
          <NavbarSearch />
        </Box>

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

      <Divider sx={{ bgcolor: '#00ffba', height: '2px' }} />

      <Toolbar sx={{ justifyContent: 'center', bgcolor: '#1a1a1a' }}>
        {/* My Dashboard Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaHome />}
          onClick={handleMenuOpen(setMenuAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          My Dashboard
        </Button>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose(setMenuAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: menuAnchorEl ? `${menuAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation(adminDashboard, setMenuAnchorEl, 'Анализ')}
              sx={{
                color: activeItem === 'Analysis' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Analysis' ? 'bold' : 'normal',
              }}
            >
             Анализ 
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminDashboardWallet, setMenuAnchorEl, 'Орлого')}
              sx={{
                color: activeItem === 'My Wallet' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'My Wallet' ? 'bold' : 'normal',
              }}
            >
              Орлого
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Төрөл Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaStore />}
          onClick={handleMenuOpen(setTypeAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Төрөл
        </Button>
        <Menu
          anchorEl={typeAnchorEl}
          open={Boolean(typeAnchorEl)}
          onClose={handleMenuClose(setTypeAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: typeAnchorEl ? `${typeAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation(adminMenuAdd, setTypeAnchorEl, 'Menu нэмэх')}
              sx={{
                color: activeItem === 'Add Type' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Add Type' ? 'bold' : 'normal',
              }}
            >
              Menu нэмэх
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminMenuList, setTypeAnchorEl, 'Menu харах')}
              sx={{
                color: activeItem === 'List Types' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'List Types' ? 'bold' : 'normal',
              }}
            >
              Menu харах
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminSubMenuAdd, setTypeAnchorEl, 'SubMenu нэмэх')}
              sx={{
                color: activeItem === 'List Types' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'List Types' ? 'bold' : 'normal',
              }}
            >
              SubMenu нэмэх
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminsubMenuList, setTypeAnchorEl, 'SubMenu харах')}
              sx={{
                color: activeItem === 'List Types' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'List Types' ? 'bold' : 'normal',
              }}
            >
              SubMenu харах
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Бүтээгдэхүүн Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaShoppingBag />}
          onClick={handleMenuOpen(setProductAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Бүтээгдэхүүн
        </Button>
        <Menu
          anchorEl={productAnchorEl}
          open={Boolean(productAnchorEl)}
          onClose={handleMenuClose(setProductAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: productAnchorEl ? `${productAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation(adminProductAdd, setProductAnchorEl, 'Бүтээгдэхүүн нэмэх')}
              sx={{
                color: activeItem === 'Add Product' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Add Product' ? 'bold' : 'normal',
              }}
            >
              Бүтээгдэхүүн нэмэх
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminProductList, setProductAnchorEl, 'Бүтээгдэхүүний жагсаалт')}
              sx={{
                color: activeItem === 'List Products' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'List Products' ? 'bold' : 'normal',
              }}
            >
              Бүтээгдэхүүний жагсаалт
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Байгууллага Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaClipboard />}
          onClick={handleMenuOpen(setOrganizationAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Байгууллага
        </Button>
        <Menu
          anchorEl={organizationAnchorEl}
          open={Boolean(organizationAnchorEl)}
          onClose={handleMenuClose(setOrganizationAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: organizationAnchorEl ? `${organizationAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation('/organization/overview', setOrganizationAnchorEl, 'Overview')}
              sx={{
                color: activeItem === 'Overview' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Overview' ? 'bold' : 'normal',
              }}
            >
              Overview
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation('/organization/settings', setOrganizationAnchorEl, 'Settings')}
              sx={{
                color: activeItem === 'Settings' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Settings' ? 'bold' : 'normal',
              }}
            >
              Settings
            </MenuItem>
          </MenuList>

        </Menu>
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaUserClock />}
          onClick={handleMenuOpen(setOrganizationAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Админ
        </Button>
        <Menu
          anchorEl={organizationAnchorEl}
          open={Boolean(organizationAnchorEl)}
          onClose={handleMenuClose(setOrganizationAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: organizationAnchorEl ? `${organizationAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation('/organization/overview', setOrganizationAnchorEl, 'Overview')}
              sx={{
                color: activeItem === 'Overview' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Overview' ? 'bold' : 'normal',
              }}
            >
              Overview
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation('/organization/settings', setOrganizationAnchorEl, 'Settings')}
              sx={{
                color: activeItem === 'Settings' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Settings' ? 'bold' : 'normal',
              }}
            >
              Settings
            </MenuItem>
          </MenuList>

        </Menu>

        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaTaxi />}
          onClick={handleMenuOpen(setOrganizationAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
         Хүргэлт 
        </Button>
        <Menu
          anchorEl={organizationAnchorEl}
          open={Boolean(organizationAnchorEl)}
          onClose={handleMenuClose(setOrganizationAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: organizationAnchorEl ? `${organizationAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation('/organization/overview', setOrganizationAnchorEl, 'Overview')}
              sx={{
                color: activeItem === 'Overview' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Overview' ? 'bold' : 'normal',
              }}
            >
              Overview
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation('/organization/settings', setOrganizationAnchorEl, 'Settings')}
              sx={{
                color: activeItem === 'Settings' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Settings' ? 'bold' : 'normal',
              }}
            >
              Settings
            </MenuItem>
          </MenuList>

        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
