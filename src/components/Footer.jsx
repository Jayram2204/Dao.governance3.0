import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaTelegram,
  FaCube,
} from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/#features' },
      { label: 'Identity', path: '/identity' },
      { label: 'Voting', path: '/voting' },
      { label: 'Treasury', path: '/treasury' },
    ],
    resources: [
      { label: 'Documentation', path: '/docs' },
      { label: 'API Reference', path: '/api' },
      { label: 'Tutorials', path: '/tutorials' },
      { label: 'Community', path: '/community' },
    ],
    company: [
      { label: 'About', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Disclaimer', path: '/disclaimer' },
    ],
  };

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaDiscord, url: 'https://discord.com', label: 'Discord' },
    { icon: FaTelegram, url: 'https://telegram.org', label: 'Telegram' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FaCube className="footer-logo-icon" />
              <span className="footer-logo-text">DAO 2.0</span>
            </Link>
            <p className="footer-description">
              Empowering decentralized governance with secure identity, transparent voting, and community-controlled treasury management.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-list">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-list">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-list">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} DAO 2.0. All rights reserved.
          </p>
          <p className="footer-tagline">
            Built with ❤️ for the decentralized future
          </p>
        </div>
      </div>
    </footer>
  );
}
