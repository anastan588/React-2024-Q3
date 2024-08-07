import React from 'react';
import { screen, fireEvent, waitFor, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { initStateLoad } from '../store/pokemonSlice';
import SearchComponent from '../components/search';
import { PokemonsActionTest, RootStateTest } from '../types';

jest.mock('../store/ApiSlice');
describe('SearchComponent', () => {
  let store: MockStoreEnhanced<RootStateTest, PokemonsActionTest>;

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

  test('renders the search input and button', async () => {
    renderHook(() => (
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    ));
    await waitFor(() => {
      setTimeout(() => {
        expect(
          screen.getByPlaceholderText('Search for Pokemon'),
        ).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
      }, 1500);
    });
  });

  test('updates the search term in localStorage when the input changes', async () => {
    renderHook(() => (
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    ));

    await waitFor(() => {
      setTimeout(() => {
        const searchInput = screen.getByPlaceholderText('Search for Pokemon');
        fireEvent.change(searchInput, { target: { value: 'pikachu' } });
        expect(localStorage.getItem('searchTerm')).toBe('pikachu');
      }, 1500);
    });
  });

  test('calls the handleSearch function when the search button is clicked', async () => {
    renderHook(() => (
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    ));
    await waitFor(() => {
      setTimeout(() => {
        const searchButton = screen.getByText('Search');
        console.log(searchButton);
        fireEvent.click(searchButton);
        expect(store.dispatch).toHaveBeenCalledWith(initStateLoad(true));
        expect(store.dispatch).toHaveBeenCalledWith(initStateLoad(false));
      }, 1500);
    });
  });

  test('dispatches the correct actions on page change', async () => {
    renderHook(() => (
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    ));
    await waitFor(() => {
      setTimeout(() => {
        const nextPageButton = screen.getByText('Next page');
        fireEvent.click(nextPageButton);
        expect(store.dispatch).toHaveBeenCalledWith(initStateLoad(true));
      }, 1500);
    });
  });
});
