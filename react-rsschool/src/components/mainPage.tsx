import { useState } from 'react';
import SearchComponent from './search';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function MainPageComponent() {
  const [state, setState] = useState({
    errorThrown: false,
  });
  const isPageNumber = useSelector(
    (state: RootState) => state.pokemonsData.pageNumber,
  );

  const navigate = useNavigate();
  const throwError = () => {
    setState({ errorThrown: true });
  };
  if (state.errorThrown) {
    throw new Error('This is a test error');
  }
  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    console.log(target);
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
    <div className="main_container" onClick={handleCloseClick}>
      <header className="header">
        <h1>Pokemons</h1>
        <button className="error-button" onClick={throwError}>
          Throw Error
        </button>
      </header>
      <main className="main">
        <SearchComponent />
      </main>
      <footer className="footer">
        <p className="footer_item">anastan588</p>
        <p className="footer_item">2024</p>
        <a
          className="footer_item github"
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
