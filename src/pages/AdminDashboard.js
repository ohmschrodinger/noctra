import React from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'admin';
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar user={user} role={role} onLogout={handleLogout} />
      <div style={{ color: '#fff', padding: '2rem 2rem 2rem 270px', width: '100%' }}>
        <h1>Welcome, Admin!</h1>
        <p>This is the Admin Dashboard.</p>
      </div>
    </div>
  );
} 