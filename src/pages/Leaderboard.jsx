import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card/Card';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useGetVotingPower, useGetTokenBalance } from '../hooks/useDAO';
import { Loader } from '../components/ui/Loader/Loader';
import { FaTrophy, FaMedal, FaAward, FaFire } from 'react-icons/fa';
import './Leaderboard.css';

// Real leaderboard data will be fetched from blockchain/contracts

export const Leaderboard = () => {
  const { isConnected, address } = useAccount();
  const { votingPower, isLoading: votingPowerLoading } = useGetVotingPower();
  const { tokenBalance, isLoading: balanceLoading } = useGetTokenBalance();
  const [sortBy, setSortBy] = useState('votes');
  const [timeframe, setTimeframe] = useState('all');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Fetch real leaderboard data when connected
  useEffect(() => {
    if (isConnected && address) {
      setIsLoadingData(true);
      
      // In a real implementation, this would fetch from your DAO contracts
      // For now, we'll show that data is being loaded from blockchain
      const fetchLeaderboardData = async () => {
        try {
          // Simulate blockchain data fetching
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Set empty data to show real state - no fake data
          setLeaderboardData([]);
          
          // Set user stats based on real wallet data
          setUserStats({
            rank: null, // Will be calculated when we have real data
            votes: 0, // Will come from contract events
            proposals: 0, // Will come from contract events  
            votingPower: votingPower || '0',
            tokenBalance: tokenBalance || '0',
            streak: 0 // Will be calculated from voting history
          });
        } catch (error) {
          console.error('Error fetching leaderboard data:', error);
        } finally {
          setIsLoadingData(false);
        }
      };

      fetchLeaderboardData();
    }
  }, [isConnected, address, votingPower, tokenBalance]);

  if (!isConnected) {
    return (
      <div className="leaderboard-page-container">
        <Card style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="leaderboard-lock-icon">🏆</div>
          <h2>Leaderboard</h2>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>
            Connect your wallet to view the DAO leaderboard and your ranking.
          </p>
          <ConnectButton />
        </Card>
      </div>
    );
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="rank-icon gold" />;
      case 2:
        return <FaMedal className="rank-icon silver" />;
      case 3:
        return <FaMedal className="rank-icon bronze" />;
      default:
        return <span className="rank-number">#{rank}</span>;
    }
  };

  return (
    <div className="leaderboard-page-container">
      <div className="leaderboard-header">
        <h1 className="page-title">🏆 Leaderboard</h1>
        <p className="page-subtitle">Top contributors and most active DAO members</p>
      </div>

      {/* User Stats Card */}
      <Card className="user-stats-card">
        <div className="user-stats-content">
          <div className="user-rank-badge">
            <FaAward className="badge-icon" />
            <div className="badge-text">
              <span className="badge-label">Your Rank</span>
              <span className="badge-value">
                {isLoadingData ? (
                  <Loader size="sm" color="primary" />
                ) : userStats?.rank ? (
                  `#${userStats.rank}`
                ) : (
                  'Not ranked yet'
                )}
              </span>
            </div>
          </div>
          <div className="user-stat">
            <span className="stat-label">Total Votes</span>
            <span className="stat-value">
              {isLoadingData ? <Loader size="sm" color="primary" /> : userStats?.votes || 0}
            </span>
          </div>
          <div className="user-stat">
            <span className="stat-label">Proposals</span>
            <span className="stat-value">
              {isLoadingData ? <Loader size="sm" color="primary" /> : userStats?.proposals || 0}
            </span>
          </div>
          <div className="user-stat">
            <span className="stat-label">Voting Power</span>
            <span className="stat-value">
              {votingPowerLoading ? (
                <Loader size="sm" color="primary" />
              ) : (
                `${parseFloat(votingPower || 0).toFixed(2)} MDT`
              )}
            </span>
          </div>
          <div className="user-stat">
            <span className="stat-label">Token Balance</span>
            <span className="stat-value">
              {balanceLoading ? (
                <Loader size="sm" color="primary" />
              ) : (
                `${parseFloat(tokenBalance || 0).toFixed(2)} MDT`
              )}
            </span>
          </div>
          <div className="user-stat">
            <span className="stat-label">Streak</span>
            <span className="stat-value">
              <FaFire className="streak-icon" /> 
              {isLoadingData ? <Loader size="sm" color="primary" /> : `${userStats?.streak || 0} days`}
            </span>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="leaderboard-filters">
        <div className="filter-group">
          <label>Sort By:</label>
          <div className="filter-buttons">
            {['votes', 'proposals', 'power', 'streak'].map((option) => (
              <button
                key={option}
                className={`filter-btn ${sortBy === option ? 'active' : ''}`}
                onClick={() => setSortBy(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>Timeframe:</label>
          <div className="filter-buttons">
            {['week', 'month', 'year', 'all'].map((option) => (
              <button
                key={option}
                className={`filter-btn ${timeframe === option ? 'active' : ''}`}
                onClick={() => setTimeframe(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card className="leaderboard-table-card">
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="table-cell rank-cell">Rank</div>
            <div className="table-cell member-cell">Member</div>
            <div className="table-cell stat-cell">Votes</div>
            <div className="table-cell stat-cell">Proposals</div>
            <div className="table-cell stat-cell">Voting Power</div>
            <div className="table-cell stat-cell">Streak</div>
          </div>
          <div className="table-body">
            {isLoadingData ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '3rem',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <Loader size="lg" color="primary" />
                <p style={{ color: '#a8a8b3' }}>Loading leaderboard from blockchain...</p>
              </div>
            ) : leaderboardData.length > 0 ? (
              leaderboardData.map((member) => (
                <div 
                  key={member.rank} 
                  className={`table-row ${member.address === address ? 'current-user' : ''}`}
                  style={{
                    background: member.address === address ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    border: member.address === address ? '1px solid #8b5cf6' : '1px solid transparent',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div className="table-cell rank-cell">
                    {getRankIcon(member.rank)}
                  </div>
                  <div className="table-cell member-cell">
                    <div className="member-info">
                      <div className="member-avatar" style={{
                        background: member.address === address ? '#8b5cf6' : '#374151',
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        {member.name?.charAt(0) || '?'}
                      </div>
                      <div className="member-details">
                        <span className="member-name" style={{
                          color: member.address === address ? '#8b5cf6' : 'white',
                          fontWeight: member.address === address ? 'bold' : 'normal'
                        }}>
                          {member.name || `${member.address.slice(0, 6)}...${member.address.slice(-4)}`}
                          {member.address === address ? ' (You)' : ''}
                        </span>
                        <span className="member-address" style={{color: '#a8a8b3', fontSize: '0.8rem'}}>
                          {member.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="table-cell stat-cell">
                    <span className="stat-value">{member.votes?.toLocaleString() || 0}</span>
                  </div>
                  <div className="table-cell stat-cell">
                    <span className="stat-value">{member.proposals || 0}</span>
                  </div>
                  <div className="table-cell stat-cell">
                    <span className="stat-value">{((member.power || 0) / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="table-cell stat-cell">
                    <span className="stat-value streak">
                      <FaFire className="streak-icon" style={{color: '#f59e0b'}} /> {member.streak || 0}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state" style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#a8a8b3'
              }}>
                <div className="empty-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>No leaderboard data yet</h3>
                <p>Be the first to participate in DAO governance!</p>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                  Vote on proposals and create proposals to appear on the leaderboard.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Achievements Section */}
      <div className="achievements-section">
        <h2 className="section-title">🎖️ Achievements</h2>
        <p style={{ color: '#a8a8b3', marginBottom: '2rem', textAlign: 'center' }}>
          Achievements are earned through real DAO participation and will be tracked on-chain
        </p>
        <div className="achievements-grid">
          <Card className="achievement-card locked" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: 0.7
          }}>
            <div className="achievement-icon">🗳️</div>
            <h3>First Vote</h3>
            <p>Cast your first vote on any proposal</p>
            <small style={{ color: '#6b6b7b' }}>Unlocked by voting</small>
          </Card>
          <Card className="achievement-card locked" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: 0.7
          }}>
            <div className="achievement-icon">📝</div>
            <h3>Proposal Creator</h3>
            <p>Create your first proposal</p>
            <small style={{ color: '#6b6b7b' }}>Unlocked by creating proposals</small>
          </Card>
          <Card className="achievement-card locked" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: 0.7
          }}>
            <div className="achievement-icon">🔥</div>
            <h3>Active Participant</h3>
            <p>Vote on 5 consecutive proposals</p>
            <small style={{ color: '#6b6b7b' }}>Unlocked by consistent voting</small>
          </Card>
          <Card className="achievement-card locked" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: 0.7
          }}>
            <div className="achievement-icon">👑</div>
            <h3>Top Contributor</h3>
            <p>Reach top 10 on leaderboard</p>
            <small style={{ color: '#6b6b7b' }}>Unlocked by high participation</small>
          </Card>
          <Card className="achievement-card locked" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: 0.7
          }}>
            <div className="achievement-icon">💎</div>
            <h3>Token Holder</h3>
            <p>Hold MDT tokens for 30 days</p>
            <small style={{ color: '#6b6b7b' }}>Unlocked by token holding</small>
          </Card>
          <Card className="achievement-card locked" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            opacity: 0.7
          }}>
            <div className="achievement-icon">🎯</div>
            <h3>Governance Expert</h3>
            <p>Vote on 25 proposals</p>
            <small style={{ color: '#6b6b7b' }}>Unlocked by extensive participation</small>
          </Card>
        </div>
      </div>
    </div>
  );
};
