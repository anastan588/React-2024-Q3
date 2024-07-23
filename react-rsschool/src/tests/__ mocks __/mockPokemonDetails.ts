export const mockPokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  forms: [{ name: 'bulbasaur' }],
  abilities: [{ ability: { name: 'overgrow' } }],
  sprites: {
    back_default: 'https://example.com/bulbasaur.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/bulbasaur-dream.png',
      },
      home: { front_default: 'https://example.com/bulbasaur-home.png' },
      showdown: {
        front_default: 'https://example.com/bulbasaur-showdown.png',
      },
    },
  },
};
