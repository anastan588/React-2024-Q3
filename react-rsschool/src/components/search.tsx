import { createContext, useEffect, useState } from 'react';
import Api from '../api/api';
import { PokemonDescription, SearchState } from '../types';
import PokemonListPage from './pokemosListPage';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const SearchContext = createContext<SearchState | undefined>(undefined);

function SearchComponent() {
  const [state, setState] = useState<SearchState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    pokemonList: [],
    loading: false,
    pokemonDetails: [],
    pageNumber: 1,
  });

  const navigate = useNavigate();

  const [filteredPokemonList, setFilteredPokemonList] = useState<
    PokemonDescription[]
  >([]);

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      setState({ ...state, searchTerm: searchTerm });
    }
    const fetchData = async () => {
      await requestForServer();
    };
    fetchData();
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setState({ ...state, searchTerm: event.target.value });
  };

  const handleSearch = async () => {
    await requestForServer();
  };

  const handlePage = (pageNumber: number) => {
    state.pageNumber = pageNumber;
    setState({ ...state, pageNumber: pageNumber });
    requestForServer();
  };

  async function requestForServer() {
    setState({ ...state, loading: true });
    try {
      await Api(state).then((response) => {
        setState(response);
        setFilteredPokemonList(
          response.pokemonDetails.filter((pokemon: PokemonDescription) =>
            pokemon.name.toLowerCase().includes(state.searchTerm.toLowerCase()),
          ),
        );
        navigate(`/?page=${response.pageNumber}`, { replace: true });
        return response;
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setState({ ...state, loading: false });
    }
  }

  return (
    <>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={state.searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search for Pokemon"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {state.loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={() => handlePage(state.pageNumber - 1)}
            >
              Prev page
            </button>
            <button
              className="pagination-button"
              onClick={() => handlePage(state.pageNumber + 1)}
            >
              Next page
            </button>
          </div>
          <div className="pokemoms_container">
            <PokemonListPage filteredPokemonList={filteredPokemonList} />
            <div className="pokemon-detailed-page">
              <SearchContext.Provider value={state}>
                <Outlet />
              </SearchContext.Provider>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SearchComponent;
