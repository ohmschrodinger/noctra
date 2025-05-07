import React, { useState } from 'react';
import './Login.css';

const roles = [
  { label: 'Student', value: 'student' },
  { label: 'Parent', value: 'parent' },
  { label: 'Guard', value: 'guard' },
  { label: 'Warden', value: 'warden' },
  { label: 'Admin', value: 'admin' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(roles[0].value);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelect = (role) => setSelectedRole(role);
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    alert(`Logging in as ${selectedRole} with email ${email}`);
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
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-submit">Login</button>
        </form>
        <div className="login-footer">
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
} 