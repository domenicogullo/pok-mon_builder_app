import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Chip,
  ListItemButton
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const TrainerTeam = ({ previousStep, nextStep, formData, selectedPokemons, setSelectedPokemons }) => {
  const [favoriteTypePokemons, setFavoriteTypePokemons] = useState([]);
  const [otherPokemons, setOtherPokemons] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const result = await axios('https://pokeapi.co/api/v2/pokemon?limit=100');
        const allPokemons = result.data.results;
        const detailedPokemons = await Promise.all(
          allPokemons.map(pokemon =>
            axios(pokemon.url).then(res => res.data)
          )
        );

        const favoriteType = formData.favoriteType;
        const favoriteTypePokemons = detailedPokemons.filter(pokemon =>
          pokemon.types.some(type => type.type.name === favoriteType)
        );
        const otherPokemons = detailedPokemons.filter(pokemon =>
          !pokemon.types.some(type => type.type.name === favoriteType)
        );

        setFavoriteTypePokemons(favoriteTypePokemons);
        setOtherPokemons(otherPokemons);
      } catch (error) {
        console.error("Errore nel recuperare i Pokémon:", error);
      }
    };

    fetchPokemons();
  }, [formData.favoriteType]);

  const handleSelect = (pokemon) => {
  const isSelected = selectedPokemons.some(p => p.name === pokemon.name);
  
    if (isSelected) {
      setSelectedPokemons(selectedPokemons.filter(p => p.name !== pokemon.name));
    } else if (selectedPokemons.length < 7) {
      setSelectedPokemons([...selectedPokemons, pokemon]);
    }
  };
  

  const fetchPokemonDetails = (pokemon) => {
    setShowDetails(pokemon);
  };

  const handleClose = () => {
    setShowDetails(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" sx={{backgroundColor:"red", '&:hover': { backgroundColor: 'darkRed' }}} onClick={previousStep}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={nextStep}
          disabled={selectedPokemons.length === 0}
          sx={{ ml: 1 }}>
          Next
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>Choose your Pokémon team!</Typography>
      <List>
        <Typography variant="h6">Pokémon type: {formData.favoriteType}</Typography>
        {favoriteTypePokemons.map((pokemon) => (
          <ListItem key={pokemon.name} disablePadding>
          <ListItemButton
            onClick={() => handleSelect(pokemon)}
            sx={{
              backgroundColor: selectedPokemons.some(p => p.name === pokemon.name) ? 'rgba(0, 0, 200, 0.6)' : 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <Avatar src={pokemon.sprites.front_default} alt={pokemon.name} />
                <ListItemText 
                  primary={pokemon.name}
                  primaryTypographyProps={{sx: {fontWeight: 'bold', textTransform: 'capitalize'}}}
                  secondary={
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {pokemon.types.map((type, index) => (
                        <Chip key={index} label={type.type.name} sx={{ margin: 0.5 }} />
                      ))}
                    </Box>
                  } 
                />

            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={(e) =>{ 
                e.stopPropagation();
                fetchPokemonDetails(pokemon)}}>
                <InfoIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        </ListItem>
        
        ))}
        <Typography variant="h6" mt={2}>Others</Typography>
        {otherPokemons.map((pokemon) => (
          <ListItem key={pokemon.name} disablePadding>
            <ListItemButton
              onClick={() => handleSelect(pokemon)}
              sx={{
                backgroundColor: selectedPokemons.some(p => p.name === pokemon.name) ? 'rgba(0, 0, 200, 0.6)' : 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <Avatar src={pokemon.sprites.front_default} alt={pokemon.name} />
              <ListItemText 
                primary={pokemon.name}
                primaryTypographyProps={{sx: {fontWeight: 'bold', textTransform: 'capitalize'}}}
                secondary={
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {pokemon.types.map((type, index) => (
                      <Chip key={index} label={type.type.name} sx={{ margin: 0.5 }} />
                    ))}
                  </Box>
                } 
              />
              <ListItemSecondaryAction>
              <IconButton edge="end" onClick={(e) =>{ 
                e.stopPropagation();
                fetchPokemonDetails(pokemon)}}>
                  <InfoIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={Boolean(showDetails)} onClose={handleClose}>
        {showDetails && (
          <>
            <DialogTitle sx={{fontWeight: 'bold', textTransform: 'capitalize'}}>{showDetails.name}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item>
                  <img src={showDetails.sprites.front_default} alt={showDetails.name} />
                </Grid>
                <Grid item>
                  <img src={showDetails.sprites.back_default} alt={showDetails.name} />
                </Grid>
              </Grid>
              <Typography><strong>Type:</strong> {showDetails.types.map((t) => t.type.name).join(', ')}</Typography>
              <Typography><strong>Species:</strong> {showDetails.species.name}</Typography>
              <Typography><strong>List of moves:</strong> {showDetails.moves.map((m) => m.move.name).join(', ')}</Typography>
              <Typography><strong>Forms:</strong> {showDetails.forms.map((f) => f.name).join(', ')}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant='contained' sx={{backgroundColor:"red", '&:hover': { backgroundColor: 'darkRed' }}}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Box>
  );
};

export default TrainerTeam;


