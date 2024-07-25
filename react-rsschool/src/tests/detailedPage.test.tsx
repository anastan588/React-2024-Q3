import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { SearchContext } from '../components/search';
import DetailedPageComponent from '../components/detailedPage';
import fetchMock from './__ mocks __/fetch';
import { mockPokemonDetails } from './__ mocks __/mockPokemonDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('DetailedPageComponent', () => {
  const mockSearchState = {
    pageNumber: 1,
    searchTerm: '',
    pokemonList: [],
    loading: false,
    pokemonDetails: [],
  };

  beforeEach(() => {
    jest.mocked(useParams).mockReturnValue({ id: '1' });
    jest.mocked(useNavigate).mockReturnValue(jest.fn());
  });

  it('should render the loading state', () => {
    render(
      <Router>
        <SearchContext.Provider value={mockSearchState}>
          <DetailedPageComponent />
        </SearchContext.Provider>
      </Router>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the pokemon details', async () => {
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPokemonDetails),
    });

    render(
      <Router>
        <SearchContext.Provider value={mockSearchState}>
          <DetailedPageComponent />
        </SearchContext.Provider>
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes('bulbasaur')),
      ).toBeInTheDocument();
      expect(screen.getByAltText('pokemon')).toHaveAttribute(
        'src',
        'https://example.com/bulbasaur.png',
      );
      expect(screen.getByText('Height: 7')).toBeInTheDocument();
      expect(screen.getByText('Weight: 69')).toBeInTheDocument();
      expect(screen.getByText('Base experience: 64')).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes('bulbasaur ;')),
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes('overgrow ;')),
      ).toBeInTheDocument();
      expect(screen.getByAltText('pokemon')).toHaveAttribute(
        'src',
        'https://example.com/bulbasaur-dream.png',
      );
      expect(screen.getByAltText('pokemon')).toHaveAttribute(
        'src',
        'https://example.com/bulbasaur-home.png',
      );
      expect(screen.getByAltText('pokemon')).toHaveAttribute(
        'src',
        'https://example.com/bulbasaur-showdown.png',
      );
    });
  });

  it('should navigate to the search page when the close button is clicked', () => {
    const mockedNavigate = jest.fn();
    jest.mocked(useNavigate).mockReturnValue(mockedNavigate);

    render(
      <Router>
        <SearchContext.Provider value={mockSearchState}>
          <DetailedPageComponent />
        </SearchContext.Provider>
      </Router>,
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/?page=1', { replace: true });
  });
});
