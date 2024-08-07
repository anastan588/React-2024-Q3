import { configureStore, Store } from '@reduxjs/toolkit';
import pokemonReducer, { addSelectedState, cleanSelectedState, initPageLoad, initStateLoad, removeSelectedState } from '../store/pokemonSlice';
import { PokemonDescription } from '../types';
import { initState } from '../store/pokemonSlice';


describe('pokemonsSlice', () => {
  let store: Store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        pokemonsData: pokemonReducer,
      },
    });
  });

  test('should initialize the state', () => {
    const initialPokemons: PokemonDescription[] = [
      { id: 1, name: 'Bulbasaur' },
      { id: 2, name: 'Charmander' },
    ];

    store.dispatch(initState(initialPokemons));

    expect(store.getState().pokemonsData.pokemons).toEqual(initialPokemons);
    expect(store.getState().pokemonsData.isLoading).toBe(true);
    expect(store.getState().pokemonsData.pageNumber).toBe(1);
    expect(store.getState().pokemonsData.selectedPokemons).toEqual([]);
  });

  test('should handle loading state', () => {
    store.dispatch(initStateLoad(false));
    expect(store.getState().pokemonsData.isLoading).toBe(false);
  });

  test('should handle page loading', () => {
    store.dispatch(initPageLoad(2));
    expect(store.getState().pokemonsData.pageNumber).toBe(2);
  });

  test('should add a selected Pokemon', () => {
    const selectedPokemon: PokemonDescription = {
      id: 1,
      name: 'Bulbasaur',
    };

    store.dispatch(addSelectedState(selectedPokemon));
    expect(store.getState().pokemonsData.selectedPokemons).toContainEqual(
      selectedPokemon
    );
  });

  test('should remove a selected Pokemon', () => {
    const selectedPokemon: PokemonDescription = {
      id: 1,
      name: 'Bulbasaur',
    };

    store.dispatch(addSelectedState(selectedPokemon));
    expect(store.getState().pokemonsData.selectedPokemons).toContainEqual(
      selectedPokemon
    );

    store.dispatch(removeSelectedState(selectedPokemon));
    expect(store.getState().pokemonsData.selectedPokemons).not.toContainEqual(
      selectedPokemon
    );
  });

  test('should clean the selected Pokemon state', () => {
    const selectedPokemon1: PokemonDescription = {
      id: 1,
      name: 'Bulbasaur',
    };

    const selectedPokemon2: PokemonDescription = {
      id: 2,
      name: 'Charmander',
    };

    store.dispatch(addSelectedState(selectedPokemon1));
    store.dispatch(addSelectedState(selectedPokemon2));
    expect(store.getState().pokemonsData.selectedPokemons).toHaveLength(2);

    store.dispatch(cleanSelectedState());
    expect(store.getState().pokemonsData.selectedPokemons).toHaveLength(0);
  });


  
});