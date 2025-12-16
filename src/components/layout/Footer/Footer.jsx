import { FaTwitter, FaDiscord, FaGithub, FaTelegram, FaMedium } from 'react-icons/fa';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">DAO 2.0</h3>
            <p className="footer-description">
              Building the future of decentralized governance, one proposal at a time.
            </p>
            <div className="footer-social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <FaDiscord />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <FaTelegram />
              </a>
              <a href="https://medium.com" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                <FaMedium />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/whitepaper">Whitepaper</a></li>
              <li><a href="/api">API</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Community</h4>
            <ul className="footer-links">
              <li><a href="/governance">Governance</a></li>
              <li><a href="/forum">Forum</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/events">Events</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} DAO 2.0. All rights reserved.
          </p>
          <p className="footer-tagline">
            Powered by Ethereum • Built with ❤️ by the community
          </p>
        </div>
      </div>
    </footer>
  );
};
