import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  PokemonDescription,
  PokemonListResponse,
  SearchParams,
} from '../types.tsx';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonListResponse, SearchParams>({
      query: (params) => {
        const { searchTerm = '', pageNumber } = params;
        if (searchTerm === '') {
          return `pokemon?limit=30&offset=${pageNumber}`;
        } else {
          return `pokemon?search=${searchTerm}&limit=60&offset=${pageNumber}`;
        }
      },
    }),
    getPokemonByName: builder.query<PokemonDescription, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonByNames: builder.query<PokemonDescription[], string[]>({
      queryFn: async (names) => {
        try {
          const responses = await Promise.all(
            names.map(async (name) => {
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`,
              );
              if (!response.ok) {
                throw new Error(`Failed to fetch Pokemon ${name}`);
              }
              return await response.json();
            }),
          );
          return { data: responses };
        } catch (error) {
          return { error: error as FetchBaseQueryError };
        }
      },
    }),
  }),
});
