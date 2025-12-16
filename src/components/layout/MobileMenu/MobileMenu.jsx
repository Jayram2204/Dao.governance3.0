import React from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/proposals', label: 'Proposals' },
    { path: '/voting', label: 'Voting' },
    { path: '/treasury', label: 'Treasury' },
    { path: '/members', label: 'Members' },
    { path: '/governance', label: 'Governance' },
  ];

  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      />
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="mobile-menu-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <nav className="mobile-menu-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="mobile-menu-link"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
