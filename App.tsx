import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import DriversManagement from './pages/admin/DriversManagement';
import AlertsHistory from './pages/admin/AlertsHistory';
import Settings from './pages/admin/Settings';
import UserProfile from './pages/user/UserProfile';
import UserAlerts from './pages/user/UserAlerts';
import UserTrips from './pages/user/UserTrips';
import UserLiveDetection from './pages/user/UserLiveDetection';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Navigate to="/admin/dashboard\" replace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/drivers" 
            element={
              <ProtectedRoute requiredRole="admin">
                <DriversManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/alerts" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AlertsHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Settings />
              </ProtectedRoute>
            } 
          />
          
          {/* User Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute requiredRole="user">
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/alerts" 
            element={
              <ProtectedRoute requiredRole="user">
                <UserAlerts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trips" 
            element={
              <ProtectedRoute requiredRole="user">
                <UserTrips />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/live-detection" 
            element={
              <ProtectedRoute requiredRole="user">
                <UserLiveDetection />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Redirect */}
          <Route 
            path="/" 
            element={<Navigate to="/login\" replace />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;