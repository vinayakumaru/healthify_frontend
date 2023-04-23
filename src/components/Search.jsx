import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function Search({setSearch}) {
  return (
    <Paper
      sx={{
        padding: '2px 4px',
        display: 'flex', 
        alignItems: 'center', 
        width: 600,
        borderRadius: '25px',
        backgroundColor: '#edf2ff',
        color: "black",
      }}
      elevation={3}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Hospitals"
        inputProps={{ 'aria-label': 'Search Hospitals' }}
        onChange={(e) => {
          setSearch(e.target.value);
        }
        }
      />
    </Paper>
  );
}