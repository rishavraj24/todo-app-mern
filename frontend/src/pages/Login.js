// frontend/src/pages/Login.js (The Strongest Autofill Fix)

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post('http://localhost:5000/auth/login', { email, password });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      navigate('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          {/* --- UPDATED: The strongest trick to stop autofill --- */}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="new-email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          {/* --- UPDATED: The strongest trick to stop autofill --- */}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
        </div>
        <input type="submit" value="Login" />
      </form>
       <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
export default Login;