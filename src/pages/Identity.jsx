import { Card } from '../components/ui/Card/Card';
import { Button } from '../components/ui/Button/Button';
import { useAccount } from 'wagmi';
import { useGetVotingPower, useGetTokenBalance } from '../hooks/useDAO';
import './Identity.css';

export const Identity = () => {
  const { address, isConnected } = useAccount();
  const { votingPower } = useGetVotingPower();
  const { balance } = useGetTokenBalance();

  if (!isConnected) {
    return (
      <div className="identity-page-container">
        <Card style={{ padding: '3rem', textAlign: 'center' }}>
          <h2>Connect Your Wallet</h2>
          <p className="text-secondary">Please connect your wallet to view your identity and DAO membership.</p>
        </Card>
      </div>
    );
  }

  const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const getInitials = (addr) => addr.slice(2, 4).toUpperCase();

  // Member data will be loaded from blockchain/contracts
  const mockMembers = [];

  return (
    <div className="identity-page-container">
      <h2 className="page-title">Identity & Membership</h2>

      <Card className="identity-card">
        <div className="identity-header">
          <div className="identity-avatar">{getInitials(address)}</div>
          <div className="identity-info">
            <h3>Your DAO Identity</h3>
            <p className="identity-address">{address}</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">{parseFloat(balance).toFixed(2)}</div>
            <div className="stat-label">MDT Balance</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{parseFloat(votingPower).toFixed(2)}</div>
            <div className="stat-label">Voting Power</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">3</div>
            <div className="stat-label">Proposals Voted</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">Active</div>
            <div className="stat-label">Status</div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button variant="primary">Update Profile</Button>
          <Button variant="secondary">View History</Button>
        </div>
      </Card>

      <h3 className="section-title">Top DAO Members</h3>
      <Card>
        <ul className="member-list">
          {mockMembers.map((member, index) => (
            <li key={index} className="member-item">
              <div className="member-info">
                <div className="member-avatar-small">{getInitials(member.address)}</div>
                <div>
                  <div className="member-address">{formatAddress(member.address)}</div>
                  <div className="member-power">{member.power} MDT</div>
                </div>
              </div>
              <Button variant="secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                View Profile
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
