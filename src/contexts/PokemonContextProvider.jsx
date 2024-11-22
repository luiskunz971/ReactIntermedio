import React, { useEffect, useState } from 'react';
import { PokemonContext } from './PokemonContext';
import axios from 'axios';

const PokemonContextProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=25');
            setPokemons(response.data.results);
        };

        fetchPokemons();
    },[]);

    useEffect(() => {
        const fetchPokemonDetails = async (pokemon) => {
            const response = await axios.get(pokemon.url);
            const details = {
                type: response.data.types[0].type.name,
                base_experience: response.data.base_experience,
                weight: response.data.weight,
                height: response.data.height,
                battles: 4,
                points: 2,
            };
            setPokemons((prevPokemons) =>
                prevPokemons.map((p) => (p.url === pokemon.url ? { ...p, ...details } : p))
            );
        };

        pokemons.forEach(fetchPokemonDetails);
    });
    
    return (
        <PokemonContext.Provider value={{pokemons, setPokemons}}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonContextProvider;