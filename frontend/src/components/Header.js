// frontend/src/components/Header.js (Corrected for v6)

import React, { useContext } from 'react';
// 'useNavigate' replaces 'useHistory'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Header({ theme, toggleTheme }) {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate(); // Get the navigate function

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem('auth-token', '');
    navigate('/login'); // Use navigate to redirect
  };

  return (
    <header className="header">
      <Link to="/" className="title-link"><h1>My To-Do App</h1></Link>
      <nav>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {userData.user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;