import { render, screen, fireEvent } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import { ThemeContext, ThemeProvider } from '../components/themeProvider';
import React from 'react';

describe('ThemeProvider', () => {
  let TestComponent: React.FC;

  beforeEach(() => {
    TestComponent = () => {
      const { theme, toggleTheme } = React.useContext(ThemeContext);
      return (
        <div>
          <p data-testid="theme-value">{theme}</p>
          <button data-testid="toggle-theme" onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
      );
    };
  });

  test('should toggle the theme correctly', () => {
    // Render the ThemeProvider with the TestComponent
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    // Check the initial state
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    // Simulate a click on the "Toggle Theme" button
    act(() => {
      fireEvent.click(screen.getByTestId('toggle-theme'));
    });

    // Check the updated state
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

    // Simulate another click on the "Toggle Theme" button
    act(() => {
      fireEvent.click(screen.getByTestId('toggle-theme'));
    });

    // Check the updated state
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });
});
