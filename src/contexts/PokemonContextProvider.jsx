import React, { useState } from 'react';
import { PokemonContext } from './PokemonContext';

const PokemonContextProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([]);
    
    
    return (
        <PokemonContext.Provider value={{pokemons, setPokemons}}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonContextProvider;