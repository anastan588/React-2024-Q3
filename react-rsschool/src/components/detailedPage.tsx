import { useEffect, useState } from 'react';
import { PokemonDescription, SearchState } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from './search';

function DetailedPageComponent() {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDescription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const state = useContext(SearchContext) as SearchState;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setIsLoading(true);
      try {
        const response: PokemonDescription = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        ).then((res) => res.json());
        setPokemonDetails(response);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      } finally {
        setIsLoading(false);
        const url = `/?page=${state.pageNumber}&id=${id}`;
        window.history.pushState({}, '', url);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  const handleCloseClick = () => {
    navigate(`/?page=${state.pageNumber}`, { replace: true });
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div key={pokemonDetails.id} className="pok-item">
          <button className="close-button" onClick={handleCloseClick}>
            Close
          </button>
          <img
            className="pokemon-image"
            src={`${pokemonDetails.sprites.back_default}`}
            alt="pokemon"
          ></img>
          <div className="pokemon-description">
            <h3 className="pokemon-name">
              {pokemonDetails.name.toLocaleUpperCase()}
            </h3>
            <p className="pokemon-description-item">
              <span className="bold">Height:</span> {pokemonDetails.height}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Weight:</span> {pokemonDetails.weight}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Base experience:</span>{' '}
              {pokemonDetails.base_experience}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Species:</span>
              {pokemonDetails.forms.map((specie) => (
                <span> {specie.name} ;</span>
              ))}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Forms:</span>
              {pokemonDetails.forms.map((form) => (
                <span> {form.name} ;</span>
              ))}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Abilities:</span>
              {pokemonDetails.abilities.map((ability) => (
                <span> {ability.ability.name} ;</span>
              ))}
            </p>
            <div className="other_information">
              <div className="other-item">
                <p className="other-description">
                  <span className="bold">Dream world</span>
                </p>
                <img
                  className="other-image"
                  src={`${pokemonDetails.sprites.other?.dream_world.front_default}`}
                  alt="pokemon"
                ></img>
              </div>
              <div className="other-item">
                <p className="other-description">
                  <span className="bold">Home</span>
                </p>
                <img
                  className="other-image"
                  src={`${pokemonDetails.sprites.other?.home.front_default}`}
                  alt="pokemon"
                ></img>
              </div>
              <div className="other-item">
                <p className="other-description">
                  <span className="bold">Showdown</span>
                </p>
                <img
                  className="other-image"
                  src={`${pokemonDetails.sprites.other?.showdown.front_default}`}
                  alt="pokemon"
                ></img>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailedPageComponent;
