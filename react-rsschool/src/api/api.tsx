import { PokemonListResponse, SearchState } from '../types';

export const pageNumber = 1;
export const urlGETSearch = `https://pokeapi.co/api/v2/ability/?limit=20&offset=${pageNumber}`;




export class Api {
  constructor() {
  }

  async fetchPokemonList(searchState: SearchState) {
    const url = urlGETSearch;
    await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        const responseResult  = response.json()
        return responseResult;
      })
      .then((data: PokemonListResponse) => {
        console.log(data);
        localStorage.setItem('searchTerm', searchState.searchTerm);
         searchState.pokemonList = data.results;
        localStorage.setItem('Pokemons', JSON.stringify(data.results));
        return searchState;
      })
      .catch((error) => {
        console.error('Error:', error);
      }); 
    console.log(searchState);
    return searchState; 
  }
}
