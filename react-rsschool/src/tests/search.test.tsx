import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { pokemonApi } from '../store/ApiSlice';
import { initStateLoad, initPageLoad } from '../store/pokemonSlice';
import SearchComponent from '../components/search';
import { PokemonsActionTest, RootStateTest } from '../types';

jest.mock('../store/ApiSlice');


describe('SearchComponent', () => {
  let store:  MockStoreEnhanced<RootStateTest, PokemonsActionTest>;;

  beforeEach(() => {
    const mockStore = configureStore<RootStateTest, PokemonsActionTest>();
    store = mockStore({
      pokemonsData: {
        pokemons: [],
        selectedPokemons: [],
        isLoading: false,
      },
    });
  });

  test('renders the search input and button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(()=> {
       expect(screen.getByPlaceholderText('Search for Pokemon')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument(); 
    },1500)

    
  });

  test('updates the search term in localStorage when the input changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search for Pokemon');
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });

    expect(localStorage.getItem('searchTerm')).toBe('pikachu');
  });

  test('calls the handleSearch function when the search button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    );

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(store.dispatch).toHaveBeenCalledWith(initStateLoad(true));
    expect(store.dispatch).toHaveBeenCalledWith(initStateLoad(false));
  });

});