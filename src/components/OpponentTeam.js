import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';

const OpponentTeam = ({ previousStep, selectedPokemons, goToSummary, setOpponentTeam, opponentTeam }) => {
  const [generationAttempt, setGenerationAttempt] = useState(0);

  const generateOpponentTeam = useCallback(async () => {
    let attempts = 0;
    const team = new Set(); 
    const userPokemonIds = new Set(selectedPokemons.map(p => p.id));
  
    while (team.size < 4 && attempts < 100) {
      const id = Math.floor(Math.random() * 100) + 1; 
      try {
        const result = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = result.data;
        const pokemonId = pokemon.id;
  
        if (!userPokemonIds.has(pokemonId) && !team.has(pokemonId)) {
          team.add({
            id: pokemonId,
            name: pokemon.name,
            types: pokemon.types.map(t => t.type.name),
            species: pokemon.species.name,
            stats: pokemon.stats,
            sprites: pokemon.sprites
          });
        }
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      }
      attempts++;
    }

    setOpponentTeam(Array.from(team));
  }, [selectedPokemons, setOpponentTeam]);
  
  

  useEffect(() => {
    generateOpponentTeam();
  }, [generationAttempt, generateOpponentTeam]);

  return (
    <Box sx={{ padding: 0.5 }}>
      <Typography variant="h4" gutterBottom>Opponent team selection</Typography>
      <Grid container spacing={3}>
        {opponentTeam.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                sx={{
                  height: 200, 
                  objectFit: 'contain' 
                }}
                image={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography variant="h5" sx={{textTransform: 'capitalize'}}><strong>{pokemon.name}</strong></Typography>
                <Typography>Type: {pokemon.types.join(', ')}</Typography>
                <Typography>Species: {pokemon.species}</Typography>
                <Typography>Stats:</Typography>
                <ul>
                  {pokemon.stats.map((stat, i) => (
                    <li key={i}>{stat.stat.name}: {stat.base_stat}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button variant="contained" sx={{backgroundColor:"red", '&:hover': { backgroundColor: 'darkRed' }}} onClick={previousStep}>
          Back
        </Button>
        <Button variant="contained" color="warning" onClick={() => setGenerationAttempt(prev => prev + 1)}>
          Generate new opponent team
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={goToSummary}
          disabled={opponentTeam.length === 0}
        >
          Show summary
        </Button>
      </Box>
    </Box>
  );
};

export default OpponentTeam;

