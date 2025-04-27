import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const location = useLocation();

  // Show header only on protected routes (not login or signup)
  const showHeader = location.pathname !== '/' && location.pathname !== '/signup';

  return (
    <div className="App">
      {showHeader && <Header />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div>Profile Page (TBD)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <div>Recommendations Page (TBD)</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

// Wrap App with Router to use useLocation
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}