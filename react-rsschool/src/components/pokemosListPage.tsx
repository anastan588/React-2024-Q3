import { Link, useNavigate } from 'react-router-dom';
import { PokemonDescription } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedState, removeSelectedState } from '../store/pokemonSlice';
import { RootState } from '../store/store';
import React, { useEffect, useState } from 'react';

function PokemonListPage({
  filteredPokemonList,
}: {
  filteredPokemonList: PokemonDescription[];
}) {
  const selectedPokemonList = useSelector(
    (state: RootState) => state.pokemonsData.selectedPokemons,
  );
  const [pokemonListForRender, setPokemonListForRender] = useState<
    PokemonDescription[]
  >([]);

  useEffect(() => {
    const updateFilteredPokemonList = async () => {
      const newFilteredPokemonList: PokemonDescription[] = [
        ...selectedPokemonList.filter((pokemon) =>
          filteredPokemonList.every((el) => pokemon.id !== el.id),
        ),
        ...filteredPokemonList.filter((pokemon) =>
          pokemon.name
            .toLowerCase()
            .includes(localStorage.getItem('searchTerm')?.toLowerCase() || ''),
        ),
      ];
      setPokemonListForRender(newFilteredPokemonList);
    };

    updateFilteredPokemonList();
  }, [filteredPokemonList, selectedPokemonList]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLElement>,
    pokemon: PokemonDescription,
  ) => {
    console.log(event);
    if (selectedPokemonList.some((p) => p.id === pokemon.id)) {
      dispatch(removeSelectedState(pokemon));
    } else {
      dispatch(addSelectedState(pokemon));
    }
    const targetElement = event.target as HTMLInputElement;
    targetElement.checked = true;
    console.log(targetElement);
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLElement>,
    pokemon: PokemonDescription,
  ) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.classList.contains('pokemon-selected')) {
      // Cancel the navigation
      return;
    }
    return navigate(`/details/${pokemon.id}`);
  };

  return (
    <>
      <div className="pokemon-list">
        {pokemonListForRender.map((pokemon) => (
          <Link
            to={`/details/${pokemon.id}`}
            onClick={(event) => handleLinkClick(event, pokemon)}
          >
            <div key={pokemon.id} className="pokemon-item">
              <img
                className="pokemon-image"
                src={`${pokemon.sprites.back_default}`}
                alt="pokemon"
              ></img>
              <input
                className="pokemon-selected"
                checked={selectedPokemonList.some(
                  (item) => item.id === pokemon.id,
                )}
                type="checkbox"
                onChange={(event) => handleCheckboxChange(event, pokemon)}
              ></input>
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
