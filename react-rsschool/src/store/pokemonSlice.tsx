import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonDescription } from '../types';

export interface PokemonState {
  pokemons: PokemonDescription[];
  isLoading: boolean;
  pageNumber: number;
  selectedPokemons: PokemonDescription[];
}

const initialPokemonState: PokemonState = {
  pokemons: [],
  isLoading: true,
  pageNumber: 1,
  selectedPokemons: [],
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
    addSelectedState: (state, action: PayloadAction<PokemonDescription>) => {
      const isSelected = state.selectedPokemons.some(
        (pokemon) => pokemon.id === action.payload.id,
      );
      if (!isSelected) {
        state.selectedPokemons = [...state.selectedPokemons, action.payload];
      }
    },
    removeSelectedState: (state, action: PayloadAction<PokemonDescription>) => {
      state.selectedPokemons = state.selectedPokemons.filter(
        (pokemon) => pokemon.id !== action.payload.id,
      );
    },
    cleanSelectedState: (state) => {
      state.selectedPokemons = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initState,
  initStateLoad,
  initPageLoad,
  addSelectedState,
  removeSelectedState,
  cleanSelectedState,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
