'use client';
import { PokemonDescription } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedState, removeSelectedState } from '../store/pokemonSlice';
import { RootState } from '../store/store';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function PokemonList({
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
          pokemon!
            .name!.toLowerCase()
            .includes(localStorage.getItem('searchTerm')?.toLowerCase() || ''),
        ),
      ];
      setPokemonListForRender(newFilteredPokemonList);
    };

    updateFilteredPokemonList();
  }, [filteredPokemonList, selectedPokemonList]);

  const dispatch = useDispatch();
  const router = useRouter();

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
    console.log(pokemon);
    const target = event.target as HTMLElement;
    if (target.classList.contains('pokemon-selected')) {
      // Cancel the navigation
      return;
    }
    return router.push(`/details/${pokemon.id}`);
  };

  return (
    <>
      <div className="pokemon-list">
        {pokemonListForRender.map((pokemon) => (
          <Link
            href={`/details/${pokemon.id}`}
            key={pokemon.id}
            onClick={(event) => handleLinkClick(event, pokemon)}
          >
            <div key={pokemon.id} className="pokemon-item">
              <Image
                className="pokemon-image"
                src={`${pokemon?.sprites?.back_default}`}
                alt="pokemon"
                width={100}
                height={100}
              ></Image>
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
                  {pokemon?.name?.toLocaleUpperCase()}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default PokemonList;
