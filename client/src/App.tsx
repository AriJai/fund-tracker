import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage/HomePage';
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage/RegistrationPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

