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

const Round = ({ name, round, handleClick, disabled}) => {
  return (
    <>
      <Button variant="contained" onClick={handleClick} disabled={disabled}>Luchar</Button>
      {round ? <Typography color='green'>Ganador</Typography> : <Typography color='blue'>Pendiente</Typography>}
      <DialogContentText textAlign="center">
        {name}<br /> {round}
      </DialogContentText>
      <StatusView pokemon={round} />
    </>

  );
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
      const perdedor = firstRound === pokemon1 ? pokemon2 : pokemon1;
      setWinner(firstRound);
      actualizarPuntosGanador(firstRound, perdedor);
    } else if (firstRound === thirdRound) {
      const perdedor = firstRound === pokemon1 ? pokemon2 : pokemon1;
      setWinner(firstRound);
      actualizarPuntosGanador(firstRound, perdedor);
    } else if (secondRound === thirdRound) {
      const perdedor = secondRound === pokemon1 ? pokemon2 : pokemon1;
      setWinner(secondRound);
      actualizarPuntosGanador(secondRound, perdedor);
    }
  }

  const actualizarPuntosGanador = (winner, looser) => {
    const nuevosPokemons = pokemons.map(pokemon => {
      if (pokemon.name === winner) {
        return { ...pokemon, points: pokemon.points + 1, battles: pokemon.battles + 1 };
      } else if (pokemon.name === looser){
        return { ...pokemon, battles: pokemon.battles + 1 };
      }else {
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
            <Round name="Primer round" round={firstRound} handleClick={() => handleClickRound(setFirstRound)} disabled={!!firstRound}/>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }} display="flex" flexDirection="column" alignItems="center">
            <Round name="Segundo round" round={secondRound} handleClick={() => handleClickRound(setSecondRound)} disabled={!firstRound || !!secondRound}/>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }} display="flex" flexDirection="column" alignItems="center">
            <Round name="Tercer round" round={thirdRound} handleClick={() => handleClickRound(setThirdRound)} disabled={!secondRound || !!winner}/>
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
        <Button variant='contained' onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BattleDialog;