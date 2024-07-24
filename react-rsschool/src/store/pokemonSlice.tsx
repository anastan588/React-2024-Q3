import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonDescription } from '../types';

export interface PokemonState {
  pokemons: PokemonDescription[];
  isLoading: boolean;
}

const initialPokemonState: PokemonState = {
  pokemons: [],
  isLoading: true,
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
  },
});

// Action creators are generated for each case reducer function
export const { initState, initStateLoad } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
