/* eslint-disable react-compiler/react-compiler */
'use client';
import { createContext, useEffect, useState } from 'react';
import { SearchState } from '../types';
import PokemonList from './pokemonList.tsx';
import { useNavigate } from 'react-router-dom';
import { pokemonApi } from '../store/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { initPageLoad, initState, initStateLoad } from '../store/pokemonSlice';
import { RootState } from '../store/store';

export const SearchContext = createContext<SearchState | undefined>(undefined);

function SearchComponent({ children }: { children: React.ReactNode }) {
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

  const { data, error, isLoading } = useGetPokemonsQuery({
    searchTerm: statePoki.searchTerm,
    pageNumber: statePoki.pageNumber,
  });

  useEffect(() => {
    if (!isLoading && !error) {
      setState((prevState) => ({
        ...prevState,
        pokemonList: data!.results,
      }));
      console.log(error);
    }
  }, [isLoading, error, data]);

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
      dispatch(initPageLoad(statePoki.pageNumber));
      navigate(`/?page=${statePoki.pageNumber}`, { replace: true });
      setTimeout(() => {
        statePoki.loading = false;
        dispatch(initStateLoad(statePoki.loading));
      }, 1200);
      console.log(pokemonDetailsError);
    }
  }, [pokemonDetailsLoading, pokemonDetails]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    searchTerm = event.target.value;
    localStorage.setItem('searchTerm', searchTerm);
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
    dispatch(initPageLoad(pageNumber));
    statePoki.pageNumber = pageNumber;
    localStorage.setItem('pageNumber', statePoki.pageNumber.toString());
    navigate(`/?page=${statePoki.pageNumber}`, { replace: true });
    setTimeout(() => {
      statePoki.loading = false;
      dispatch(initStateLoad(statePoki.loading));
    }, 1200);
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
            <PokemonList filteredPokemonList={filteredPokemonList} />
            <div className="pokemon-detailed-page">
              <SearchContext.Provider value={statePoki}>
                {children}
              </SearchContext.Provider>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SearchComponent;
