'use client';
import './global.css';
import React from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <ErrorBoundary errorComponent={undefined}>
          <head>
            <title>Pokemons</title>
          </head>
          <body>
            <div id="root">{children}</div>
          </body>
        </ErrorBoundary>
      </Provider>
    </html>
  );
}
