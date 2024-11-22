
export function generarNumeroAleatorioEntre1y2() {
    return Math.random() < 0.5 ? 1 : 2;
}

export function obtainPokemonWithName(pokemons, name) {
    return pokemons.find(pokemon => pokemon.name === name);
}