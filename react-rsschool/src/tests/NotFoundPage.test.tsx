import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NotFoundPage', () => {
  it('renders the component correctly', () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('navigates to the main page when the button is clicked', () => {
    const mockedNavigate = jest.fn();
    jest.mocked(useNavigate).mockReturnValue(mockedNavigate);

    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    const mainPageButton = screen.getByText('Main page');
    fireEvent.click(mainPageButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});