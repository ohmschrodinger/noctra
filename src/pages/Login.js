import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const roles = [
  { label: 'Student', value: 'student' },
  { label: 'Parent', value: 'parent' },
  { label: 'Guard', value: 'guard' },
  { label: 'Warden', value: 'warden' },
  { label: 'Admin', value: 'admin' },
];

// Backend API URL
const API_URL = 'http://localhost:5000'; // Add this line

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(roles[0].value);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => setSelectedRole(role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {  // Update this line
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect based on role
        switch (selectedRole) {
          case 'student':
            navigate('/student');
            break;
          case 'parent':
            navigate('/parent');
            break;
          case 'guard':
            navigate('/guard');
            break;
          case 'warden':
            navigate('/warden');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/');
        }
      }
    } catch (err) {
      setError('Network error');
      console.error('Login error:', err);  // Add more detailed error logging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <div className="role-selector">
          {roles.map((role) => (
            <button
              key={role.value}
              className={`role-btn${selectedRole === role.value ? ' selected' : ''}`}
              onClick={() => handleRoleSelect(role.value)}
              type="button"
              disabled={loading}
            >
              {role.label}
            </button>
          ))}
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
            disabled={loading}
          />
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <div style={{ color: '#ff4d4f', marginTop: '1rem' }}>{error}</div>}
        <div className="login-footer">
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}