import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { RiCloseCircleFill } from "react-icons/ri";


const HistorySection = ({ title, items, onAddItem, onEditItem, onDeleteItem }) => {
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      onAddItem(newItem);
      setNewItem('');
    }
  };

  const handleStartEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleSaveEdit = (index) => {
    if (editValue.trim()) {
      onEditItem(index, editValue);
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <Box sx={{ mb: 4, border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} divider>
            {editIndex === index ? (
              <TextField
                fullWidth
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleSaveEdit(index)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(index);
                }}
                autoFocus
              />
            ) : (
              <ListItemText primary={item} />
            )}
            <ListItemSecondaryAction>
              {editIndex === index ? (
                <IconButton color="primary" edge="end" aria-label="save" onClick={() => handleSaveEdit(index)}>
                  <EditIcon  /> {/* Using EditIcon for save visual */}
                </IconButton>
                
              ) : (
                <IconButton color='primary' edge="end" aria-label="edit" onClick={() => handleStartEdit(index, item)}>
                  <EditIcon />
                </IconButton>
              )}
              <IconButton color='primary' edge="end" aria-label="delete" onClick={() => onDeleteItem(index)}>
    <RiCloseCircleFill />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          fullWidth
          label="Add new item"
          variant="outlined"
          size="small"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleAddItem();
          }}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={handleAddItem}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

const MedicalHistoryTab = () => {
  const [pastMedicalHistory, setPastMedicalHistory] = useState([]);
  const [surgicalHistory, setSurgicalHistory] = useState([]);
  const [familyHistory, setFamilyHistory] = useState([]);
  const [socialHistory, setSocialHistory] = useState([]);

  const handleAddItem = (setter) => (item) => setter((prev) => [...prev, item]);
  const handleEditItem = (setter) => (index, newItem) =>
    setter((prev) => prev.map((item, i) => (i === index ? newItem : item)));
  const handleDeleteItem = (setter) => (index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mb: 4 }}>
        <HistorySection
          title="Past Medical History"
          items={pastMedicalHistory}
          onAddItem={handleAddItem(setPastMedicalHistory)}
          onEditItem={handleEditItem(setPastMedicalHistory)}
          onDeleteItem={handleDeleteItem(setPastMedicalHistory)}
        />
        <HistorySection
          title="Surgical History"
          items={surgicalHistory}
          onAddItem={handleAddItem(setSurgicalHistory)}
          onEditItem={handleEditItem(setSurgicalHistory)}
          onDeleteItem={handleDeleteItem(setSurgicalHistory)}
        />
        <HistorySection
          title="Family History"
          items={familyHistory}
          onAddItem={handleAddItem(setFamilyHistory)}
          onEditItem={handleEditItem(setFamilyHistory)}
          onDeleteItem={handleDeleteItem(setFamilyHistory)}
        />
        <HistorySection
          title="Social History"
          items={socialHistory}
          onAddItem={handleAddItem(setSocialHistory)}
          onEditItem={handleEditItem(setSocialHistory)}
          onDeleteItem={handleDeleteItem(setSocialHistory)}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Reset
        </Button>
        <Button variant="contained">Save</Button>
      </Box>
    </Box>
  );
};

export default MedicalHistoryTab;

