import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import QuizPage from './pages/QuizPage';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');
  return token && role === 'admin' ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Navigate to="/login" replace />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz"     element={<PrivateRoute><QuizPage /></PrivateRoute>} />
        <Route path="/results"  element={<PrivateRoute><Results /></PrivateRoute>} />
        <Route path="/admin"    element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*"         element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;