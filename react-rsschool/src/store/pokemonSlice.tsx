import { createSlice } from '@reduxjs/toolkit';
import { PokemonDescription } from '../types';

export interface PokemonState {
  pokemons: PokemonDescription[];
}

const initialPokemonState: PokemonState = {
  pokemons: [],
};

export const counterSlice = createSlice({
  name: 'pokemon',
  initialState: initialPokemonState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.pokemons = [...state.pokemons];
    },
    decrement: (state) => {
        state.pokemons = [...state.pokemons];
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement} = counterSlice.actions;

export default counterSlice.reducer;
