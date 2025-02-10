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
  FaUserClock,
  FaTaxi,
  FaFlag,
} from 'react-icons/fa';
import NavbarSearch from '../Search/navbarSearch';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import {
  adminDashboard,
  adminDashboardWallet,
  adminMenuAdd,
  adminProductAdd,
  // adminProductList,
  adminSubMenuAdd,
  adminBannerAdd,
  // adminBannerList,
  adminAdminAdd,
  adminAdminList,
  adminOrgAdd,
  adminDelivery,
} from '@/@core/utils/type/router';

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
  const [bannerAnchorEl, setBannerAnchorEl] = useState<null | HTMLElement>(null);
  const [deliveryAnchorEl, setDeliveryAnchorEl] = useState<null | HTMLElement>(null);

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
                color: activeItem === 'Анализ' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Анализ' ? 'bold' : 'normal',
              }}
            >
              Анализ
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminDashboardWallet, setMenuAnchorEl, 'Орлого')}
              sx={{
                color: activeItem === 'Орлого' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Орлого' ? 'bold' : 'normal',
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
                color: activeItem === 'Menu нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Menu нэмэх' ? 'bold' : 'normal',
              }}
            >
              Menu нэмэх
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminSubMenuAdd, setTypeAnchorEl, 'Ангилал нэмэх')}
              sx={{
                color: activeItem === 'SubMenu нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'SubMenu нэмэх' ? 'bold' : 'normal',
              }}
            >
              Ангилал нэмэх
            </MenuItem>
            <MenuItem
              onClick={()=> handleNavigation("/admin/sMenu/add", setTypeAnchorEl, 'Дэд ангилал нэмэх')}
              sx={{
                color: activeItem === 'SubMenu нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'SubMenu нэмэх' ? 'bold' : 'normal',
              }}
            >
              Дэд ангилал нэмэх
            
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
                color: activeItem === 'Бүтээгдэхүүн нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Бүтээгдэхүүн нэмэх' ? 'bold' : 'normal',
              }}
            >
              Бүтээгдэхүүн нэмэх
            </MenuItem>
            {/* <MenuItem
              onClick={() => handleNavigation(adminProductList, setProductAnchorEl, 'Бүтээгдэхүүний жагсаалт')}
              sx={{
                color: activeItem === 'Бүтээгдэхүүний жагсаалт' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Бүтээгдэхүүний жагсаалт' ? 'bold' : 'normal',
              }}
            >
              Бүтээгдэхүүний жагсаалт
            </MenuItem> */}
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
              onClick={() => handleNavigation(adminOrgAdd, setOrganizationAnchorEl, 'Байгууллага нэмэх')}
              sx={{
                color: activeItem === 'Байгууллага нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Байгууллага нэмэх' ? 'bold' : 'normal',
              }}
            >
              Байгууллага нэмэх
            </MenuItem>
            {/* <MenuItem
              onClick={() => handleNavigation('/org/list', setOrganizationAnchorEl, 'Байгууллага харах')}
              sx={{
                color: activeItem === 'Байгууллага харах' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Байгууллага харах' ? 'bold' : 'normal',
              }}
            >
              Байгууллага харах
            </MenuItem> */}
          </MenuList>
        </Menu>

        {/* Админ Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaUserClock />}
          onClick={handleMenuOpen(setAdminAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Админ
        </Button>
        <Menu
          anchorEl={adminAnchorEl}
          open={Boolean(adminAnchorEl)}
          onClose={handleMenuClose(setAdminAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: adminAnchorEl ? `${adminAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation(adminAdminAdd, setAdminAnchorEl, 'Админ нэмэх')}
              sx={{
                color: activeItem === 'Админ нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Админ нэмэх' ? 'bold' : 'normal',
              }}
            >
              Админ нэмэх
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigation(adminAdminList, setAdminAnchorEl, 'Админ харах')}
              sx={{
                color: activeItem === 'Админ харах' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Админ харах' ? 'bold' : 'normal',
              }}
            >
              Админ харах
            </MenuItem>
          </MenuList>
        </Menu>

        {/* Banner Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaFlag />}
          onClick={handleMenuOpen(setBannerAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Banner
        </Button>
        <Menu
          anchorEl={bannerAnchorEl}
          open={Boolean(bannerAnchorEl)}
          onClose={handleMenuClose(setBannerAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: bannerAnchorEl ? `${bannerAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation(adminBannerAdd, setBannerAnchorEl, 'Banner нэмэх')}
              sx={{
                color: activeItem === 'Banner нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Banner нэмэх' ? 'bold' : 'normal',
              }}
            >
              Banner нэмэх
            </MenuItem>
            {/* <MenuItem
              onClick={() => handleNavigation(adminBannerList, setBannerAnchorEl, 'Banner харах')}
              sx={{
                color: activeItem === 'Banner харах' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Banner харах' ? 'bold' : 'normal',
              }}
            >
              Banner харах
            </MenuItem> */}
          </MenuList>
        </Menu>

        {/* Хүргэлт Menu */}
        <Button
          color="inherit"
          endIcon={<FaChevronDown />}
          startIcon={<FaTaxi />}
          onClick={handleMenuOpen(setDeliveryAnchorEl)}
          sx={{ color: '#00ffba', textTransform: 'none', mx: 1 }}
        >
          Хүргэлт
        </Button>
        <Menu
          anchorEl={deliveryAnchorEl}
          open={Boolean(deliveryAnchorEl)}
          onClose={handleMenuClose(setDeliveryAnchorEl)}
          sx={{
            '& .MuiPaper-root': {
              bgcolor: '#1a1a1a',
              color: 'white',
              minWidth: deliveryAnchorEl ? `${deliveryAnchorEl.clientWidth}px` : 'auto',
            },
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => handleNavigation(adminDelivery, setDeliveryAnchorEl, 'Хүргэлт нэмэх')}
              sx={{
                color: activeItem === 'Хүргэлт нэмэх' ? '#00ffba' : 'white',
                '&:hover': { bgcolor: '#2d2d2d' },
                fontWeight: activeItem === 'Хүргэлт нэмэх' ? 'bold' : 'normal',
              }}
            >
              Хүргэлт
            </MenuItem>
            <MenuItem
      onClick={() => handleNavigation('/admin/order', setDeliveryAnchorEl, 'Захиалга')}
      sx={{
        color: activeItem === 'Захиалга' ? '#00ffba' : 'white',
        '&:hover': { bgcolor: '#2d2d2d' },
        fontWeight: activeItem === 'Захиалга' ? 'bold' : 'normal',
      }}
    >
      Захиалга
    </MenuItem>
  </MenuList>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
