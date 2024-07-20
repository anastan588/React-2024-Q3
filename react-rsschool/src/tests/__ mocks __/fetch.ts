import { mockPokemonDetails } from "./mockPokemonDetails";

const fetchMock = jest.fn().mockResolvedValueOnce({
  json: () => Promise.resolve(mockPokemonDetails),
});

export default fetchMock;