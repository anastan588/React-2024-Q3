// import { useState } from 'react';
import './App.css';
import { SearchComponent } from './components/search';

function App() {
  return (
    <div className="main_container">
      <header className="header">
        <h1>Pokemons</h1>
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

export default App;
