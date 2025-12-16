import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton/AnimatedButton';
import { Loader } from '../ui/Loader/Loader';
import { SecurityCompliance } from '../../contexts/VotingStrategyContext';
import { useAccount } from 'wagmi';
import { FaShieldAlt, FaFileContract, FaHistory, FaUserCheck, FaUmbrella, FaExclamationTriangle } from 'react-icons/fa';
import './SecurityComplianceDashboard.css';

export const SecurityComplianceDashboard = () => {
  const { address } = useAccount();
  const [auditLogs, setAuditLogs] = useState([]);
  const [complianceStatus, setComplianceStatus] = useState({
    kyc: { level: 'none', compliant: false },
    auditTrail: { enabled: true, logsCount: 0 },
    insurance: { coverage: 0, claimAvailable: false }
  });
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    if (address) {
      // Load audit logs
      const logs = SecurityCompliance.auditTrail.getAuditLogs(address);
      setAuditLogs(logs);

      // Check compliance status
      checkComplianceStatus();
    }
  }, [address]);

  const checkComplianceStatus = async () => {
    if (!address) return;

    try {
      const kycStatus = await SecurityCompliance.kycAml.checkCompliance(address);
      const insuranceCoverage = SecurityCompliance.insurance.getCoverage(1000); // Example treasury amount

      setComplianceStatus({
        kyc: kycStatus,
        auditTrail: {
          enabled: true,
          logsCount: SecurityCompliance.auditTrail.getAuditLogs().length
        },
        insurance: {
          coverage: insuranceCoverage,
          claimAvailable: false // Would be determined by actual insurance contract
        }
      });
    } catch (error) {
      console.error('Compliance check error:', error);
    }
  };

  const logAction = (action, details) => {
    if (address) {
      const logEntry = SecurityCompliance.auditTrail.logAction(action, address, details);
      setAuditLogs(prev => [logEntry, ...prev]);
      setComplianceStatus(prev => ({
        ...prev,
        auditTrail: {
          ...prev.auditTrail,
          logsCount: prev.auditTrail.logsCount + 1
        }
      }));
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getComplianceColor = (level) => {
    switch (level) {
      case 'full': return 'high';
      case 'basic': return 'medium';
      case 'none': return 'low';
      default: return 'low';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FaShieldAlt },
    { id: 'audit', name: 'Audit Trail', icon: FaHistory },
    { id: 'compliance', name: 'Compliance', icon: FaUserCheck },
    { id: 'insurance', name: 'Insurance', icon: FaUmbrella }
  ];

  return (
    <div className="security-dashboard">
      <div className="dashboard-header">
        <h3 className="dashboard-title">
          <FaShieldAlt className="dashboard-icon" />
          Security & Compliance
        </h3>
        <div className="security-status">
          <div className={`status-indicator ${complianceStatus.kyc.compliant ? 'compliant' : 'non-compliant'}`}>
            {complianceStatus.kyc.compliant ? 'Compliant' : 'Review Required'}
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${selectedTab === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              <IconComponent />
              {tab.name}
            </button>
          );
        })}
      </div>

      <div className="dashboard-content">
        {selectedTab === 'overview' && (
          <div className="overview-section">
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">
                  <FaFileContract />
                </div>
                <div className="metric-info">
                  <h4 className="metric-title">Audit Trail</h4>
                  <p className="metric-value">{complianceStatus.auditTrail.logsCount} entries</p>
                  <p className="metric-description">All actions logged immutably</p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <FaUserCheck />
                </div>
                <div className="metric-info">
                  <h4 className="metric-title">KYC Level</h4>
                  <p className={`metric-value ${getComplianceColor(complianceStatus.kyc.level)}`}>
                    {complianceStatus.kyc.level.toUpperCase()}
                  </p>
                  <p className="metric-description">
                    {complianceStatus.kyc.compliant ? 'Verified' : 'Verification needed'}
                  </p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <FaUmbrella />
                </div>
                <div className="metric-info">
                  <h4 className="metric-title">Insurance</h4>
                  <p className="metric-value">{complianceStatus.insurance.coverage.toFixed(2)} ETH</p>
                  <p className="metric-description">Treasury coverage available</p>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <FaShieldAlt />
                </div>
                <div className="metric-info">
                  <h4 className="metric-title">Security Score</h4>
                  <p className="metric-value">95/100</p>
                  <p className="metric-description">Contract security rating</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h4 className="activity-title">Recent Security Events</h4>
              <div className="activity-list">
                {auditLogs.slice(0, 5).map((log, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-info">
                      <span className="activity-action">{log.action}</span>
                      <span className="activity-address">{log.address.slice(0, 6)}...{log.address.slice(-4)}</span>
                    </div>
                    <span className="activity-time">{formatTimestamp(log.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'audit' && (
          <div className="audit-section">
            <div className="audit-controls">
              <AnimatedButton
                variant="primary"
                size="sm"
                onClick={() => logAction('manual_audit', 'Manual security audit performed')}
              >
                Log Security Event
              </AnimatedButton>
            </div>

            <div className="audit-logs">
              <h4 className="logs-title">Audit Trail</h4>
              <div className="logs-list">
                {auditLogs.map((log, index) => (
                  <div key={index} className="log-entry">
                    <div className="log-header">
                      <span className="log-action">{log.action.replace(/_/g, ' ')}</span>
                      <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
                    </div>
                    <div className="log-details">
                      <span className="log-address">Address: {log.address}</span>
                      {log.details && <span className="log-info">Details: {log.details}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'compliance' && (
          <div className="compliance-section">
            <div className="compliance-status">
              <h4 className="status-title">KYC/AML Compliance</h4>
              <div className="compliance-level">
                <div className={`level-indicator ${getComplianceColor(complianceStatus.kyc.level)}`}>
                  <span className="level-text">
                    Level: {complianceStatus.kyc.level.toUpperCase()}
                  </span>
                  <span className="level-status">
                    {complianceStatus.kyc.compliant ? '✓ Compliant' : '⚠ Review Required'}
                  </span>
                </div>
              </div>
            </div>

            <div className="compliance-actions">
              <AnimatedButton
                variant="primary"
                onClick={() => window.open('#', '_blank')} // Would link to KYC provider
              >
                Complete KYC Verification
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                onClick={() => logAction('compliance_check', 'Manual compliance verification')}
              >
                Request Compliance Review
              </AnimatedButton>
            </div>
          </div>
        )}

        {selectedTab === 'insurance' && (
          <div className="insurance-section">
            <div className="insurance-overview">
              <h4 className="insurance-title">Treasury Insurance Coverage</h4>
              <div className="insurance-details">
                <div className="insurance-metric">
                  <span className="metric-label">Coverage Amount:</span>
                  <span className="metric-value">{complianceStatus.insurance.coverage.toFixed(2)} ETH</span>
                </div>
                <div className="insurance-metric">
                  <span className="metric-label">Coverage Ratio:</span>
                  <span className="metric-value">10%</span>
                </div>
                <div className="insurance-metric">
                  <span className="metric-label">Claim Status:</span>
                  <span className="metric-value">
                    {complianceStatus.insurance.claimAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
            </div>

            <div className="insurance-actions">
              <AnimatedButton
                variant="secondary"
                disabled={!complianceStatus.insurance.claimAvailable}
                onClick={() => SecurityCompliance.insurance.claimInsurance(100, 'Test claim')}
              >
                File Insurance Claim
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                onClick={() => window.open('#', '_blank')} // Would link to insurance provider
              >
                Purchase Additional Coverage
              </AnimatedButton>
            </div>
          </div>
        )}
      </div>

      <div className="security-notice">
        <FaExclamationTriangle className="notice-icon" />
        <div className="notice-content">
          <p><strong>Security Notice:</strong> All governance actions are logged immutably.
          Regular security audits and compliance checks help maintain the integrity of the DAO.</p>
        </div>
      </div>
    </div>
  );
};