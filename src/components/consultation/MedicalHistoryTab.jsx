import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { RiCloseCircleFill } from 'react-icons/ri';

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
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <List>
        {items && items.map((item, index) => (
          <ListItem key={item.Id} divider>
            {editIndex === index ? (
              <TextField
                fullWidth
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleSaveEdit(index)}
                onKeyPress={e => e.key === 'Enter' && handleSaveEdit(index)}
                autoFocus
              />
            ) : (
              <ListItemText primary={item.Description} />
            )}
            <ListItemSecondaryAction>
              {editIndex === index ? (
                <IconButton
                  color="primary"
                  edge="end"
                  aria-label="save"
                  onClick={() => handleSaveEdit(index)}
                >
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleStartEdit(index, item.Description)}
                >
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                color="primary"
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteItem(index)}
              >
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
          onKeyPress={e => e.key === 'Enter' && handleAddItem()}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={handleAddItem}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

const categories = [
  { key: 'pastMedicalHistory', label: 'Past Medical History', apiCategory: 'Past Medical' },
  { key: 'surgicalHistory', label: 'Surgical History', apiCategory: 'Surgical' },
  { key: 'familyHistory', label: 'Family History', apiCategory: 'Family' },
  { key: 'socialHistory', label: 'Social History', apiCategory: 'Social' },
];

const MedicalHistoryTab = ({ patientData }) => {

  console.log("MedicalHistoryTab patientData:", patientData);
  
  const [histories, setHistories] = useState({
    pastMedicalHistory: [],
    surgicalHistory: [],
    familyHistory: [],
    socialHistory: [],
  });

  useEffect(() => {
    if (!patientData?.patientId) return;

    categories.forEach(({ key, apiCategory }) => {
      axios.get(`http://localhost:8000/api/patient/medicalHistory/${patientData.patientId}/${apiCategory}`)
        .then(res => {
          // Each item has { Id, Description }
          setHistories(prev => ({ ...prev, [key]: res.data.data }));
        })
        .catch(console.error);
    });
  }, [patientData?.patientId]);

  // Add new item
  const handleAddItem = (categoryKey) => (description) => {
    if (!description) return;
    axios.post('http://localhost:8000/api/patient/medicalHistory', {
      patientId: patientData.patientId,
      category: categories.find(c => c.key === categoryKey).apiCategory,
      description,
    })
      .then(() => {
        // Refresh list after add
        return axios.get(`http://localhost:8000/api/patient/medicalHistory/${patientData.regId}/${categories.find(c => c.key === categoryKey).apiCategory}`);
      })
      .then(res => {
        setHistories(prev => ({ ...prev, [categoryKey]: res.data.data }));
      })
      .catch(console.error);
  };

  // Edit item by index
  const handleEditItem = (categoryKey) => (index, newDescription) => {
    const item = histories[categoryKey][index];
    if (!item || !newDescription) return;
    axios.put(`http://localhost:8000/api/patient/medicalHistory/${item.Id}`, { description: newDescription })
      .then(() => {
        setHistories(prev => {
          const newItems = [...prev[categoryKey]];
          newItems[index] = { ...newItems[index], Description: newDescription };
          return { ...prev, [categoryKey]: newItems };
        });
      })
      .catch(console.error);
  };

  // Delete item by index
  const handleDeleteItem = (categoryKey) => (index) => {
    const item = histories[categoryKey][index];
    if (!item) return;
    axios.delete(`http://localhost:8000/api/patient/medicalHistory/${item.Id}`)
      .then(() => {
        setHistories(prev => ({
          ...prev,
          [categoryKey]: prev[categoryKey].filter((_, i) => i !== index),
        }));
      })
      .catch(console.error);
  };

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mb: 4 }}>
    
        {categories.map(({ key, label }) => (
          <HistorySection
            key={key}
            title={label}
            items={histories[key]}
            onAddItem={handleAddItem(key)}
            onEditItem={handleEditItem(key)}
            onDeleteItem={handleDeleteItem(key)}
          />
        ))}
   
        {/* <HistorySection
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
        /> */}
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

