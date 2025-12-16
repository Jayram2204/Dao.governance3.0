import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton/AnimatedButton';
import { Loader } from '../ui/Loader/Loader';
import { useVotingStrategy, VotingCalculators, VOTING_STRATEGIES } from '../../contexts/VotingStrategyContext';
import { useGetVotingPower } from '../../hooks/useDAO';
import { FaClock, FaVoteYea, FaCalculator, FaInfoCircle, FaSeedling } from 'react-icons/fa';
import './ConvictionVoting.css';

export const ConvictionVoting = ({ proposalId, onVoteCast }) => {
  const { activeStrategy, strategyConfig } = useVotingStrategy();
  const { votingPower, isLoading: powerLoading } = useGetVotingPower();
  const [stake, setStake] = useState(0);
  const [timeHeld, setTimeHeld] = useState(0); // in days
  const [support, setSupport] = useState(true);
  const [calculations, setCalculations] = useState({
    conviction: 0,
    effectiveVotes: 0,
    convictionTime: 0
  });

  const calculator = VotingCalculators.conviction(strategyConfig[VOTING_STRATEGIES.CONVICTION]);

  useEffect(() => {
    const conviction = calculator.calculateConviction(stake, timeHeld);
    const effectiveVotes = calculator.calculateEffectiveVotes(stake, conviction);
    const convictionTime = calculator.getConvictionTime(0.5, stake); // Time to reach 50% conviction

    setCalculations({
      conviction,
      effectiveVotes,
      convictionTime
    });
  }, [stake, timeHeld, calculator]);

  const handleStakeChange = (newStake) => {
    const maxStake = parseFloat(votingPower) || 0;
    setStake(Math.max(0, Math.min(newStake, maxStake)));
  };

  const canVote = stake > 0 && calculations.conviction > 0;

  const formatTime = (days) => {
    if (days === Infinity) return 'Never';
    if (days < 1) return `${Math.round(days * 24)} hours`;
    if (days < 30) return `${Math.round(days)} days`;
    if (days < 365) return `${Math.round(days / 30)} months`;
    return `${Math.round(days / 365)} years`;
  };

  return (
    <GlassCard variant="primary" className="conviction-voting-card">
      <div className="voting-header">
        <h3 className="voting-title">
          <FaClock className="voting-icon" />
          Conviction Voting
        </h3>
        <div className="strategy-badge">
          <FaSeedling />
          Time-based influence
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
          <label className="toggle-label">Position:</label>
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${support ? 'active' : ''}`}
              onClick={() => setSupport(true)}
            >
              <FaVoteYea className="support-icon" />
              Support
            </button>
            <button
              className={`toggle-btn ${!support ? 'active' : ''}`}
              onClick={() => setSupport(false)}
            >
              <FaVoteYea className="against-icon" />
              Oppose
            </button>
          </div>
        </div>

        <div className="stake-control">
          <label className="control-label">
            Stake Amount: {stake.toFixed(2)} MDT
          </label>
          <input
            type="range"
            min="0"
            max={parseFloat(votingPower) || 0}
            step="0.1"
            value={stake}
            onChange={(e) => handleStakeChange(parseFloat(e.target.value))}
            className="stake-slider"
          />
          <div className="slider-marks">
            <span>0</span>
            <span>Max: {(parseFloat(votingPower) || 0).toFixed(2)}</span>
          </div>
        </div>

        <div className="time-control">
          <label className="control-label">
            Time Held: {timeHeld.toFixed(1)} days
          </label>
          <input
            type="range"
            min="0"
            max="365"
            step="1"
            value={timeHeld}
            onChange={(e) => setTimeHeld(parseFloat(e.target.value))}
            className="time-slider"
          />
          <div className="slider-marks">
            <span>0 days</span>
            <span>1 year</span>
          </div>
        </div>
      </div>

      <div className="conviction-display">
        <h4 className="display-title">
          <FaCalculator />
          Conviction Analysis
        </h4>
        <div className="conviction-grid">
          <div className="conviction-item">
            <span className="conviction-label">Conviction Level:</span>
            <div className="conviction-bar">
              <div
                className="conviction-fill"
                style={{ width: `${calculations.conviction * 100}%` }}
              ></div>
              <span className="conviction-text">{(calculations.conviction * 100).toFixed(1)}%</span>
            </div>
          </div>
          <div className="conviction-item">
            <span className="conviction-label">Effective Votes:</span>
            <span className="conviction-value">{calculations.effectiveVotes.toFixed(2)}</span>
          </div>
          <div className="conviction-item">
            <span className="conviction-label">Time to 50% Conviction:</span>
            <span className="conviction-value">{formatTime(calculations.convictionTime)}</span>
          </div>
        </div>
      </div>

      <div className="conviction-explanation">
        <FaInfoCircle className="info-icon" />
        <div className="explanation-content">
          <p><strong>How Conviction Voting Works:</strong></p>
          <ul>
            <li>Conviction grows over time as you hold your position</li>
            <li>Higher conviction = more voting power for long-term decisions</li>
            <li>Discourages flip-flopping and encourages commitment</li>
            <li>Perfect for constitutional changes and major governance updates</li>
          </ul>
        </div>
      </div>

      <div className="vote-actions">
        <AnimatedButton
          variant={canVote ? "primary" : "disabled"}
          disabled={!canVote}
          onClick={() => onVoteCast && onVoteCast(proposalId, support, stake, timeHeld)}
          icon={<FaVoteYea />}
        >
          {canVote ? `Commit ${stake.toFixed(2)} MDT for ${timeHeld.toFixed(1)} days` : 'Set stake and time'}
        </AnimatedButton>
      </div>
    </GlassCard>
  );
};