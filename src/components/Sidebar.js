import React from 'react';
import { FaUser, FaSignOutAlt, FaCog, FaHome, FaClipboardList, FaChartBar, FaUserShield, FaUserFriends, FaQrcode } from 'react-icons/fa';
import './Sidebar.css';

const navItemsByRole = {
  student: [
    { label: 'Dashboard', icon: <FaHome />, path: '/student' },
    { label: 'Attendance', icon: <FaClipboardList />, path: '/student/attendance' },
    { label: 'Outpass', icon: <FaQrcode />, path: '/student/outpass' },
    { label: 'Settings', icon: <FaCog />, path: '/student/settings' },
  ],
  parent: [
    { label: 'Dashboard', icon: <FaHome />, path: '/parent' },
    { label: 'Child Attendance', icon: <FaClipboardList />, path: '/parent/attendance' },
    { label: 'Outpass Requests', icon: <FaQrcode />, path: '/parent/outpass' },
    { label: 'Settings', icon: <FaCog />, path: '/parent/settings' },
  ],
  guard: [
    { label: 'Dashboard', icon: <FaHome />, path: '/guard' },
    { label: 'Attendance Marking', icon: <FaClipboardList />, path: '/guard/attendance' },
    { label: 'Settings', icon: <FaCog />, path: '/guard/settings' },
  ],
  warden: [
    { label: 'Dashboard', icon: <FaHome />, path: '/warden' },
    { label: 'Attendance', icon: <FaClipboardList />, path: '/warden/attendance' },
    { label: 'Outpass Approvals', icon: <FaQrcode />, path: '/warden/outpass' },
    { label: 'Analytics', icon: <FaChartBar />, path: '/warden/analytics' },
    { label: 'Settings', icon: <FaCog />, path: '/warden/settings' },
  ],
  admin: [
    { label: 'Dashboard', icon: <FaHome />, path: '/admin' },
    { label: 'All Attendance', icon: <FaClipboardList />, path: '/admin/attendance' },
    { label: 'All Outpasses', icon: <FaQrcode />, path: '/admin/outpass' },
    { label: 'User Management', icon: <FaUserFriends />, path: '/admin/users' },
    { label: 'Analytics', icon: <FaChartBar />, path: '/admin/analytics' },
    { label: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  ],
};

export default function Sidebar({ user, role, onLogout }) {
  const navItems = navItemsByRole[role] || [];
  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <a key={item.label} href={item.path} className="sidebar-link">
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </a>
        ))}
      </div>
      <div className="sidebar-profile">
        <button className="sidebar-profile-btn">
          <FaUser className="sidebar-profile-icon" />
          <span>View profile</span>
        </button>
        <div className="sidebar-profile-info">
          <span className="sidebar-profile-name">{user?.name || 'User'}</span>
          <span className="sidebar-profile-email">{user?.email}</span>
        </div>
        <button className="sidebar-logout-btn" onClick={onLogout}>
          <FaSignOutAlt /> Log out
        </button>
      </div>
    </div>
  );
} 