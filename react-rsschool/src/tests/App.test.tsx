import React from 'react';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { ThemeProvider } from '../components/themeProvider';
import App from '../App';
import { store } from '../store/store';



describe('App', () => {
  test('renders the main page component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );
    setTimeout(()=> {expect(screen.getByTestId('main-page')).toBeInTheDocument();
    },1000)
    
  });

  test('renders the detailed page component when navigating to /details/:id', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );
    setTimeout(()=> {
       window.history.pushState({}, '', '/details/1');
    expect(screen.getByTestId('detailed-page')).toBeInTheDocument();
    }, 1000)
   
  });

  test('renders the not found page component for invalid routes', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );
    setTimeout(()=> {window.history.pushState({}, '', '/invalid-route');
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    },1000)
    
  });
});