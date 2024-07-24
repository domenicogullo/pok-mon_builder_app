import React, { useState } from 'react';
import { 
Box, 
Typography, 
Button,
Divider,
List,
ListItem,
ListItemText,
ListItemIcon,
Paper,
Tabs,
Tab,
AppBar,
styled
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const StyledTab = styled(Tab)(({ theme }) => ({
    minWidth: 0,
    width: 'auto',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    borderRadius: 50,
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
    '&.Mui-selected': {
      color: 'black',
      fontWeight: 'bold',
      backgroundColor: 'white',
      border: `3px solid ${theme.palette.primary.main}`,
      boxShadow: theme.shadows[5],
      transform: 'scale(1.05)'
    },
    '&:not(.Mui-selected)': {
      color: theme.palette.text.secondary,
    },
  }));

const Summary = ({ formData, selectedPokemons, opponentTeam, goBack }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('You confirmed your team!');
    }, 2000); 
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Summary</Typography>
      <Box p={3} sx={{ maxWidth: 650, margin: 'auto' }}>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Tabs value={currentTab} onChange={handleChange}>
            <StyledTab label={<Typography variant="body1">① - Trainer details</Typography>} />
            <StyledTab label={<Typography variant="body1">② - Trainer team</Typography>} />
            <StyledTab label={<Typography variant="body1">③ - Opponent Team</Typography>} />
          </Tabs>
        </AppBar>

        {currentTab === 0 && (
          <Paper elevation={4} sx={{ padding: 2, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Pokémon Trainer details</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">Trainer name: <strong>{formData.trainerName}</strong></Typography>
            <Typography variant="body1">Team name: <strong>{formData.teamName}</strong></Typography>
            <Typography variant="body1">Favorite type: <strong>{formData.favoriteType}</strong></Typography>
          </Paper>
        )}

        {currentTab === 1 && (
          <Paper elevation={4} sx={{ padding: 2, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Your team:</Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {selectedPokemons.map(pokemon => (
                <ListItem key={pokemon.name}>
                    <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: 10}}/>
                    </ListItemIcon>
                  <ListItemText primary={pokemon.name}
                  primaryTypographyProps={{sx: {fontWeight: 'bold', textTransform: 'capitalize'}}} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {currentTab === 2 && (
          <Paper elevation={4} sx={{ padding: 2, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Opponent team:</Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {opponentTeam.map(pokemon => (
                <ListItem key={pokemon.name}>
                    <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: 10}}/>
                    </ListItemIcon>
                  <ListItemText primary={pokemon.name} 
                  primaryTypographyProps={{sx: {fontWeight: 'bold', textTransform: 'capitalize'}}}/>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Box mt={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="warning" onClick={goBack} disabled={isLoading}>
            Modify
          </Button>
          <Button variant="contained" 
                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }} 
                onClick={handleContinue} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Continue'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Summary;


