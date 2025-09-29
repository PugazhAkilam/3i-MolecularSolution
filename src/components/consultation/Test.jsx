// Import MUI components
import React, { useState } from 'react';
import { Box, Grid, TextField, IconButton, Button, Typography, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { RiCloseCircleFill } from "react-icons/ri";


const HistorySection = ({ label }) => {
  const [items, setItems] = useState(['']);
  const handleTextChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };
  const handleAddItem = () => setItems([...items, '']);
  const handleRemoveItem = (index) => setItems(items.filter((_, i) => i !== index));

  return (
   <Box  sx={{ p: 2, height: '100%' }}>
  <Typography variant="subtitle1" gutterBottom>
    {label}
  </Typography>

  {items.map((item, index) => (
    <Grid container spacing={1} key={index} alignItems="center" mb={1}>
      <Grid item xs={8}>
        <TextField
          placeholder="Text"
          value={item}
          onChange={(e) => handleTextChange(index, e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={4}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton  color="primary" sx={{ mr: 3 }}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleRemoveItem(index)}>
            <RiCloseCircleFill />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  ))}
  
  <Grid container>
  <Grid item xs={12}>
    <Button
      variant="outlined"
      fullWidth
      sx={{
        mt: 1,
        borderWidth: 2,     
        fontWeight: 'bold',      
        padding: '10px',
        borderColor: 'primary.main',
        '&:hover': {
          borderWidth: 2            
        }
      }}
      onClick={handleAddItem}
    >
      + Add New Item
    </Button>
  </Grid>
</Grid>
</Box>
  );
};

const MedicalHistoryForm = () => (
  <Box sx={{ p: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <HistorySection label="Past Medical History" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <HistorySection label="Surgical History" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <HistorySection label="Family History" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <HistorySection label="Social History" />
      </Grid>
    </Grid>
  </Box>
);

export default MedicalHistoryForm;
