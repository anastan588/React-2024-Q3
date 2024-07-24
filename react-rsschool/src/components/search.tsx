/* eslint-disable react-compiler/react-compiler */
import { createContext, useEffect, useState } from 'react';
import { SearchState } from '../types';
import PokemonListPage from './pokemosListPage';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { pokemonApi } from '../store/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { initState, initStateLoad } from '../store/pokemonSlice';
import { RootState } from '../store/store';

export const SearchContext = createContext<SearchState | undefined>(undefined);

function SearchComponent() {
  const [statePoki, setState] = useState<SearchState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    pokemonList: [],
    loading: true,
    pokemonDetails: [],
    pageNumber: 1,
  });

  let searchTerm = '';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredPokemonList = useSelector(
    (state: RootState) => state.pokemonsData.pokemons,
  );

  const isLoadingMain = useSelector(
    (state: RootState) => state.pokemonsData.isLoading,
  );

  const useGetPokemonsQuery = pokemonApi.endpoints.getPokemons.useQuery;
  const useGetPokemonByNamesQuery =
    pokemonApi.endpoints.getPokemonByNames.useQuery;
  // setState({ ...state, searchTerm: state.searchTerm });

  const { data, error, isLoading } = useGetPokemonsQuery({
    searchTerm: statePoki.searchTerm,
    pageNumber: statePoki.pageNumber,
  });

  useEffect(() => {
    if (!isLoading) {
      setState((prevState) => ({
        ...prevState,
        pokemonList: data!.results,
      }));
      console.log(error);
    }
  }, [isLoading, data]);
  const pokemonsNames = statePoki.pokemonList.map((pokemon) => {
    return pokemon.name;
  });

  const {
    data: pokemonDetails,
    isLoading: pokemonDetailsLoading,
    error: pokemonDetailsError,
  } = useGetPokemonByNamesQuery(pokemonsNames);

  useEffect(() => {
    if (!pokemonDetailsLoading) {
      setState((prevState) => ({
        ...prevState,
        pokemonDetails: pokemonDetails!,
      }));
      dispatch(initState(pokemonDetails!));
      navigate(`/?page=${statePoki.pageNumber}`, { replace: true });
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
      dispatch(initStateLoad(statePoki.loading));
      console.log(pokemonDetailsError);
    }
  }, [pokemonDetailsLoading, pokemonDetails]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    searchTerm = event.target.value;
  };

  const handleSearch = async () => {
    statePoki.searchTerm = searchTerm;
    statePoki.loading = true;
    dispatch(initStateLoad(statePoki.loading));
    statePoki.loading = false;
    dispatch(initStateLoad(statePoki.loading));
  };

  const handlePage = (pageNumber: number) => {
    statePoki.loading = true;
    dispatch(initStateLoad(statePoki.loading));
    statePoki.pageNumber = pageNumber;
    setTimeout(() => {
      statePoki.loading = false;
      dispatch(initStateLoad(statePoki.loading));
    }, 500);
  };

  return (
    <>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          onChange={handleSearchInputChange}
          placeholder="Search for Pokemon"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isLoadingMain ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={() => handlePage(statePoki.pageNumber - 1)}
            >
              Prev page
            </button>
            <button
              className="pagination-button"
              onClick={() => handlePage(statePoki.pageNumber + 1)}
            >
              Next page
            </button>
          </div>
          <div className="pokemoms_container">
            <PokemonListPage
              filteredPokemonList={filteredPokemonList.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(statePoki.searchTerm),
              )}
            />
            <div className="pokemon-detailed-page">
              <SearchContext.Provider value={statePoki}>
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
