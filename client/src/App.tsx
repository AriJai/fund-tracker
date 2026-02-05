import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';
import { fetchCurrentuser } from './redux/auth/authActions';
const RegistrationPage = React.lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage/DashboardPage'));


function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentuser());
  }, [dispatch])


  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path='/login'
            element={
              <PublicRoute>
                <Suspense fallback={<div>Loading FundTracker...</div>}>
                  <LoginPage />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route 
            path='/dashboard'
            element={
              <PrivateRoute>
                <Suspense fallback={<div>Loading FundTracker...</div>}>
                  <DashboardPage />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

