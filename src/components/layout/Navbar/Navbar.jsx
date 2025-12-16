import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { 
  FaBars, 
  FaTimes, 
  FaCube, 
  FaVoteYea, 
  FaCoins, 
  FaChartLine, 
  FaTrophy, 
  FaUser,
  FaBook,
  FaDiscord,
  FaTwitter
} from 'react-icons/fa';
import './Navbar.css';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected } = useAccount();

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaCube /> },
    { path: '/voting', label: 'Governance', icon: <FaVoteYea /> },
    { path: '/advanced-voting', label: 'Advanced', icon: <FaVoteYea /> },
    { path: '/treasury', label: 'Treasury', icon: <FaCoins /> },
    { path: '/analytics', label: 'Analytics', icon: <FaChartLine /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <FaTrophy /> },
    { path: '/identity', label: 'Profile', icon: <FaUser /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <FaCube className="logo-icon" />
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-text">DAO 2.0</span>
            <span className="logo-subtitle">Governance</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <span className="nav-link-icon">{link.icon}</span>
              <span className="nav-link-text">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Wallet Connect Button */}
          <div className="wallet-connect-wrapper">
            <ConnectButton
              chainStatus="icon"
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span className="mobile-nav-text">{link.label}</span>
              </Link>
            ))}
            
            <div className="mobile-menu-divider"></div>
            
            <div className="mobile-wallet-connect">
              <ConnectButton
                chainStatus="icon"
                showBalance={false}
                accountStatus="full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Connection Status Indicator */}
      {isConnected && (
        <div className="connection-indicator">
          <div className="connection-dot"></div>
        </div>
      )}
    </nav>
  );
};
