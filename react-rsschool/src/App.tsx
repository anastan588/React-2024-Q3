// import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPageComponent from './components/mainPage';
import DetailedPageComponent from './components/detailedPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPageComponent />}>
        <Route path="/details/:id" element={<DetailedPageComponent />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
