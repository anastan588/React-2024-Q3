import { PokemonDescription, SearchState } from '../types';

export const pageNumber = 1;
export const urlGETSearchDefault = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${pageNumber}`;

async function Api(searchState: SearchState) {
      const url =
        searchState.searchTerm === ''
          ? urlGETSearchDefault
          : `https://pokeapi.co/api/v2/pokemon?search=${searchState.searchTerm}&limit=60&offset=${pageNumber}`;

      try {
        const response = await fetch(url, {
          headers: {
            accept: 'application/json',
          },
        });
        await response.json().then((data) => {
          searchState.pokemonList = data.results;
          searchState.pokemonDetails = [];
          searchState.loading = false;
        });
        for (const pokemon of searchState.pokemonList) {
          const pokemonData: PokemonDescription = await fetch(pokemon.url).then(
            (res) => res.json(),
          );
          searchState.pokemonDetails.push(pokemonData);
        }
       
      } catch (error) {
        console.error('Error:', error);
        return searchState;
      }
  return searchState;
}

export default Api;
