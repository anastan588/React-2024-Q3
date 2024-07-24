/* eslint-disable react-compiler/react-compiler */
import { useEffect } from 'react';
import { SearchState } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from './search';
import { pokemonApi } from '../store/ApiSlice';

function DetailedPageComponent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const state = useContext(SearchContext) as SearchState;
  const useGetPokemonByIdQuery = pokemonApi.endpoints.getPokemonById.useQuery(id!);

  const { data, isLoading, error } = useGetPokemonByIdQuery;

  useEffect(() => {
    const url = `/?page=${state.pageNumber}&details=${id}`;
    window.history.pushState({}, '', url);
    console.log(error);
  }, [isLoading, data]);

  const handleCloseClick = () => {
    navigate(`/?page=${state.pageNumber}`, { replace: true });
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div key={data!.id} className="pok-item">
          <button className="close-button" onClick={handleCloseClick}>
            Close
          </button>
          <img
            className="pokemon-image"
            src={`${data!.sprites.back_default}`}
            alt="pokemon"
          ></img>
          <div className="pokemon-description">
            <h3 className="pokemon-name">{data!.name.toLocaleUpperCase()}</h3>
            <p className="pokemon-description-item">
              <span className="bold">Height:</span> {data!.height}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Weight:</span> {data!.weight}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Base experience:</span>
              {data!.base_experience}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Species:</span>
              {data!.forms.map((specie) => (
                <span> {specie.name} ;</span>
              ))}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Forms:</span>
              {data!.forms.map((form) => (
                <span> {form.name} ;</span>
              ))}
            </p>
            <p className="pokemon-description-item">
              <span className="bold">Abilities:</span>
              {data!.abilities.map((ability) => (
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
                  src={`${data!.sprites.other?.dream_world.front_default}`}
                  alt="pokemon"
                ></img>
              </div>
              <div className="other-item">
                <p className="other-description">
                  <span className="bold">Home</span>
                </p>
                <img
                  className="other-image"
                  src={`${data!.sprites.other?.home.front_default}`}
                  alt="pokemon"
                ></img>
              </div>
              <div className="other-item">
                <p className="other-description">
                  <span className="bold">Showdown</span>
                </p>
                <img
                  className="other-image"
                  src={`${data!.sprites.other?.showdown.front_default}`}
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
