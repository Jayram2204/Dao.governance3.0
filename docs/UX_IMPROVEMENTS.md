# ⚡ UX Improvements Guide

## Making Your DAO Feel Professional

These improvements transform your DAO from functional to delightful.

## 1. Global Toast Notifications

### Install React Hot Toast

```bash
npm install react-hot-toast
```

### Setup in main.jsx

```javascript
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
        },
        success: {
          iconTheme: {
            primary: 'var(--accent-teal)',
            secondary: 'var(--bg-secondary)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--accent-red)',
            secondary: 'var(--bg-secondary)',
          },
        },
      }}
    />
  </React.StrictMode>
);
```

### Use in Hooks

Already implemented in `src/hooks/useDAO.js`:

```javascript
import toast from 'react-hot-toast';

useEffect(() => {
  if (isConfirmed) {
    toast.success('Vote cast successfully!');
  }
  if (error) {
    toast.error(parseError(error));
  }
}, [isConfirmed, error]);
```

## 2. Empty States

### Create EmptyState Component

```javascript
// src/components/ui/EmptyState/EmptyState.jsx
import { Button } from '../Button/Button';
import './EmptyState.css';

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
```

```css
/* src/components/ui/EmptyState/EmptyState.css */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-state-icon {
  font-size: 4rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.empty-state-description {
  color: var(--text-secondary);
  max-width: 400px;
  margin-bottom: 2rem;
  line-height: 1.6;
}
```

### Use in ProposalList

```javascript
if (!mockProposals || mockProposals.length === 0) {
  return (
    <Card>
      <EmptyState
        icon="📝"
        title="No Proposals Yet"
        description="Be the first to create a proposal and shape the future of this DAO."
        actionLabel="Create Proposal"
        onAction={() => navigate('/create-proposal')}
      />
    </Card>
  );
}
```

## 3. Graceful Error Handling

### Create Error Parser

```javascript
// src/utils/errorParser.js

export const parseError = (error) => {
  if (!error) return 'An unknown error occurred';

  const message = error.message || error.shortMessage || String(error);

  // User rejected transaction
  if (message.includes('user rejected') || message.includes('User denied')) {
    return 'Transaction rejected in wallet';
  }

  // Insufficient funds
  if (message.includes('insufficient funds')) {
    return "You don't have enough ETH for gas fees";
  }

  // Already voted
  if (message.includes('already voted')) {
    return 'You have already voted on this proposal';
  }

  // Voting not active
  if (message.includes('not active')) {
    return 'Voting period has ended for this proposal';
  }

  // No voting power
  if (message.includes('no voting power') || message.includes('insufficient voting power')) {
    return 'You need to delegate your tokens to vote';
  }

  // Proposal threshold not met
  if (message.includes('below proposal threshold')) {
    return 'You need more tokens to create a proposal';
  }

  // Network error
  if (message.includes('network') || message.includes('timeout')) {
    return 'Network error. Please check your connection';
  }

  // Contract error
  if (message.includes('execution reverted')) {
    return 'Transaction failed. Please try again';
  }

  // Default: show first 100 characters
  return message.substring(0, 100);
};
```

### Use in Components

```javascript
import { parseError } from '../../utils/errorParser';

{error && (
  <p style={{ color: 'var(--accent-red)' }}>
    {parseError(error)}
  </p>
)}
```

## 4. Mobile Responsiveness

### Update Navbar for Mobile

```css
/* src/components/layout/Navbar/Navbar.css */

@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
  }

  .navbar-links {
    display: none; /* Hide by default on mobile */
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
  }

  .navbar-links.mobile-open {
    display: flex;
  }

  .navbar-logo {
    flex: 1;
  }

  .navbar-connect {
    order: 2;
  }

  .mobile-menu-button {
    display: block;
    order: 1;
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }
}

@media (min-width: 769px) {
  .mobile-menu-button {
    display: none;
  }
}
```

### Add Mobile Menu to Navbar

```javascript
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyDAO</Link>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/voting" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Proposals
          </Link>
          <Link to="/treasury" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Treasury
          </Link>
          <Link to="/identity" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Identity
          </Link>
          <a href="https://docs.openzeppelin.com/contracts/4.x/governance" target="_blank" rel="noopener noreferrer" className="nav-link">
            Docs
          </a>
        </div>

        <div className="navbar-connect">
          <WalletButton />
        </div>
      </div>
    </nav>
  );
};
```

### Mobile-Friendly Cards

```css
/* src/components/ui/Card/Card.css */

@media (max-width: 768px) {
  .ui-card {
    padding: 1rem;
  }

  .proposal-actions {
    flex-direction: column;
  }

  .proposal-actions button {
    width: 100%;
  }
}
```

## 5. Dashboard Page

### Create Dashboard Page

```javascript
// src/pages/Dashboard.jsx
import { Card } from '../components/ui/Card/Card';
import { Button } from '../components/ui/Button/Button';
import { useGetVotingPower, useGetTokenBalance } from '../hooks/useDAO';
import { useAccount } from 'wagmi';
import './Dashboard.css';

export const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { votingPower } = useGetVotingPower();
  const { balance } = useGetTokenBalance();

  if (!isConnected) {
    return (
      <div className="dashboard-container">
        <Card style={{ padding: '3rem', textAlign: 'center' }}>
          <h2>Connect Your Wallet</h2>
          <p className="text-secondary">
            Connect your wallet to view your personalized dashboard.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="page-title">My Dashboard</h2>

      <div className="dashboard-grid">
        {/* Voting Power Card */}
        <Card className="dashboard-card">
          <h3>My Voting Power</h3>
          <p className="dashboard-stat">{parseFloat(votingPower).toFixed(2)} MDT</p>
          <p className="text-secondary">Your current voting power in the DAO</p>
          <Button variant="secondary" style={{ marginTop: '1rem' }}>
            Delegate
          </Button>
        </Card>

        {/* Token Balance Card */}
        <Card className="dashboard-card">
          <h3>Token Balance</h3>
          <p className="dashboard-stat">{parseFloat(balance).toFixed(2)} MDT</p>
          <p className="text-secondary">Total tokens you hold</p>
        </Card>

        {/* Participation Card */}
        <Card className="dashboard-card">
          <h3>Participation</h3>
          <p className="dashboard-stat">3</p>
          <p className="text-secondary">Proposals you've voted on</p>
          <Button variant="secondary" style={{ marginTop: '1rem' }}>
            View History
          </Button>
        </Card>

        {/* Delegation Card */}
        <Card className="dashboard-card">
          <h3>Delegation</h3>
          <p className="text-secondary">
            {address ? `Delegated to: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Not delegated'}
          </p>
          <Button variant="primary" style={{ marginTop: '1rem' }}>
            Change Delegate
          </Button>
        </Card>
      </div>

      {/* Recent Activity */}
      <h3 className="section-title">Recent Activity</h3>
      <Card>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <div className="activity-details">
              <p className="activity-title">Voted on Proposal #3</p>
              <p className="activity-time">2 days ago</p>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🔄</span>
            <div className="activity-details">
              <p className="activity-title">Delegated voting power</p>
              <p className="activity-time">5 days ago</p>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <div className="activity-details">
              <p className="activity-title">Voted on Proposal #2</p>
              <p className="activity-time">1 week ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
```

```css
/* src/pages/Dashboard.css */
.dashboard-container {
  padding: 2rem 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.dashboard-card {
  text-align: center;
  padding: 2rem;
}

.dashboard-card h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.dashboard-stat {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--brand-blue);
  margin-bottom: 0.5rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--bg-primary);
  border-radius: 8px;
}

.activity-icon {
  font-size: 1.5rem;
}

.activity-details {
  flex: 1;
}

.activity-title {
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.activity-time {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
```

### Add to Routes

```javascript
// src/App.jsx
import { Dashboard } from './pages/Dashboard';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/voting" element={<Voting />} />
  <Route path="/treasury" element={<Treasury />} />
  <Route path="/identity" element={<Identity />} />
  <Route path="/demo" element={<ComponentDemo />} />
</Routes>
```

## 6. Loading States Improvements

### Create Skeleton Component

```javascript
// src/components/ui/Skeleton/Skeleton.jsx
import './Skeleton.css';

export const Skeleton = ({ width = '100%', height = '20px', className = '', style = {} }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, ...style }}
    />
  );
};
```

```css
/* src/components/ui/Skeleton/Skeleton.css */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--border-color) 50%,
    var(--bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

### Use in ProposalList

```javascript
if (isLoading) {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <Card key={i} style={{ marginBottom: '1.5rem' }}>
          <Skeleton width="60%" height="24px" />
          <Skeleton width="100%" height="16px" style={{ marginTop: '0.75rem' }} />
          <Skeleton width="100%" height="16px" style={{ marginTop: '0.5rem' }} />
          <Skeleton width="100%" height="8px" style={{ marginTop: '1rem' }} />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Skeleton width="100px" height="40px" />
            <Skeleton width="100px" height="40px" />
          </div>
        </Card>
      ))}
    </div>
  );
}
```

## 7. Confirmation Modals

### Create Modal Component

```javascript
// src/components/ui/Modal/Modal.jsx
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import './Modal.css';

export const Modal = ({ isOpen, onClose, title, children, actions }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
};
```

```css
/* src/components/ui/Modal/Modal.css */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background-color: var(--bg-primary);
}

.modal-body {
  padding: 1.5rem;
  color: var(--text-secondary);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  justify-content: flex-end;
}
```

## Implementation Checklist

- [ ] Toast notifications installed and configured
- [ ] EmptyState component created
- [ ] Error parser implemented
- [ ] Mobile responsiveness added
- [ ] Dashboard page created
- [ ] Skeleton loaders implemented
- [ ] Modal component created
- [ ] All pages tested on mobile
- [ ] All error states handled gracefully
- [ ] Loading states feel instant

---

**These improvements make your DAO feel professional and trustworthy.**
