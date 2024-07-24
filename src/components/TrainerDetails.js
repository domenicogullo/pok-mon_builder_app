import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  MenuItem, 
  TextField, 
  Typography 
} from '@mui/material';

const TrainerDetails = ({ goToStep, setFormData, formData }) => {
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const fetchTypes = async () => {
      const result = await axios('https://pokeapi.co/api/v2/type');
      setTypes(result.data.results);
    };
    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <Box sx={{ position: 'relative', padding: 3 }}>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>goToStep(2)}
          disabled={!formData.trainerName || !formData.teamName || !formData.favoriteType}>
          Next
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>Pokémon Trainer details:</Typography>
      <TextField
        label="Trainer name"
        name="trainerName"
        value={formData.trainerName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Team name"
        name="teamName"
        value={formData.teamName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Choose your favorite Pokémon type"
        name="favoriteType"
        value={formData.favoriteType}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        {types.map((type) => (
          <MenuItem key={type.name} value={type.name}>
            {type.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default TrainerDetails;
