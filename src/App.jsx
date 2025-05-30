import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "@pages/LoadingScreen";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <AppRoutes key="routes" />
          )}
        </AnimatePresence>
      </AuthProvider>
    </Router>
  );
};

export default App;
