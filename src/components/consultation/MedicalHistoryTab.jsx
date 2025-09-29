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
  ListItemSecondaryAction,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { RiCloseCircleFill } from 'react-icons/ri';
import { API_URL } from '../config';

// --- HistorySection Component ---
// This component displays a single section (e.g., "Past Medical History")
const HistorySection = ({ title, items, onAddItem, onEditItem, onDeleteItem, placeholder }) => {
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
    // Main container for each history section
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 1.5, color: '#333' }}>
        {title}
      </Typography>

      {/* Container for the list of existing history items */}
      <Box>
        {items && items.map((item, index) => (
          // Each item is a flex container to align the text field and icons
          <Box key={item.Id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            
            {/* Box to ensure the TextField takes up the available space */}
            <Box sx={{ flexGrow: 1 }}>
              {editIndex === index ? (
                // Inline TextField for editing an item
                <TextField
                  fullWidth
                  variant="outlined"
               
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleSaveEdit(index)}
                  onKeyPress={e => e.key === 'Enter' && handleSaveEdit(index)}
                  autoFocus
                />
              ) : (
                // Displaying the item description inside a read-only TextField for styling
                <TextField
                  fullWidth
                  variant="outlined"
              
                  value={item.Description}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    pointerEvents: 'none', // Prevents focus on the read-only field
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                      '& fieldset': {
                        borderColor: '#ccc',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#333',
                    },
                  }}
                />
              )}
            </Box>

            {/* Container for the action buttons */}
            <Box>
                <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => editIndex === index ? handleSaveEdit(index) : handleStartEdit(index, item.Description)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    color="primary"
                    aria-label="delete"
                    onClick={() => onDeleteItem(index)}
                >
                    <RiCloseCircleFill size="22"/>
                </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input field for adding a new item */}
      <TextField
        fullWidth
        placeholder={placeholder}
        variant="outlined"
      
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleAddItem()}
        sx={{ my: 1 }}
      />

      {/* Full-width "Add New Item" button */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<AddIcon />}
        onClick={handleAddItem}
        sx={{
          py: 1,
          textTransform: 'none',
          fontWeight: '600',
          borderColor: 'primary.main',
          color: 'primary.main',
        }}
      >
        Add New Item
      </Button>
    </Box>
  );
};


// --- Main MedicalHistoryTab Component ---
const categories = [
  { key: 'pastMedicalHistory', label: 'Past Medical History', apiCategory: 'Past Medical', placeholder: 'illness, accident...' },
  { key: 'surgicalHistory', label: 'Surgical History', apiCategory: 'Surgical', placeholder: 'Surgery in past...' },
  { key: 'familyHistory', label: 'Family History', apiCategory: 'Family', placeholder: 'Parents, sibling illness' },
  { key: 'socialHistory', label: 'Social History', apiCategory: 'Social', placeholder: 'Smoking, exercise...' },
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
      axios.get(`${API_URL}/patient/medicalHistory/${patientData.patientId}/${apiCategory}`)
        .then(res => {
          setHistories(prev => ({ ...prev, [key]: res.data.data }));
        })
        .catch(console.error);
    });
  }, [patientData?.patientId]);

  const handleAddItem = (categoryKey) => (description) => {
    if (!description) return;
    axios.post(`${API_URL}/patient/medicalHistory`, {
      patientId: patientData.patientId,
      category: categories.find(c => c.key === categoryKey).apiCategory,
      description,
    })
      .then(() => {
        return axios.get(`${API_URL}/patient/medicalHistory/${patientData.patientId}/${categories.find(c => c.key === categoryKey).apiCategory}`);
      })
      .then(res => {
        setHistories(prev => ({ ...prev, [categoryKey]: res.data.data }));
      })
      .catch(console.error);
  };

  const handleEditItem = (categoryKey) => (index, newDescription) => {
    const item = histories[categoryKey][index];
    if (!item || !newDescription) return;
    axios.put(`${API_URL}/patient/medicalHistory/${item.Id}`, { description: newDescription })
      .then(() => {
        setHistories(prev => {
          const newItems = [...prev[categoryKey]];
          newItems[index] = { ...newItems[index], Description: newDescription };
          return { ...prev, [categoryKey]: newItems };
        });
      })
      .catch(console.error);
  };

  const handleDeleteItem = (categoryKey) => (index) => {
    const item = histories[categoryKey][index];
    if (!item) return;
    axios.delete(`${API_URL}/patient/medicalHistory/${item.Id}`)
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
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {categories.map(({ key, label, placeholder }) => (
          <HistorySection
            key={key}
            title={label}
            items={histories[key]}
            placeholder={placeholder}
            onAddItem={handleAddItem(key)}
            onEditItem={handleEditItem(key)}
            onDeleteItem={handleDeleteItem(key)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MedicalHistoryTab;

