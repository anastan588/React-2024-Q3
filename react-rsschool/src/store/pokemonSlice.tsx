import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonDescription } from '../types';

export interface PokemonState {
  pokemons: PokemonDescription[];
  isLoading: boolean;
  pageNumber: number;
}

const initialPokemonState: PokemonState = {
  pokemons: [],
  isLoading: true,
  pageNumber: 1,
};

export const pokemonsSlice = createSlice({
  name: 'pokemon',
  initialState: initialPokemonState,
  reducers: {
    initState: (state, action: PayloadAction<PokemonDescription[]>) => {
      state.pokemons = action.payload;
    },
    initStateLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initPageLoad: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initState, initStateLoad, initPageLoad } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
