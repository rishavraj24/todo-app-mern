// frontend/src/pages/Signup.js (Corrected for v6)

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Corrected import
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState('');
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate(); // Corrected hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== passwordCheck) {
                setError("Passwords do not match.");
                return;
            }
            await axios.post('http://localhost:5000/auth/signup', { username, email, password });
            const loginRes = await axios.post('http://localhost:5000/auth/login', { email, password });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem('auth-token', loginRes.data.token);
            navigate('/'); // Corrected navigation
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="auth-page">
            <h2>Sign Up</h2>
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Username:</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
                <div className="form-group"><label>Email:</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                <div className="form-group"><label>Password:</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required /></div>
                <div className="form-group"><label>Confirm Password:</label><input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} required /></div>
                <input type="submit" value="Sign Up" />
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}
export default Signup;