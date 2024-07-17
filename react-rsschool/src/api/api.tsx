import { PokemonDescription, SearchState } from '../types';

async function Api(searchState: SearchState) {
  const url =
    searchState.searchTerm === ''
      ? `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${searchState.pageNumber}`
      : `https://pokeapi.co/api/v2/pokemon?search=${searchState.searchTerm}&limit=60&offset=${searchState.pageNumber}`;

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
      console.log(searchState.pokemonDetails);
    }
  } catch (error) {
    console.error('Error:', error);
    return searchState;
  }
  return searchState;
}

export default Api;
