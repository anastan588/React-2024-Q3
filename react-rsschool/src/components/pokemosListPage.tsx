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
              <input className='pokemon-selected' type="checkbox"></input>
              <div className="pokemon-description">
                <h3 className="pokemon-name">
                  {pokemon.name.toLocaleUpperCase()}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}


export default PokemonListPage;
