'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { cleanSelectedState } from '../store/pokemonSlice';
import { saveAs } from 'file-saver';

const FlyoutComponent = () => {
  const selectedPokemonList = useSelector(
    (state: RootState) => state.pokemonsData.selectedPokemons,
  );
  const dispatch = useDispatch();
  const handleUselectAllClick = () => {
    dispatch(cleanSelectedState());
  };

  const handleDownLoadClick = () => {
    const fileName = `${selectedPokemonList.length}_pokemons.csv`;
    const csvRows = [['ID', 'Name', `Abilities`, 'Details URL']];
    for (const pokemon of selectedPokemonList) {
      csvRows.push([
        pokemon.id.toString(),
        pokemon!.name!,
        `${pokemon!
          .abilities!.map((el) => el.ability.name)
          .join(';')
          .toUpperCase()}`,
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
      ]);
    }
    const csvData = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, fileName);
  };

  return (
    <div className="flyout-container">
      <h3 className="flyout-text">{`${selectedPokemonList.length} pokemons are selected`}</h3>
      <div className="flyout_buttons">
        <button className="flyout_button" onClick={handleUselectAllClick}>
          Unselect all
        </button>
        <button className="flyout_button" onClick={handleDownLoadClick}>
          Download
        </button>
      </div>
    </div>
  );
};

export default FlyoutComponent;
