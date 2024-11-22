import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid2 } from '@mui/material';

const PokedexDialog = ({ onClose, pokemonDetails }) => {
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle color="primary"id="pokemon-details">
        Pokedex {pokemonDetails?.name}
      </DialogTitle>
      <DialogContent>
        {pokemonDetails && (
          <Grid2 container alignItems="center">
            <Grid2 size={{ xs: 6 }}>
              <DialogContentText>
                Nombre: {pokemonDetails.name}
              </DialogContentText>
              <DialogContentText>
                Altura: {pokemonDetails.height}
              </DialogContentText>
              <DialogContentText>
                Peso: {pokemonDetails.weight}
              </DialogContentText>
              <DialogContentText>
                XP: {pokemonDetails.base_experience}
              </DialogContentText>
            </Grid2>
            <Grid2 size={{ xs: 6 }} display="flex" justifyContent="center">
              <img width={150} src={pokemonDetails.sprites.front_default} alt={`Imagen ${pokemonDetails.name}`} />
            </Grid2>
          </Grid2>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PokedexDialog;