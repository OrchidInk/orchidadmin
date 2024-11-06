import React from 'react';
import { Menu, MenuItem, Button, Box } from '@mui/material';
import { useState } from 'react';

interface NavbarMenuProps {
  title: string;
  items: { label: string, onClick: () => void }[];
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ color: '#00ffba', textTransform: 'none' }}
      >
        {title}
      </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiPaper-root': {
            bgcolor: '#1a1a1a',
            color: 'white',
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
              handleMenuClose();
            }}
            sx={{
              '&:hover': {
                bgcolor: '#2d2d2d',
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NavbarMenu;
