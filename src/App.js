// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary components for routing
import MainPage from './InputPage'; // Import the MainPage component (the form for creating entries)
import HiPage from './ViewDataPage'; // Import the HiPage component (the page for viewing saved data)
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    // Define the routes for the app
    <Routes>
      {/* Route for the MainPage (input page for creating campaigns, sessions, etc.) */}
      <Route path="/" element={<MainPage />} /> {/* Main page route, mapped to the MainPage component */}

      {/* Route for the HiPage (view saved data) */}
      <Route path="/hi" element={<HiPage />} /> {/* HiPage route, mapped to the HiPage component */}
    </Routes>
  );
}

export default App; // Export the App component to be used in other files

