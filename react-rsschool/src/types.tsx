export interface Pokemon {
  name: string;
  url: string;
}

export interface SearchState {
  searchTerm: string;
  pokemonList: Pokemon[];
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
