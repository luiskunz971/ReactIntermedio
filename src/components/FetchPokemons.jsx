import axios from "axios";
import React, { useEffect } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import { baseUrlPokeApi } from "../utils/constants";

const FetchPokemons = ({ children }) => {
    const { setPokemons } = usePokemonContext();
  
    const fetchPokemons = async () => {
      const response = await axios.get(`${baseUrlPokeApi}/pokemon?limit=120`);
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url); 
          return {
            ...pokemon,
            type: detailsResponse.data.types[0].type.name,
            base_experience: detailsResponse.data.base_experience,
            weight: detailsResponse.data.weight,
            height: detailsResponse.data.height,
            battles: 4, 
            points: 2, 
          };
        })
      );
      setPokemons(pokemonData);
    };
  
    useEffect(() => {
      fetchPokemons();
    }, []);
  
    return (
      <>
        {children}
      </>
    );
  };
  
  export default FetchPokemons;