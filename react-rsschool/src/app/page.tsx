'use client';

import MainPageComponent from '../components/mainPage';
import { ThemeProvider } from '../components/themeProvider';
import { BrowserRouter } from 'react-router-dom';

function App({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MainPageComponent>{children}</MainPageComponent>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
