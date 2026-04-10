import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');
  const name  = localStorage.getItem('name') || 'User';

  if (location.pathname === '/login' || location.pathname === '/register') return null;

  return (
    <nav className="navbar">
      <Link to={role === 'admin' ? '/admin' : '/quiz'} className="navbar-logo">
        EduQuiz
      </Link>

      <div className="navbar-links">
        {token ? (
          <>
            {role === 'admin' ? (
              <>
                <Link
                  to="/admin"
                  className="nav-link"
                  style={{
                    color: location.pathname === '/admin' ? '#2c3e7a' : '#555',
                    background: location.pathname === '/admin' ? '#eef0fb' : 'transparent',
                  }}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/quiz"
                  className="nav-link"
                  style={{
                    color: location.pathname === '/quiz' ? '#2c3e7a' : '#555',
                    background: location.pathname === '/quiz' ? '#eef0fb' : 'transparent',
                  }}
                >
                  Take Quiz
                </Link>
                <Link
                  to="/results"
                  className="nav-link"
                  style={{
                    color: location.pathname === '/results' ? '#2c3e7a' : '#555',
                    background: location.pathname === '/results' ? '#eef0fb' : 'transparent',
                  }}
                >
                  My Results
                </Link>
              </>
            )}

            <span className="nav-user-tag">{name}</span>

            <button
              className="nav-btn-outline"
              onClick={() => { localStorage.clear(); navigate('/login'); }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    className="nav-link">Login</Link>
            <Link to="/register" className="nav-btn-outline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;