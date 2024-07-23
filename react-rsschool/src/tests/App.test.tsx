import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { ErrorBoundary } from '../components/errorBoundary';

jest.mock('../App', () => () => <div>Mocked App</div>);

test('renders App with ErrorBoundary', () => {
  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  );
  expect(screen.getByText('Mocked App')).toBeInTheDocument();
});
