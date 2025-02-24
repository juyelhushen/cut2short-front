import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./modules/Login/Login";
import SignUp from "./modules/Login/SignUp";
import OAuth2Callback from "./auth/OAuth2Callback.jsx";

const Dashboard = lazy(() => import("./layouts/DashBoard.jsx"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/oauth2/callback" element={<OAuth2Callback />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
