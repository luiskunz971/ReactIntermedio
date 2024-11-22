import React, { useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Container,
    InputAdornment,
    IconButton,
    Box,
    Typography,
} from '@mui/material';
import { usePokemonContext } from '../contexts/PokemonContext';

import SearchIcon from '@mui/icons-material/Search';

function PokemonList() {
    const { pokemons } = usePokemonContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [orderBy, setOrderBy] = useState('points');

    const filteredPokemons = pokemons
        .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[orderBy] > b[orderBy]) {
                return -1;
            }
            if (a[orderBy] < b[orderBy]) {
                return 1;
            }
            return 0;
        });

    return (
        <Container p={"0 2"}>
            <Box display="flex" justifyContent="space-between" p={2}>
                <Typography variant='h4' color='white'>Listado de Pokemons</Typography>
                <TextField
                    placeholder="Buscar Pokemón"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ backgroundColor: "white" }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={(e) => setSearchTerm(e.target.value)}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Button onClick={() => setOrderBy('name')}>Nombre</Button></TableCell>
                            <TableCell align="right"><Button onClick={() => setOrderBy('type')}>Tipo</Button></TableCell>
                            <TableCell align="right"><Button onClick={() => setOrderBy('base_experience')}>XP</Button></TableCell>
                            <TableCell align="right"><Button onClick={() => setOrderBy('weight')}>Peso</Button></TableCell>
                            <TableCell align="right"><Button onClick={() => setOrderBy('height')}>Altura</Button></TableCell>
                            <TableCell align="right"><Button onClick={() => setOrderBy('points')}>Puntaje</Button></TableCell>
                            <TableCell align="right"><Button onClick={() => setOrderBy('battles')}>Batallas</Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPokemons.map((pokemon) => (
                            <TableRow key={`detail-${pokemon.name}`}>
                                <TableCell component="th" scope="row">
                                    {pokemon.name}
                                </TableCell>
                                <TableCell align="right">{pokemon.type}</TableCell>
                                <TableCell align="right">{pokemon.base_experience}</TableCell>
                                <TableCell align="right">{pokemon.weight}</TableCell>
                                <TableCell align="right">{pokemon.height}</TableCell>
                                <TableCell align="right">{pokemon.points}</TableCell>
                                <TableCell align="right">{pokemon.battles}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default PokemonList;