import { PokemonDescription, SearchState } from '../types';

async function Api(searchState: SearchState) {
  const url =
    searchState.searchTerm === ''
      ? `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${searchState.pageNumber}`
      : `https://pokeapi.co/api/v2/pokemon?search=${searchState.searchTerm}&limit=60&offset=${searchState.pageNumber}`;

  const state: SearchState = {
    searchTerm: searchState.searchTerm,
    pokemonList: [],
    loading: true,
    pokemonDetails: [],
    pageNumber: searchState.pageNumber,
  };

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    await response.json().then((data) => {
      localStorage.setItem('searchTerm', searchState.searchTerm);
      state.pokemonList = data.results;
      state.pokemonDetails = [];
      state.loading = false;
    });
    for (const pokemon of state.pokemonList) {
      const pokemonData: PokemonDescription = await fetch(pokemon.url).then(
        (res) => res.json(),
      );
      state.pokemonDetails.push(pokemonData);
    }
  } catch (error) {
    console.error('Error:', error);
    return state;
  }
  return state;
}

export default Api;
