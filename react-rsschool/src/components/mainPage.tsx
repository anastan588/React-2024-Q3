'use client';
import { useContext, useEffect, useState } from 'react';
import SearchComponent from './search';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, store } from '../store/store';
import FlyoutComponent from './flyoutElement';
import { ThemeContext } from './themeProvider';
import { pokemonApi } from '../store/ApiSlice';

function MainPageComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [state, setState] = useState({
    errorThrown: false,
  });
  const isPageNumber = useSelector(
    (state: RootState) => state.pokemonsData.pageNumber,
  );

  const selectedPokemonList = useSelector(
    (state: RootState) => state.pokemonsData.selectedPokemons,
  );

  const navigate = useNavigate();
  const throwError = () => {
    setState({ errorThrown: true });
  };
  if (state.errorThrown) {
    throw new Error('This is a test error');
  }

  const [storeReady, setStoreReady] = useState(false);

  useEffect(() => {
    // Check if the store is ready
    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as RootState;
      if (state[pokemonApi.reducerPath]) {
        setStoreReady(true);
        unsubscribe();
      }
    });

    return unsubscribe;
  }, []);

  if (!storeReady) {
    return <div>Loading...</div>;
  }

  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (
      target.classList.contains('main') ||
      target.classList.contains('main_container') ||
      target.classList.contains('header') ||
      target.classList.contains('footer')
    ) {
      navigate(`/?page=${isPageNumber}`, { replace: true });
    } else {
      return;
    }
  };

  return (
    <div className={`main_container ${theme}-theme`} onClick={handleCloseClick}>
      <header className={`header ${theme}-theme`}>
        <h1>Pokemons</h1>
        <div className="button_controls">
          <button className="controls_button" onClick={toggleTheme}>
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
          <button className="error-button ${theme}-theme" onClick={throwError}>
            Throw Error
          </button>
        </div>
      </header>
      <main className="main">
        <SearchComponent>{children}</SearchComponent>
        {selectedPokemonList.length !== 0 ? <FlyoutComponent /> : null}
      </main>
      <footer className={`footer ${theme}-theme`}>
        <p className="footer_item">anastan588</p>
        <p className="footer_item">2024</p>
        <a
          className={`footer_item github ${theme}-theme`}
          href="https://github.com/anastan588"
          target="_blank"
        >
          Github
        </a>
      </footer>
    </div>
  );
}

export default MainPageComponent;
