import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUserShield,
  FaVoteYea,
  FaCoins,
  FaChartLine,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import './Sidebar.css';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Dashboard' },
    { path: '/identity', icon: FaUserShield, label: 'Identity' },
    { path: '/voting', icon: FaVoteYea, label: 'Voting' },
    { path: '/treasury', icon: FaCoins, label: 'Treasury' },
    { path: '/analytics', icon: FaChartLine, label: 'Analytics' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        {/* Menu Items */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                title={collapsed ? item.label : ''}
              >
                <Icon className="sidebar-icon" />
                {!collapsed && <span className="sidebar-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </aside>
  );
}
