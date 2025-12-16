import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard/GlassCard';
import { AnimatedButton } from '../components/ui/AnimatedButton/AnimatedButton';
import { QuadraticVoting } from '../components/dao/QuadraticVoting';
import { ConvictionVoting } from '../components/dao/ConvictionVoting';
import { QuadraticFunding } from '../components/dao/QuadraticFunding';
import { SybilProtection } from '../components/dao/SybilProtection';
import { PluginSystem } from '../components/dao/PluginSystem';
import { SecurityComplianceDashboard } from '../components/dao/SecurityComplianceDashboard';
import { VotingStrategyProvider, useVotingStrategy, VOTING_STRATEGIES } from '../contexts/VotingStrategyContext';
import { FaVoteYea, FaClock, FaCoins, FaShieldAlt, FaPlug, FaCogs } from 'react-icons/fa';
import './AdvancedVoting.css';

const AdvancedVotingContent = () => {
  const { activeStrategy, setActiveStrategy } = useVotingStrategy();
  const [currentView, setCurrentView] = useState('voting');
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Mock data for demonstration
  const mockProjects = [
    { id: 'dev-fund', name: 'Developer Fund', description: 'Fund core development team' },
    { id: 'marketing', name: 'Marketing Campaign', description: 'Promote DAO adoption' },
    { id: 'research', name: 'Research Grant', description: 'Fund blockchain research' },
    { id: 'community', name: 'Community Events', description: 'Organize community meetups' }
  ];

  const votingStrategies = [
    {
      id: VOTING_STRATEGIES.LINEAR,
      name: 'Linear Voting',
      description: '1 token = 1 vote',
      icon: FaVoteYea,
      component: null
    },
    {
      id: VOTING_STRATEGIES.QUADRATIC,
      name: 'Quadratic Voting',
      description: 'Cost increases quadratically',
      icon: FaVoteYea,
      component: QuadraticVoting
    },
    {
      id: VOTING_STRATEGIES.CONVICTION,
      name: 'Conviction Voting',
      description: 'Time-based influence',
      icon: FaClock,
      component: ConvictionVoting
    }
  ];

  const views = [
    { id: 'voting', name: 'Advanced Voting', icon: FaVoteYea },
    { id: 'funding', name: 'Quadratic Funding', icon: FaCoins },
    { id: 'sybil', name: 'Sybil Protection', icon: FaShieldAlt },
    { id: 'plugins', name: 'Plugin System', icon: FaPlug },
    { id: 'security', name: 'Security & Compliance', icon: FaCogs }
  ];

  const handleVoteCast = (proposalId, support, additionalData) => {
    console.log('Vote cast:', { proposalId, support, additionalData, strategy: activeStrategy });
    // In a real app, this would submit to the blockchain
  };

  const handleFundingAllocation = (contributions) => {
    console.log('Funding allocated:', contributions);
    // In a real app, this would submit funding allocation
  };

  const handleVerificationComplete = (canVote, score) => {
    console.log('Verification complete:', { canVote, score });
  };

  const handlePluginToggle = (pluginId, enabled) => {
    console.log('Plugin toggled:', { pluginId, enabled });
  };

  const handleIntegrationConnect = (integrationId) => {
    console.log('Integration connected:', integrationId);
  };

  const renderVotingInterface = () => {
    const activeStrategyData = votingStrategies.find(s => s.id === activeStrategy);
    const VotingComponent = activeStrategyData?.component;

    if (!VotingComponent) {
      return (
        <GlassCard variant="primary" className="voting-placeholder">
          <h3>Linear Voting Selected</h3>
          <p>This uses the standard 1 token = 1 vote mechanism.</p>
          <p>Select Quadratic or Conviction voting above to see advanced features.</p>
        </GlassCard>
      );
    }

    return (
      <VotingComponent
        proposalId={selectedProposal || 'demo-proposal'}
        onVoteCast={handleVoteCast}
      />
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'voting':
        return (
          <div className="voting-section">
            <div className="strategy-selector">
              <h3 className="section-title">Select Voting Strategy</h3>
              <div className="strategy-grid">
                {votingStrategies.map(strategy => {
                  const IconComponent = strategy.icon;
                  return (
                    <button
                      key={strategy.id}
                      className={`strategy-card ${activeStrategy === strategy.id ? 'active' : ''}`}
                      onClick={() => setActiveStrategy(strategy.id)}
                    >
                      <IconComponent className="strategy-icon" />
                      <h4 className="strategy-name">{strategy.name}</h4>
                      <p className="strategy-description">{strategy.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="voting-interface">
              <h3 className="section-title">Cast Your Vote</h3>
              {renderVotingInterface()}
            </div>
          </div>
        );

      case 'funding':
        return (
          <div className="funding-section">
            <QuadraticFunding
              projects={mockProjects}
              onFundingAllocated={handleFundingAllocation}
            />
          </div>
        );

      case 'sybil':
        return (
          <SybilProtection
            onVerificationComplete={handleVerificationComplete}
          />
        );

      case 'plugins':
        return (
          <PluginSystem
            onPluginToggle={handlePluginToggle}
            onIntegrationConnect={handleIntegrationConnect}
          />
        );

      case 'security':
        return <SecurityComplianceDashboard />;

      default:
        return null;
    }
  };

  return (
    <div className="advanced-voting-page">
      <div className="page-header">
        <h2 className="page-title">Advanced DAO Features</h2>
        <p className="page-subtitle">
          Enterprise-grade governance with quadratic voting, conviction mechanisms, and comprehensive security
        </p>
      </div>

      <div className="view-selector">
        {views.map(view => {
          const IconComponent = view.icon;
          return (
            <button
              key={view.id}
              className={`view-button ${currentView === view.id ? 'active' : ''}`}
              onClick={() => setCurrentView(view.id)}
            >
              <IconComponent />
              {view.name}
            </button>
          );
        })}
      </div>

      <div className="content-area">
        {renderCurrentView()}
      </div>

      <div className="feature-overview">
        <GlassCard variant="primary" className="overview-card">
          <h3 className="overview-title">🚀 Enterprise DAO Features</h3>
          <div className="features-grid">
            <div className="feature-item">
              <FaVoteYea className="feature-icon" />
              <div className="feature-content">
                <h4>Quadratic Voting</h4>
                <p>Prevents whales from dominating decisions</p>
              </div>
            </div>
            <div className="feature-item">
              <FaClock className="feature-icon" />
              <div className="feature-content">
                <h4>Conviction Voting</h4>
                <p>Long-term decisions with time-based influence</p>
              </div>
            </div>
            <div className="feature-item">
              <FaCoins className="feature-icon" />
              <div className="feature-content">
                <h4>Quadratic Funding</h4>
                <p>Fair distribution of treasury funds</p>
              </div>
            </div>
            <div className="feature-item">
              <FaShieldAlt className="feature-icon" />
              <div className="feature-content">
                <h4>Sybil Protection</h4>
                <p>Proof-of-humanity verification</p>
              </div>
            </div>
            <div className="feature-item">
              <FaPlug className="feature-icon" />
              <div className="feature-content">
                <h4>Plugin Ecosystem</h4>
                <p>Extensible governance platform</p>
              </div>
            </div>
            <div className="feature-item">
              <FaCogs className="feature-icon" />
              <div className="feature-content">
                <h4>Security & Compliance</h4>
                <p>Enterprise-grade protection</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export const AdvancedVoting = () => {
  return (
    <VotingStrategyProvider>
      <AdvancedVotingContent />
    </VotingStrategyProvider>
  );
};