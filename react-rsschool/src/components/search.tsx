import { Component } from 'react';
import { Api } from '../api/api';
import { PokemonDescription, SearchState } from '../types';

export class SearchComponent extends Component<object, SearchState> {
  api: Api;
  filteredPokemonList: PokemonDescription[];

  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      pokemonList: [],
      loading: false,
      pokemonDetails: [],
    };
    this.filteredPokemonList = [];
    this.api = new Api();
  }

  async componentDidMount() {
    await this.requestForServer();
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = async () => {
    await this.requestForServer();
  };

  async requestForServer() {
    this.setState({ loading: true });
    await this.api
      .fetchPokemonList(this.state)
      .then((response) => {
        this.state = response;
        this.setState(this.state);
        this.filteredPokemonList = this.state.pokemonDetails.filter(
          (pokemon) => {
            return pokemon.name
              .toLowerCase()
              .includes(this.state.searchTerm.toLowerCase());
          },
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchInputChange}
            placeholder="Search for Pokemon"
          />
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        </div>
        {this.state.loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            <div className="pagination-container">
              <button className="pagination-button">Prev page</button>
              <button className="pagination-button">Next page</button>
            </div>
            <div className="pokemon-list">
              {this.filteredPokemonList.map((pokemon) => (
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
}
