import React from 'react';
import { render, screen} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { pokemonApi } from '../store/ApiSlice';
import { SearchContext } from '../components/search';
import DetailedPageComponent from '../components/detailedPage';
import { MockStateTest } from '../types';

jest.mock('../store/ApiSlice', () => ({
  pokemonApi: {
    endpoints: {
      getPokemonById: {
        useQuery: jest.fn(),
      },
    },
  },
}));

const mockStore = configureStore([]);

const mockState: MockStateTest = {
  searchTerm: 'pikachu',
  pokemonList: [],
  loading: false,
  pokemonDetails: [],
  pageNumber: 1,
};

const setup = () => {
  const store = mockStore({
    pokemonsData: {
      selectedPokemons: [],
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/pokemon/1']}>
        <Routes>
          <Route
            path="/pokemon/:id"
            element={
              <SearchContext.Provider value={mockState}>
                <DetailedPageComponent />
              </SearchContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('DetailedPageComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when the component is loading, it should display a loading indicator', () => {
    (pokemonApi.endpoints.getPokemonById.useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    setup();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

});