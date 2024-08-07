import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import FlyoutComponent from '../components/flyoutElement';
import { PokemonsActionTest, RootStateTest } from '../types';
import { saveAs } from 'file-saver';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('FlyoutComponent', () => {
  let store: MockStoreEnhanced<RootStateTest, PokemonsActionTest>;

  beforeEach(() => {
    const mockStore = configureStore<RootStateTest, PokemonsActionTest>();
    store = mockStore({
      pokemonsData: {
        selectedPokemons: [
          {
            id: 1,
            name: 'Pikachu',
            abilities: [{ ability: { name: 'static' } }],
          },
          {
            id: 2,
            name: 'Bulbasaur',
            abilities: [{ ability: { name: 'overgrow' } }],
          },
        ],
      },
    });
  });

  test('renders the correct number of selected pokemons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );
    expect(getByText('2 pokemons are selected')).toBeInTheDocument();
  });

  test('unselects all pokemons when "Unselect all" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );

    fireEvent.click(getByText('Unselect all'));
    expect(store.getActions()).toContainEqual(
      expect.objectContaining({ type: 'pokemon/cleanSelectedState' }),
    );
  });

  test('downloads a CSV file when "Download" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );
    fireEvent.click(getByText('Download'));
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), '2_pokemons.csv');
  });
});
