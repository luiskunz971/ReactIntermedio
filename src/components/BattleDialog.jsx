import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid2, Typography, Divider, Chip } from '@mui/material';
import { usePokemonContext } from '../contexts/PokemonContext';
import { generarNumeroAleatorioEntre1y2, obtainPokemonWithName } from '../utils/methods';
import { urlImg } from '../utils/constants';

const StatusView = ({ pokemon }) => {
  const { pokemons } = usePokemonContext();

  if (pokemon) {
    return <img src={`${urlImg}${obtainPokemonWithName(pokemons, pokemon).url.split('/')[6]}.png`} alt="Img Pokemon" width={120} />
  } else {
    return <img src="reloj.png" alt="Pendiente" width={120} />
  }
}

const BattleDialog = ({ onClose, pokemon1, pokemon2 }) => {
  const { pokemons, setPokemons } = usePokemonContext();

  const [firstRound, setFirstRound] = useState(null);
  const [secondRound, setSecondRound] = useState(null);
  const [thirdRound, setThirdRound] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (firstRound && secondRound) {
      handleWinner();
    }
  }, [firstRound, secondRound, thirdRound]);

  const handleWinner = () => {
    if (firstRound === secondRound) {
      setWinner(firstRound);
      actualizarPuntosGanador(firstRound);
    } else if (firstRound === thirdRound) {
      setWinner(firstRound);
      actualizarPuntosGanador(firstRound);
    } else if (secondRound === thirdRound) {
      setWinner(secondRound);
      actualizarPuntosGanador(secondRound);
    }
  }

  const actualizarPuntosGanador = (winner) => {
    const nuevosPokemons = pokemons.map(pokemon => {
      if (pokemon.name === winner) {
        return { ...pokemon, points: pokemon.points + 1, battle: pokemon.battle + 1 };
      } else {
        return pokemon;
      }
    });
    setPokemons(nuevosPokemons);
  };

  const handleClickRound = (setRound) => {
    const rnd = generarNumeroAleatorioEntre1y2();
    setRound(rnd === 1 ? pokemon1 : pokemon2);
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle color='primary' variant='h4' textAlign="center" id="pokemon-battle">
        Batalla de pokemon
      </DialogTitle>
      <DialogContent>
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 4 }} display="flex" flexDirection="column" alignItems="center">
            <Button variant="contained" onClick={() => handleClickRound(setFirstRound)} disabled={!!firstRound}>Luchar</Button>
            {firstRound ? <Typography color='green'>Ganador</Typography> : <Typography color='blue'>Pendiente</Typography>}
            <DialogContentText textAlign="center">
              Primer round <br /> {firstRound}
            </DialogContentText>
            <StatusView pokemon={firstRound} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }} display="flex" flexDirection="column" alignItems="center">
            <Button variant='contained' onClick={() => handleClickRound(setSecondRound)} disabled={!firstRound || !!secondRound}>Luchar</Button>
            {secondRound ? <Typography color='green'>Ganador</Typography> : <Typography color='blue'>Pendiente</Typography>}
            <DialogContentText textAlign="center">
              Segundo round <br /> {secondRound}
            </DialogContentText>
            <StatusView pokemon={secondRound} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }} display="flex" flexDirection="column" alignItems="center">
            <Button variant='contained' onClick={() => handleClickRound(setThirdRound)} disabled={!secondRound || !!winner}>Luchar</Button>
            {thirdRound ? <Typography color='green'>Ganador</Typography> : <Typography color='blue'>Pendiente</Typography>}
            <DialogContentText textAlign="center">
              Tercer round <br /> {thirdRound}
            </DialogContentText>
            <StatusView pokemon={thirdRound} />
          </Grid2>
        </Grid2>
        {winner && <>
          <Divider>
            <Chip label="Resultado Final" size="small" />
          </Divider>
          <Typography color='primary' variant='h5' textAlign="center"> El ganador es {winner} </Typography>
          <Grid2 container>
            <Grid2 size={{ xs: 4 }} display="flex" flexDirection="column" alignItems="center">
              <img width={105} src="logoWinner.png" alt="Winner Img" />
            </Grid2>
            <Grid2 size={{ xs: 4 }} display="flex" flexDirection="column" alignItems="center">
              <Typography variant='h6'>Raunds ganados:</Typography>
              {firstRound === winner && <Typography>Primer raund</Typography>}
              {secondRound === winner && <Typography>Segundo raund</Typography>}
              {thirdRound === winner && <Typography>Tercer raund</Typography>}
            </Grid2>
            <Grid2 size={{ xs: 4 }} display="flex" flexDirection="column" alignItems="center">
              <img src={`${urlImg}${obtainPokemonWithName(pokemons, winner).url.split('/')[6]}.png`} alt="" width={120} />
            </Grid2>
          </Grid2>
        </>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BattleDialog;