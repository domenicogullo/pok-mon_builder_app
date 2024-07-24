import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import TrainerDetails from './components/TrainerDetails';
import TrainerTeam from './components/TrainerTeam';
import OpponentTeam from './components/OpponentTeam';
import Summary from './components/Summary';
import { Container, CssBaseline, Box } from '@mui/material';

function App() {
  const [formData, setFormData] = useState({
    trainerName: '',
    teamName: '',
    favoriteType: ''
  });

  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [wizardInstance, setWizardInstance] = useState(null);

  const goToSummary = () => {
    if (wizardInstance) {
      wizardInstance.nextStep();
    }
  };

  const goBackToSteps = () => {
    if (wizardInstance) {
      wizardInstance.previousStep();
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box mt={4}>
        <Container>
          <h1 style={{ display: 'flex', alignItems: 'center' }}>
            Pokémon builder app
            <img src='/pokeball.png' alt='pokeball' style={{ width: 100, height: 100, marginLeft: 2 }} />
          </h1>
        </Container>
        <StepWizard instance={instance => setWizardInstance(instance)}>
          <TrainerDetails 
            goToStep={() => wizardInstance?.nextStep()} 
            setFormData={setFormData} 
            formData={formData} 
          />
          <TrainerTeam 
            previousStep={() => wizardInstance?.previousStep()} 
            nextStep={() => wizardInstance?.nextStep()} 
            formData={formData} 
            selectedPokemons={selectedPokemons} 
            setSelectedPokemons={setSelectedPokemons} 
          />
          <OpponentTeam
            previousStep={() => wizardInstance?.previousStep()}
            selectedPokemons={selectedPokemons}
            setOpponentTeam={setOpponentTeam}
            goToSummary={goToSummary}
            opponentTeam={opponentTeam}
          />
          <Summary
            formData={formData}
            selectedPokemons={selectedPokemons}
            opponentTeam={opponentTeam}
            goBack={goBackToSteps}
          />
        </StepWizard>
      </Box>
    </Container>
  );
}

export default App;
