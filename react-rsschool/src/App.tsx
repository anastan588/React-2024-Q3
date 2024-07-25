import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPageComponent from './components/mainPage';
import DetailedPageComponent from './components/detailedPage';
import NotFoundPage from './components/NotFoundPage';
import { ThemeProvider } from './components/themeProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<MainPageComponent />}>
            <Route path="/details/:id" element={<DetailedPageComponent />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
