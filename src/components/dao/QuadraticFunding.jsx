import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton/AnimatedButton';
import { Loader } from '../ui/Loader/Loader';
import { useVotingStrategy, VotingCalculators, VOTING_STRATEGIES } from '../../contexts/VotingStrategyContext';
import { useGetVotingPower } from '../../hooks/useDAO';
import { FaCoins, FaCalculator, FaInfoCircle, FaHandHoldingHeart } from 'react-icons/fa';
import './QuadraticFunding.css';

export const QuadraticFunding = ({ projects = [], onFundingAllocated }) => {
  const { activeStrategy, strategyConfig } = useVotingStrategy();
  const { votingPower, isLoading: powerLoading } = useGetVotingPower();
  const [contributions, setContributions] = useState({});
  const [calculations, setCalculations] = useState({
    matching: [],
    totalFunding: 0,
    userTotalContribution: 0
  });

  const calculator = VotingCalculators.quadraticFunding(strategyConfig[VOTING_STRATEGIES.QUADRATIC_FUNDING]);

  useEffect(() => {
    const contributionArray = projects.map(project => contributions[project.id] || 0);
    const matching = calculator.calculateMatching(contributionArray);
    const totalFunding = calculator.calculateTotalFunding(contributionArray);
    const userTotalContribution = contributionArray.reduce((sum, amount) => sum + amount, 0);

    setCalculations({
      matching,
      totalFunding,
      userTotalContribution
    });
  }, [contributions, projects, calculator]);

  const handleContributionChange = (projectId, amount) => {
    const maxContribution = parseFloat(votingPower) || 0;
    const currentTotal = Object.values(contributions).reduce((sum, amt) => sum + amt, 0);
    const newTotal = currentTotal - (contributions[projectId] || 0) + amount;

    if (newTotal <= maxContribution) {
      setContributions(prev => ({
        ...prev,
        [projectId]: Math.max(0, amount)
      }));
    }
  };

  const canSubmit = calculations.userTotalContribution > 0;

  const formatCurrency = (amount) => `${amount.toFixed(2)} MDT`;

  return (
    <GlassCard variant="primary" className="quadratic-funding-card">
      <div className="funding-header">
        <h3 className="funding-title">
          <FaHandHoldingHeart className="funding-icon" />
          Quadratic Funding
        </h3>
        <div className="strategy-badge">
          <FaCalculator />
          Matching pool: {formatCurrency(strategyConfig[VOTING_STRATEGIES.QUADRATIC_FUNDING].matchingPool)}
        </div>
      </div>

      <div className="funding-power-display">
        <div className="power-item">
          <span className="power-label">Available Tokens:</span>
          <span className="power-value">
            {powerLoading ? (
              <Loader size="sm" />
            ) : (
              formatCurrency(parseFloat(votingPower) - calculations.userTotalContribution)
            )}
          </span>
        </div>
        <div className="power-item">
          <span className="power-label">Total Contribution:</span>
          <span className="power-value">{formatCurrency(calculations.userTotalContribution)}</span>
        </div>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={project.id} className="project-item">
            <div className="project-header">
              <div className="project-info">
                <h4 className="project-name">{project.name}</h4>
                <p className="project-description">{project.description}</p>
              </div>
              <div className="project-stats">
                <div className="stat-item">
                  <span className="stat-label">Your Contribution:</span>
                  <span className="stat-value">{formatCurrency(contributions[project.id] || 0)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Matching:</span>
                  <span className="stat-value matching">{formatCurrency(calculations.matching[index] || 0)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Funding:</span>
                  <span className="stat-value total">
                    {formatCurrency((contributions[project.id] || 0) + (calculations.matching[index] || 0))}
                  </span>
                </div>
              </div>
            </div>

            <div className="contribution-control">
              <label className="contribution-label">Contribute to {project.name}:</label>
              <input
                type="range"
                min="0"
                max={strategyConfig[VOTING_STRATEGIES.QUADRATIC_FUNDING].individualCap}
                step="0.1"
                value={contributions[project.id] || 0}
                onChange={(e) => handleContributionChange(project.id, parseFloat(e.target.value))}
                className="contribution-slider"
              />
              <div className="slider-controls">
                <button
                  className="quick-amount"
                  onClick={() => handleContributionChange(project.id, 0)}
                >
                  0
                </button>
                <input
                  type="number"
                  min="0"
                  max={strategyConfig[VOTING_STRATEGIES.QUADRATIC_FUNDING].individualCap}
                  step="0.1"
                  value={contributions[project.id] || 0}
                  onChange={(e) => handleContributionChange(project.id, parseFloat(e.target.value) || 0)}
                  className="amount-input"
                />
                <button
                  className="quick-amount"
                  onClick={() => handleContributionChange(project.id, strategyConfig[VOTING_STRATEGIES.QUADRATIC_FUNDING].individualCap)}
                >
                  Max
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="funding-summary">
        <h4 className="summary-title">
          <FaCalculator />
          Funding Summary
        </h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Contributions:</span>
            <span className="summary-value">{formatCurrency(calculations.userTotalContribution)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Matching:</span>
            <span className="summary-value matching">{formatCurrency(calculations.matching.reduce((sum, amt) => sum + amt, 0))}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Funding Allocated:</span>
            <span className="summary-value total">{formatCurrency(calculations.totalFunding)}</span>
          </div>
        </div>
      </div>

      <div className="quadratic-explanation">
        <FaInfoCircle className="info-icon" />
        <div className="explanation-content">
          <p><strong>How Quadratic Funding Works:</strong></p>
          <ul>
            <li>Contribute to projects you believe in</li>
            <li>Matching funds are distributed based on square root of contributions</li>
            <li>Smaller contributors get proportionally more matching</li>
            <li>Encourages broad participation and prevents whales from dominating</li>
          </ul>
        </div>
      </div>

      <div className="funding-actions">
        <AnimatedButton
          variant={canSubmit ? "primary" : "disabled"}
          disabled={!canSubmit}
          onClick={() => onFundingAllocated && onFundingAllocated(contributions)}
          icon={<FaCoins />}
        >
          {canSubmit ? `Allocate ${formatCurrency(calculations.userTotalContribution)}` : 'Add contributions'}
        </AnimatedButton>
      </div>
    </GlassCard>
  );
};