import React from 'react';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PokemonDescription } from '../types';
import { addSelectedState, removeSelectedState } from '../store/pokemonSlice';
import PokemonListPage from '../components/pokemosListPage';
import { MemoryRouter} from 'react-router-dom';

const mockStore = configureStore([]);

const mockPokemonList: PokemonDescription[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    sprites: {
      back_default: 'https://example.com/bulbasaur-back.png',
    },
  },
  {
    id: 2,
    name: 'Charmander',
    sprites: {
      back_default: 'https://example.com/charmander-back.png',
    },
  },
  {
    id: 3,
    name: 'Squirtle',
    sprites: {
      back_default: 'https://example.com/squirtle-back.png',
    },
  },
];

describe('PokemonListPage', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      pokemonsData: {
        selectedPokemons: [],
      },
    });
  });

  it('should render the Pokemon list', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage filteredPokemonList={mockPokemonList} />
        </MemoryRouter>
      </Provider>,
    );
setTimeout(()=> {
     expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Squirtle')).toBeInTheDocument();
},1200)
   
  });

  it('should toggle the selected state of a Pokemon', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage filteredPokemonList={mockPokemonList} />
        </MemoryRouter>
      </Provider>,
    );
setTimeout(()=> {
      const bulbasaurCheckbox = screen.getByRole('checkbox', { name: 'Bulbasaur' });
    userEvent.click(bulbasaurCheckbox);

    expect(store.getActions()).toContainEqual(addSelectedState(mockPokemonList[0]));

    userEvent.click(bulbasaurCheckbox);
    expect(store.getActions()).toContainEqual(removeSelectedState(mockPokemonList[0]));
},1200)
  
  });
});