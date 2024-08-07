import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';
import { ThemeContext } from '../components/themeProvider';
import MainPageComponent from '../components/mainPage';
import { PokemonsActionTest, RootStateTest } from '../types';
import createMockStore from 'redux-mock-store';

fdescribe('MainPageComponent', () => {
  let store: MockStoreEnhanced<RootStateTest, PokemonsActionTest>;

  beforeEach(() => {
    const mockStore = createMockStore<RootStateTest, PokemonsActionTest>([]);
    store = mockStore({
      pokemonsData: {
        pageNumber: 1,
        selectedPokemons: [],
      },
    });
  });

  test('renders the main page components correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <ThemeContext.Provider
            value={{ theme: 'light', toggleTheme: jest.fn() }}
          >
            <MainPageComponent />
          </ThemeContext.Provider>
        </Router>
      </Provider>,
    );
    setTimeout(() => {
      expect(screen.getByText('Pokemons')).toBeInTheDocument();
      expect(screen.getByText('Toggle Dark Theme')).toBeInTheDocument();
      expect(screen.getByText('Throw Error')).toBeInTheDocument();
      expect(screen.getByText('anastan588')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
      expect(screen.getByText('Gitschub')).toBeInTheDocument();
    }, 1000);
  });

  test('throws an error when the "Throw Error" button is clicked', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <Provider store={store}>
        <Router>
          <ThemeContext.Provider
            value={{ theme: 'light', toggleTheme: jest.fn() }}
          >
            <MainPageComponent />
          </ThemeContext.Provider>
        </Router>
      </Provider>,
    );
    setTimeout(() => {
      fireEvent.click(screen.getByText('Throw Error'));
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        new Error('This is a test error'),
      );
    }, 1000);
  });
  test('should toggle the theme', () => {
    const toggleThemeMock = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <ThemeContext.Provider
            value={{ theme: 'light', toggleTheme: toggleThemeMock }}
          >
            <MainPageComponent />
          </ThemeContext.Provider>
        </Router>
      </Provider>,
    );
    setTimeout(() => {
      fireEvent.click(screen.getByText('Toggle Dark Theme'));
      expect(toggleThemeMock).toHaveBeenCalled();
    }, 1000);
  });
});
