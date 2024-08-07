import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/errorBoundary';

describe('ErrorBoundary', () => {
  const ChildComponent = () => {
    throw new Error('Test error');
    return <div>Child component</div>;
  };

  it('should render the error message when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('should render the children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Hello, world!</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
