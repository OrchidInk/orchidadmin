import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';

const recentSearches = ['HRMS Admin', 'Hospital Admin', 'Project', 'Social App', 'University Admin'];
const suggestions = [
  { title: 'Helper Class', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { title: 'Date Range Picker', description: 'There are many variations of passages of Lorem Ipsum available.' },
  { title: 'Image Input', description: 'It is a long established fact that a reader will be distracted.' },
  { title: 'DataTables for jQuery', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  { title: 'Development Setup', description: 'Contrary to popular belief, Lorem Ipsum is not simply random text.' },
];

const NavbarSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder="Enter your search key word"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={handleSearchClick}
        size="small"
        fullWidth
        sx={{
          bgcolor: '#2d2d2d',
          borderRadius: 1,
          input: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#00ffba',
            },
            '&:hover fieldset': {
              borderColor: '#00ffba',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffba',
            },
          },
        }}
        InputProps={{
          sx: { color: 'white' },
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: anchorEl ? anchorEl.clientWidth : undefined, // Match the width of the TextField
          },
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white' }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>RECENT SEARCHES</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {recentSearches.map((search, index) => (
              <Chip
                key={index}
                label={search}
                variant="outlined"
                sx={{
                  borderColor: '#00ffba',
                  color: '#00ffba',
                  '&:hover': {
                    backgroundColor: '#2d2d2d',
                  },
                }}
              />
            ))}
          </Box>
          <Divider sx={{ borderColor: '#00ffba', mb: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 1 }}>SUGGESTIONS</Typography>
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ p: 0, mb: 1 }}>
                <ListItemText
                  primary={suggestion.title}
                  secondary={suggestion.description}
                  primaryTypographyProps={{ sx: { color: '#00ffba' } }}
                  secondaryTypographyProps={{ sx: { color: 'white' } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default NavbarSearch;
