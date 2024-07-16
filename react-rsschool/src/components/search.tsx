import { useEffect, useState } from 'react';
import Api from '../api/api';
import { PokemonDescription, SearchState } from '../types';

function SearchComponent() {
  const [state, setState] = useState<SearchState>({
    searchTerm: '',
    pokemonList: [],
    loading: false,
    pokemonDetails: [],
  });

  const [filteredPokemonList, setFilteredPokemonList] = useState<
    PokemonDescription[]
  >([]);

  useEffect(() => {
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
            <button className="pagination-button">Prev page</button>
            <button className="pagination-button">Next page</button>
          </div>
          <div className="pokemon-list">
            {filteredPokemonList.map((pokemon) => (
              <div key={pokemon.id} className="pokemon-item">
                <img
                  className="pokemon-image"
                  src={`${pokemon.sprites.back_default}`}
                  alt="pokemon"
                ></img>
                <div className="pokemon-description">
                  <h3 className="pokemon-name">
                    {pokemon.name.toLocaleUpperCase()}
                  </h3>
                  <p className="pokemon-description-item">
                    <span className="bold">Height:</span> {pokemon.height}
                  </p>
                  <p className="pokemon-description-item">
                    <span className="bold">Weight:</span> {pokemon.weight}
                  </p>
                  <p className="pokemon-description-item">
                    <span className="bold">Base experience:</span>{' '}
                    {pokemon.base_experience}
                  </p>
                  <p className="pokemon-description-item">
                    <span className="bold">Abilities:</span>
                    {pokemon.abilities.map((ability) => (
                      <span> {ability.ability.name} </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default SearchComponent;
