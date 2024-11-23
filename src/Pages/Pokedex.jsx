import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from "@mui/material/Grid2";
import PokedexDialog from "../components/PokedexDialog";
import PokemonCard from '../components/PokemonCard';
import axios from 'axios';
import { usePokemonContext } from '../contexts/PokemonContext';
import { apiUrlSinglePokemon } from '../utils/constants';
import TextFieldSearch from '../components/TextFieldSerch';
import PaginationCustom from '../components/Pagination';

function Pokedex() {
    const { pokemons } = usePokemonContext();
    const [open, setOpen] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;
    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

    const handleClickOpen = async (pokemon) => {
        setOpen(true);
        const response = await axios.get(`${apiUrlSinglePokemon}${pokemon.name}`);
        setPokemonDetails(response.data);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleClose = () => {
        setOpen(false);
        setPokemonDetails(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const currentPokemons = filteredPokemons.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <Container >
                <Box display="flex" justifyContent="space-between" p={2}>
                    <Typography variant='h4' color='white'>Pokemons Disponibles</Typography>
                    <TextFieldSearch searchTerm={searchTerm} onChange={handleSearchChange} />
                </Box>
                <Grid spacing={2} container display="flex">
                    {currentPokemons.map((pokemon) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={`list-${pokemon.name}`}>
                            <PokemonCard handleClick={handleClickOpen} pokemon={pokemon} />
                        </Grid>
                    ))}
                </Grid>
                <PaginationCustom count={totalPages} currentPage={currentPage} onChange={(event, newPage) => handlePageChange(newPage)} />
            </Container>
            {open && <PokedexDialog onClose={handleClose} pokemonDetails={pokemonDetails} />}
        </>
    );
}

export default Pokedex;