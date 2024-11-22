import React, { useState } from 'react';
import { Container, Typography,  InputAdornment, IconButton, TextField, Box, } from '@mui/material';
import Grid from "@mui/material/Grid2";
import SearchIcon from '@mui/icons-material/Search';
import PokedexDialog from "../components/PokedexDialog";
import PokemonCard from '../components/PokemonCard';
import axios from 'axios';
import { usePokemonContext } from '../contexts/PokemonContext';
import { apiUrlSinglePokemon } from '../utils/constants';

function Pokedex() {
    const { pokemons } = usePokemonContext();
    const [open, setOpen] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClickOpen = async (pokemon) => {
        setOpen(true);
        const response = await axios.get(`${apiUrlSinglePokemon}${pokemon.name}`);
        setPokemonDetails(response.data);
    };

    const handleClose = () => {
        setOpen(false);
        setPokemonDetails(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <Container >
                <Box display="flex" justifyContent="space-between" p={2}>
                    <Typography variant='h4' color='white'>Pokemons Disponibles</Typography>
                    <TextField
                        placeholder="Buscar Pokemón"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{backgroundColor:"white"}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearchChange}>
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Grid spacing={2} container display="flex">
                    {filteredPokemons.map((pokemon) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={`list-${pokemon.name}`}>
                            <PokemonCard handleClick={handleClickOpen} pokemon={pokemon} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {open && <PokedexDialog onClose={handleClose} pokemonDetails={pokemonDetails} />}
        </>
    );
}

export default Pokedex;