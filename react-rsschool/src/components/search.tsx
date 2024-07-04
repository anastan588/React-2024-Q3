import { Component } from 'react';
import { Api } from '../api/api';
import { Pokemon, SearchState } from '../types';

export class SearchComponent extends Component<object, SearchState> {
  api: Api;
  filteredPokemonList: Pokemon[];
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      pokemonList: [],
    };
    this.filteredPokemonList = [];
    this.api = new Api();
  }

  async componentDidMount() {
    console.log(this.state.searchTerm);
    await this.api
      .fetchPokemonList(this.state)
      .then((response) => {
        this.state = response;
        this.setState(this.state);
        console.log(this.state);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  async handleSearch() {
    await this.api.fetchPokemonList(this.state).then((response) => {
      this.state = response;
      this.setState(this.state);
      console.log(this.state);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    console.log(this.state);
  }

  render() {
    this.filteredPokemonList = this.state.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()),
    );
    return (
      <div>
        <div className="search-container">
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchInputChange}
            placeholder="Search for Pokemon"
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div className="pokemon-list">
          {this.filteredPokemonList.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-item">
              <h3>{pokemon.name}</h3>
              <p>{pokemon.url}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
