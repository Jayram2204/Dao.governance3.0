import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton/AnimatedButton';
import { Loader } from '../ui/Loader/Loader';
import { useVotingStrategy, VotingCalculators, VOTING_STRATEGIES } from '../../contexts/VotingStrategyContext';
import { useGetVotingPower } from '../../hooks/useDAO';
import { FaVoteYea, FaCalculator, FaInfoCircle, FaCoins } from 'react-icons/fa';
import './QuadraticVoting.css';

export const QuadraticVoting = ({ proposalId, onVoteCast }) => {
  const { activeStrategy, strategyConfig } = useVotingStrategy();
  const { votingPower, isLoading: powerLoading } = useGetVotingPower();
  const [desiredVotes, setDesiredVotes] = useState(1);
  const [support, setSupport] = useState(true); // true = For, false = Against
  const [calculations, setCalculations] = useState({
    cost: 0,
    effectiveVotes: 0,
    remainingPower: 0
  });

  const calculator = VotingCalculators.quadratic(strategyConfig[VOTING_STRATEGIES.QUADRATIC]);

  useEffect(() => {
    const availableTokens = parseFloat(votingPower) || 0;
    const cost = calculator.calculateCost(desiredVotes);
    const effectiveVotes = calculator.calculateVotes(availableTokens);
    const remainingPower = availableTokens - cost;

    setCalculations({
      cost,
      effectiveVotes,
      remainingPower
    });
  }, [desiredVotes, votingPower, calculator]);

  const handleVoteChange = (votes) => {
    const maxVotes = calculator.getMaxVotes(parseFloat(votingPower) || 0, strategyConfig[VOTING_STRATEGIES.QUADRATIC]);
    setDesiredVotes(Math.max(1, Math.min(votes, maxVotes)));
  };

  const canVote = calculations.remainingPower >= 0 && desiredVotes > 0;

  return (
    <GlassCard variant="primary" className="quadratic-voting-card">
      <div className="voting-header">
        <h3 className="voting-title">
          <FaVoteYea className="voting-icon" />
          Quadratic Voting
        </h3>
        <div className="strategy-badge">
          <FaCalculator />
          Cost: votes² tokens
        </div>
      </div>

      <div className="voting-power-display">
        <div className="power-item">
          <span className="power-label">Available Tokens:</span>
          <span className="power-value">
            {powerLoading ? (
              <Loader size="sm" />
            ) : (
              `${parseFloat(votingPower).toFixed(2)} MDT`
            )}
          </span>
        </div>
      </div>

      <div className="vote-controls">
        <div className="support-toggle">
          <label className="toggle-label">Vote:</label>
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${support ? 'active' : ''}`}
              onClick={() => setSupport(true)}
            >
              <FaVoteYea className="support-icon" />
              For
            </button>
            <button
              className={`toggle-btn ${!support ? 'active' : ''}`}
              onClick={() => setSupport(false)}
            >
              <FaVoteYea className="against-icon" />
              Against
            </button>
          </div>
        </div>

        <div className="votes-slider">
          <label className="slider-label">
            Number of Votes: {desiredVotes}
          </label>
          <input
            type="range"
            min="1"
            max={calculator.getMaxVotes(parseFloat(votingPower) || 0, strategyConfig[VOTING_STRATEGIES.QUADRATIC])}
            value={desiredVotes}
            onChange={(e) => handleVoteChange(parseInt(e.target.value))}
            className="vote-slider"
          />
          <div className="slider-marks">
            <span>1</span>
            <span>Max: {calculator.getMaxVotes(parseFloat(votingPower) || 0, strategyConfig[VOTING_STRATEGIES.QUADRATIC])}</span>
          </div>
        </div>
      </div>

      <div className="cost-breakdown">
        <h4 className="breakdown-title">
          <FaCalculator />
          Cost Breakdown
        </h4>
        <div className="breakdown-grid">
          <div className="breakdown-item">
            <span className="breakdown-label">Votes:</span>
            <span className="breakdown-value">{desiredVotes}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Token Cost:</span>
            <span className={`breakdown-value ${calculations.cost > parseFloat(votingPower) ? 'insufficient' : ''}`}>
              {calculations.cost.toFixed(2)} MDT
            </span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Remaining Power:</span>
            <span className={`breakdown-value ${calculations.remainingPower < 0 ? 'negative' : ''}`}>
              {calculations.remainingPower.toFixed(2)} MDT
            </span>
          </div>
        </div>
      </div>

      <div className="quadratic-explanation">
        <FaInfoCircle className="info-icon" />
        <div className="explanation-content">
          <p><strong>How Quadratic Voting Works:</strong></p>
          <ul>
            <li>Each additional vote costs more tokens (quadratic cost)</li>
            <li>1 vote = 1 token, 2 votes = 4 tokens, 3 votes = 9 tokens</li>
            <li>Gives more influence to moderate preferences</li>
            <li>Prevents single users from dominating decisions</li>
          </ul>
        </div>
      </div>

      <div className="vote-actions">
        <AnimatedButton
          variant={canVote ? "primary" : "disabled"}
          disabled={!canVote}
          onClick={() => onVoteCast && onVoteCast(proposalId, support, desiredVotes)}
          icon={<FaVoteYea />}
        >
          {canVote ? `Cast ${desiredVotes} ${support ? 'For' : 'Against'} Vote${desiredVotes !== 1 ? 's' : ''}` : 'Insufficient Tokens'}
        </AnimatedButton>
      </div>
    </GlassCard>
  );
};