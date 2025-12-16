import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton/AnimatedButton';
import { Loader } from '../ui/Loader/Loader';
import { votingPluginManager, VOTING_STRATEGIES } from '../../contexts/VotingStrategyContext';
import { FaPlug, FaPlus, FaCog, FaVoteYea, FaCoins, FaShieldAlt, FaExternalLinkAlt } from 'react-icons/fa';
import './PluginSystem.css';

// Built-in plugins
const BUILT_IN_PLUGINS = [
  {
    id: 'quadratic-voting',
    name: 'Quadratic Voting',
    description: 'Vote cost increases quadratically with number of votes',
    category: 'voting',
    icon: FaVoteYea,
    version: '1.0.0',
    author: 'DAO Core',
    enabled: true,
    config: {
      maxVotes: 100,
      costMultiplier: 1
    }
  },
  {
    id: 'conviction-voting',
    name: 'Conviction Voting',
    description: 'Voting power grows over time as conviction builds',
    category: 'voting',
    icon: FaClock,
    version: '1.0.0',
    author: 'DAO Core',
    enabled: true,
    config: {
      convictionGrowth: 0.01,
      minConviction: 0.001,
      maxConviction: 1.0
    }
  },
  {
    id: 'quadratic-funding',
    name: 'Quadratic Funding',
    description: 'Matching funds distributed based on square root of contributions',
    category: 'funding',
    icon: FaCoins,
    version: '1.0.0',
    author: 'DAO Core',
    enabled: true,
    config: {
      matchingPool: 1000,
      individualCap: 100
    }
  },
  {
    id: 'sybil-protection',
    name: 'Sybil Protection',
    description: 'Anti-Sybil measures using proof-of-humanity systems',
    category: 'security',
    icon: FaShieldAlt,
    version: '1.0.0',
    author: 'DAO Core',
    enabled: true,
    config: {}
  }
];

// Third-party integrations
const THIRD_PARTY_INTEGRATIONS = [
  {
    id: 'snapshot',
    name: 'Snapshot',
    description: 'Off-chain voting for gasless proposals',
    url: 'https://snapshot.org',
    category: 'voting',
    icon: '📸'
  },
  {
    id: 'tally',
    name: 'Tally',
    description: 'Professional governance interface',
    url: 'https://tally.xyz',
    category: 'interface',
    icon: '📊'
  },
  {
    id: 'boardroom',
    name: 'Boardroom',
    description: 'Governance analytics and insights',
    url: 'https://boardroom.info',
    category: 'analytics',
    icon: '📈'
  }
];

export const PluginSystem = ({ onPluginToggle, onIntegrationConnect }) => {
  const [plugins, setPlugins] = useState(BUILT_IN_PLUGINS);
  const [integrations, setIntegrations] = useState(THIRD_PARTY_INTEGRATIONS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAddPlugin, setShowAddPlugin] = useState(false);

  const categories = [
    { id: 'all', name: 'All Plugins', icon: FaPlug },
    { id: 'voting', name: 'Voting', icon: FaVoteYea },
    { id: 'funding', name: 'Funding', icon: FaCoins },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'interface', name: 'Interface', icon: FaCog }
  ];

  const filteredPlugins = activeCategory === 'all'
    ? plugins
    : plugins.filter(plugin => plugin.category === activeCategory);

  const handlePluginToggle = (pluginId) => {
    setPlugins(prev => prev.map(plugin =>
      plugin.id === pluginId
        ? { ...plugin, enabled: !plugin.enabled }
        : plugin
    ));

    const plugin = plugins.find(p => p.id === pluginId);
    onPluginToggle && onPluginToggle(pluginId, !plugin.enabled);
  };

  const handleIntegrationConnect = (integrationId) => {
    // In a real app, this would handle OAuth or API key setup
    setIntegrations(prev => prev.map(integration =>
      integration.id === integrationId
        ? { ...integration, connected: !integration.connected }
        : integration
    ));

    onIntegrationConnect && onIntegrationConnect(integrationId);
  };

  const PluginCard = ({ plugin, isIntegration = false }) => {
    const IconComponent = plugin.icon;

    return (
      <div className={`plugin-card ${plugin.enabled ? 'enabled' : ''}`}>
        <div className="plugin-header">
          <div className="plugin-icon">
            {typeof plugin.icon === 'string' ? plugin.icon : <IconComponent />}
          </div>
          <div className="plugin-info">
            <h4 className="plugin-name">{plugin.name}</h4>
            <p className="plugin-description">{plugin.description}</p>
            <div className="plugin-meta">
              <span className="plugin-author">by {plugin.author}</span>
              <span className="plugin-version">v{plugin.version}</span>
            </div>
          </div>
        </div>

        <div className="plugin-actions">
          {isIntegration ? (
            <AnimatedButton
              variant={plugin.connected ? "success" : "primary"}
              size="sm"
              onClick={() => handleIntegrationConnect(plugin.id)}
              icon={<FaExternalLinkAlt />}
            >
              {plugin.connected ? 'Connected' : 'Connect'}
            </AnimatedButton>
          ) : (
            <AnimatedButton
              variant={plugin.enabled ? "success" : "secondary"}
              size="sm"
              onClick={() => handlePluginToggle(plugin.id)}
            >
              {plugin.enabled ? 'Enabled' : 'Enable'}
            </AnimatedButton>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="plugin-system">
      <div className="plugin-header">
        <h3 className="system-title">
          <FaPlug className="system-icon" />
          Plugin Ecosystem
        </h3>
        <AnimatedButton
          variant="primary"
          size="sm"
          onClick={() => setShowAddPlugin(true)}
          icon={<FaPlus />}
        >
          Add Plugin
        </AnimatedButton>
      </div>

      <div className="category-tabs">
        {categories.map(category => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <IconComponent />
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="plugins-section">
        <h4 className="section-title">Built-in Plugins</h4>
        <div className="plugins-grid">
          {filteredPlugins.map(plugin => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      </div>

      {(activeCategory === 'all' || activeCategory === 'interface') && (
        <div className="integrations-section">
          <h4 className="section-title">Third-party Integrations</h4>
          <div className="plugins-grid">
            {integrations.map(integration => (
              <PluginCard key={integration.id} plugin={integration} isIntegration={true} />
            ))}
          </div>
        </div>
      )}

      <div className="plugin-info">
        <div className="info-content">
          <h4>Plugin System Benefits</h4>
          <ul>
            <li><strong>Extensibility:</strong> Add new voting strategies and features</li>
            <li><strong>Modularity:</strong> Enable/disable features as needed</li>
            <li><strong>Integration:</strong> Connect with popular governance tools</li>
            <li><strong>Customization:</strong> Tailor the DAO to your community's needs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};