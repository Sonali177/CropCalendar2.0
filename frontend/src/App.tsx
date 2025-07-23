import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import CropCalendarPage from './pages/CropCalendarPage';
import { CropCalendarProvider } from './context/CropCalendarContext';
import { agriculturalTheme } from './theme/theme';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={agriculturalTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CropCalendarProvider>
          <Router>
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/crop-calendar" element={<CropCalendarPage />} />
                </Routes>
              </main>
            </div>
          </Router>
        </CropCalendarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
