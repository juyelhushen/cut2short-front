import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
    </Router>
  );
};

export default App;
