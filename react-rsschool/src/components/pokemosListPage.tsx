import { Link } from 'react-router-dom';
import { PokemonDescription } from '../types';

function PokemonListPage({
  filteredPokemonList,
}: {
  filteredPokemonList: PokemonDescription[];
}) {
  return (
    <>
      <div className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <Link to={`/details/${pokemon.id}`}>
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default PokemonListPage;
