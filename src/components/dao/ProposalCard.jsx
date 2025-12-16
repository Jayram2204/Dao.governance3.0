import { Card } from '../ui/Card/Card';
import { Button } from '../ui/Button/Button';
import './ProposalCard.css';

export const ProposalCard = ({ proposal, onVoteClick, hasVoted, isVoting }) => {
  const { id, title, description, proposer, voteEnd, state, forVotes, againstVotes } = proposal;

  const now = new Date();
  const isVotingActive = now < voteEnd && state === 1;

  const stateText = {
    0: 'Pending',
    1: 'Active',
    2: 'Succeeded',
    3: 'Executed',
    4: 'Defeated',
  }[state] || 'Unknown';

  const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const timeLeft = Math.max(0, Math.ceil((voteEnd - now) / (1000 * 60 * 60 * 24)));

  const totalVotes = forVotes + againstVotes;
  const forPercentage = totalVotes > 0 ? ((forVotes / totalVotes) * 100).toFixed(1) : 0;
  const againstPercentage = totalVotes > 0 ? ((againstVotes / totalVotes) * 100).toFixed(1) : 0;

  return (
    <Card 
      className="proposal-card"
      style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05))',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="proposal-header">
        <h4 className="proposal-title">{title}</h4>
        <span className={`proposal-state state-${stateText.toLowerCase()}`}>
          {stateText}
        </span>
      </div>
      
      <p className="proposal-description">{description.substring(0, 150)}...</p>
      
      <div className="proposal-votes">
        <div className="vote-bar" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          height: '8px',
          position: 'relative',
          marginBottom: '0.5rem'
        }}>
          <div 
            className="vote-bar-for" 
            style={{ 
              width: `${forPercentage}%`,
              background: 'linear-gradient(90deg, #10b981, #059669)',
              height: '100%',
              position: 'absolute',
              left: 0
            }}
          ></div>
          <div 
            className="vote-bar-against" 
            style={{ 
              width: `${againstPercentage}%`,
              background: 'linear-gradient(90deg, #ef4444, #dc2626)',
              height: '100%',
              position: 'absolute',
              right: 0
            }}
          ></div>
        </div>
        <div className="vote-stats" style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
          <span className="vote-stat-for" style={{color: '#10b981', fontWeight: '600'}}>
            ✅ For: {forPercentage}%
          </span>
          <span className="vote-stat-against" style={{color: '#ef4444', fontWeight: '600'}}>
            ❌ Against: {againstPercentage}%
          </span>
        </div>
      </div>

      <div className="proposal-meta">
        <span className="proposer">By: {formatAddress(proposer)}</span>
        {isVotingActive ? (
          <span className="time-left">{timeLeft} days left</span>
        ) : (
          <span className="time-left">Voting ended</span>
        )}
      </div>

      <div className="proposal-actions">
        {isVotingActive && !hasVoted && (
          <>
            <Button 
              variant="accent-teal" 
              onClick={() => onVoteClick(id, true)}
              disabled={isVoting}
              style={{ 
                fontSize: '1rem', 
                padding: '0.75rem 1.5rem', 
                fontWeight: '600',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: '2px solid #10b981',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              {isVoting ? '🗳️ Voting...' : '✅ Vote YES'}
            </Button>
            <Button 
              variant="accent-red" 
              onClick={() => onVoteClick(id, false)}
              disabled={isVoting}
              style={{ 
                fontSize: '1rem', 
                padding: '0.75rem 1.5rem', 
                fontWeight: '600',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                border: '2px solid #ef4444',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              }}
            >
              {isVoting ? '🗳️ Voting...' : '❌ Vote NO'}
            </Button>
          </>
        )}
        {hasVoted && (
          <span className="voted-badge" style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            ✓ Already Voted
          </span>
        )}
        <Button 
          variant="secondary"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '0.5rem 1rem'
          }}
        >
          📋 View Details
        </Button>
      </div>
    </Card>
  );
};
