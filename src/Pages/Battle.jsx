import React, { useState } from 'react';
import { Select, MenuItem, Container, Typography, Box, Paper, Button} from '@mui/material';
import { usePokemonContext } from '../contexts/PokemonContext';
import BattleDialog from '../components/BattleDialog';
import PokemonCard from '../components/PokemonCard';
import { obtainPokemonWithName } from '../utils/methods';
import ErrorDialog from '../components/ErrorDialog';
import { errorDescBattle } from '../utils/constants';

const Battle = () => {
    const { pokemons } = usePokemonContext();
    const [open, setOpen] = useState(false);
    const [selectedPokemon1, setSelectedPokemon1] = useState(pokemons[1].name);
    const [selectedPokemon2, setSelectedPokemon2] = useState(pokemons[2].name);
    const [error, setError] = useState(false)

    const handleOpen = () => {
        if (selectedPokemon1 === selectedPokemon2) {
            handleOpenError();
        } else {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpenError = () => {
        setError(true);
    }

    const handleCloseError = () => {
        setError(false);
    }

    return (
        <>
            <Container>
                <Typography variant='h4' color='white' textAlign="center" p={1}>Batalla de Pokemon</Typography>
                <Box display="flex" justifyContent="space-evenly" alignItems={"center"}>
                    <Paper sx={{ padding: "1rem" }}>
                        <Typography variant='h6'>Selecciona Pokémon N°1</Typography>
                        <Select
                            value={selectedPokemon1}
                            defaultValue={pokemons[1]}
                            onChange={(event) => { setSelectedPokemon1(event.target.value) }}
                            sx={{ minWidth: "15rem" }}
                        >
                            {pokemons.map((pokemon) => (
                                <MenuItem key={`selesct1-${pokemon.name}`} value={pokemon.name}>
                                    {pokemon.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <PokemonCard pokemon={obtainPokemonWithName(pokemons, selectedPokemon1)} handleClick={() => { }} />
                    </Paper>
                    <img width={150} height={150} src='./logoVs.png' alt='VS' />
                    <Paper sx={{ padding: "1rem" }}>
                        <Typography variant='h6'>Selecciona Pokémon N°2</Typography>
                        <Select
                            value={selectedPokemon2}
                            onChange={(event) => setSelectedPokemon2(event.target.value)}
                            sx={{ minWidth: "15rem" }}
                        >
                            {pokemons.map((pokemon) => (
                                <MenuItem key={`Selesct2-${pokemon.name}`} value={pokemon.name}>
                                    {pokemon.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <PokemonCard pokemon={obtainPokemonWithName(pokemons, selectedPokemon2)} handleClick={() => { }} />
                    </Paper>
                </Box>
                <Box display="flex" justifyContent="center" p={2}>
                    <Button variant='contained' onClick={handleOpen}>Iniciar Batalla</Button>
                </Box>
            </Container>
            {open && <BattleDialog onClose={handleClose} pokemon1={selectedPokemon1} pokemon2={selectedPokemon2} />}
            {error && <ErrorDialog text={errorDescBattle} onClose={handleCloseError} />}
        </>

    );
};

export default Battle;