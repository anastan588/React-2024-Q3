import { PokemonDescription, PokemonListResponse, SearchState } from '../types';

export const pageNumber = 1;
export const urlGETSearchDefault = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${pageNumber}`;


export class Api {
  constructor() {}

  async fetchPokemonList(searchState: SearchState) {
    const url = searchState.searchTerm === '' ? urlGETSearchDefault : `https://pokeapi.co/api/v2/pokemon?search=${searchState.searchTerm}&limit=60&offset=${pageNumber}`;
    await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        const responseResult = response.json();
        return responseResult;
      })
      .then((data: PokemonListResponse) => {
        console.log(data);
        localStorage.setItem('searchTerm', searchState.searchTerm);
        searchState.pokemonList = data.results;
        searchState.pokemonDetails = [];
        searchState.loading = false;
        return searchState;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(searchState);
    for (const pokemon of searchState.pokemonList) {
      try {
        const pokemonData: PokemonDescription = await fetch(pokemon.url).then(
          (res) => res.json(),
        );
        searchState.pokemonDetails.push(pokemonData);
      } catch (error) {
        console.error(`Error fetching details for ${pokemon.name}:`, error);
      }
    }
    return searchState;
  }
}
