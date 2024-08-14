/* eslint-disable react-refresh/only-export-components */

import { useEffect } from 'react';
import { Pokemon, PokemonDescription, SearchState } from '../../types';
import { useContext } from 'react';
import { SearchContext } from '../../components/search';
import Image from 'next/image';
import { useRouter } from 'next/router';

export async function getPokemon({ params }: { params: { id: string } }) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`,
  );
  const pokemonData: PokemonDescription = await response.json();
  console.log(pokemonData);
  return pokemonData;
}

export async function generateStaticParams() {
  const searchTerm = localStorage.getItem('searchTerm') || '';
  const pageNumber = Number(localStorage.getItem('pageNumber')) || 1;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?search=${searchTerm}&limit=30&offset=${pageNumber}`,
  );
  const pokemons: Pokemon[] = await response.json();
  const paths = pokemons.map((pokemon: Pokemon) => ({
    params: { id: pokemon.url.split('/')[pokemon.url.split('/').length - 1] },
  }));
  return paths.map((path) => ({
    id: path,
  }));
  // return {
  //   paths,
  //   fallback: true,
  // };
}

async function Page() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  console.log(id);
  // const navigate = useNavigate();
  const state = useContext(SearchContext) as SearchState;
  const pokemonData = await getPokemon({ params: { id: id } });
  // const useGetPokemonByIdQuery = pokemonApi.endpoints.getPokemonById.useQuery(
  //   id.toString(),
  // );
  // const { data, isLoading, error } = useGetPokemonByIdQuery;

  useEffect(() => {
    const url = `/?page=${state.pageNumber}&details=${pokemonData.id}`;
    window.history.pushState({}, '', url);
  }, []);

  const handleCloseClick = () => {
    router.push(`/?page=${state.pageNumber}`, undefined, { shallow: true });
  };

  if (router.isFallback) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <>
      <div key={pokemonData!.id} className="pok-item">
        <button className="close-button" onClick={handleCloseClick}>
          Close
        </button>
        <Image
          className="pokemon-image"
          src={`${pokemonData?.sprites?.back_default}`}
          alt="pokemon"
          width={100}
          height={100}
        ></Image>
        <div className="pokemon-description">
          <h3 className="pokemon-name">
            {`${pokemonData?.name?.toLocaleUpperCase()}`}
          </h3>
          <p className="pokemon-description-item">
            <span className="bold">Height:</span> {pokemonData!.height}
          </p>
          <p className="pokemon-description-item">
            <span className="bold">Weight:</span> {pokemonData!.weight}
          </p>
          <p className="pokemon-description-item">
            <span className="bold">Base experience:</span>
            {pokemonData!.base_experience}
          </p>
          <p className="pokemon-description-item">
            <span className="bold">Species:</span>
            {pokemonData?.forms?.map((specie) => (
              <span key={specie.url}> {specie.name} ;</span>
            ))}
          </p>
          <p className="pokemon-description-item">
            <span className="bold">Forms:</span>
            {pokemonData?.forms?.map((form) => (
              <span key={form.url}> {form.name} ;</span>
            ))}
          </p>
          <p className="pokemon-description-item">
            <span className="bold">Abilities:</span>
            {pokemonData?.abilities?.map((ability) => (
              <span key={ability.ability.url}> {ability.ability.name} ;</span>
            ))}
          </p>
          <div className="other_information">
            <div className="other-item">
              <p className="other-description">
                <span className="bold">Dream world</span>
              </p>
              <Image
                className="other-image"
                src={`${pokemonData?.sprites?.other?.dream_world.front_default}`}
                alt="pokemon"
                width={50}
                height={50}
              ></Image>
            </div>
            <div className="other-item">
              <p className="other-description">
                <span className="bold">Home</span>
              </p>
              <Image
                className="other-image"
                src={`${pokemonData?.sprites?.other?.home.front_default}`}
                alt="pokemon"
                width={50}
                height={50}
              ></Image>
            </div>
            <div className="other-item">
              <p className="other-description">
                <span className="bold">Showdown</span>
              </p>
              <Image
                className="other-image"
                src={`${pokemonData?.sprites?.other?.showdown.front_default}`}
                alt="pokemon"
                width={50}
                height={50}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
