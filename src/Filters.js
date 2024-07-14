import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Filters = ({ onFilter, onSort }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilter({ name, status });
  };

  const handleSort = (sortKey) => {
    onSort(sortKey);
  };

  return (
    <Box  component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off">
      
      <TextField id="standard-basic" label="Name" variant="standard"  type="text"  value={name} onChange={(e) => setName(e.target.value)} />
      <TextField id="standard-basic" label="Status" variant="standard"  type="text"  value={status}  onChange={(e) => setStatus(e.target.value)} />
     
      <Button onClick={handleFilter} variant="outlined">Filter</Button>
      <Button onClick={() => handleSort('name')} variant="contained" color="success">Sort by Name</Button>
      <Button onClick={() => handleSort('status')} variant="contained" color="success">Sort by Status</Button>
    
    </Box>
  );
};

export default Filters;
