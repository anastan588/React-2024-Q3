// import { useState } from 'react';
import { Component } from 'react';
import './App.css';
import { SearchComponent } from './components/search';

class App extends Component {
  state = {
    errorThrown: false,
  };

  throwError = () => {
    this.setState({ errorThrown: true });
  };

  render() {
    if (this.state.errorThrown) {
      throw new Error('This is a test error');
    }
    return (
      <div className="main_container">
        <header className="header">
          <h1>Pokemons</h1>
          <button className="error-button" onClick={this.throwError}>
            Throw Error
          </button>
        </header>
        <main className="main">
          <SearchComponent></SearchComponent>
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
}

export default App;
