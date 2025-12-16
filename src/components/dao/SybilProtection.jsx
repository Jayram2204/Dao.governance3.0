import React, { useState, useEffect } from 'react';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton/AnimatedButton';
import { Loader } from '../ui/Loader/Loader';
import { AntiSybilMeasures } from '../../contexts/VotingStrategyContext';
import { useAccount } from 'wagmi';
import { FaShieldAlt, FaUserCheck, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './SybilProtection.css';

export const SybilProtection = ({ onVerificationComplete }) => {
  const { address } = useAccount();
  const [verifications, setVerifications] = useState({
    proofOfHumanity: { status: 'checking', score: 0 },
    brightId: { status: 'checking', verified: false },
    gitcoinPassport: { status: 'checking', score: 0 }
  });
  const [overallScore, setOverallScore] = useState(0);
  const [canVote, setCanVote] = useState(false);

  useEffect(() => {
    if (!address) return;

    // Simulate verification checks (in real app, these would be actual API calls)
    const checkVerifications = async () => {
      try {
        // Proof of Humanity check
        const pohResult = await AntiSybilMeasures.proofOfHumanity.verifyHumanity(address);
        const pohScore = pohResult ? 100 : 0;

        // BrightID check
        const brightIdResult = await AntiSybilMeasures.brightId.verifyConnection(address);

        // Gitcoin Passport check
        const gitcoinScore = await AntiSybilMeasures.gitcoinPassport.getScore(address);

        setVerifications({
          proofOfHumanity: { status: 'complete', score: pohScore },
          brightId: { status: 'complete', verified: brightIdResult },
          gitcoinPassport: { status: 'complete', score: gitcoinScore }
        });

        // Calculate overall score (weighted average)
        const totalScore = (pohScore * 0.4) + (brightIdResult ? 100 : 0) * 0.3 + (gitcoinScore * 0.3);
        setOverallScore(totalScore);

        // Determine if user can vote (score > 50)
        setCanVote(totalScore > 50);

        onVerificationComplete && onVerificationComplete(totalScore > 50, totalScore);

      } catch (error) {
        console.error('Verification error:', error);
        setVerifications(prev => ({
          ...prev,
          proofOfHumanity: { status: 'error', score: 0 },
          brightId: { status: 'error', verified: false },
          gitcoinPassport: { status: 'error', score: 0 }
        }));
      }
    };

    checkVerifications();
  }, [address, onVerificationComplete]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'checking':
        return <Loader size="sm" />;
      case 'complete':
        return <FaCheckCircle className="status-icon success" />;
      case 'error':
        return <FaTimesCircle className="status-icon error" />;
      default:
        return <FaExclamationTriangle className="status-icon warning" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <GlassCard variant="primary" className="sybil-protection-card">
      <div className="protection-header">
        <h3 className="protection-title">
          <FaShieldAlt className="protection-icon" />
          Sybil Protection
        </h3>
        <div className="address-display">
          <FaUserCheck />
          {address ? formatAddress(address) : 'Not connected'}
        </div>
      </div>

      <div className="verification-status">
        <div className="overall-score">
          <div className="score-display">
            <div className="score-circle">
              <div className={`score-fill ${getScoreColor(overallScore)}`}
                   style={{ '--percentage': `${overallScore}%` }}>
                <span className="score-text">{Math.round(overallScore)}</span>
              </div>
            </div>
            <div className="score-info">
              <h4 className="score-title">Humanity Score</h4>
              <p className="score-description">
                {overallScore >= 80 ? 'High confidence' :
                 overallScore >= 60 ? 'Medium confidence' :
                 overallScore >= 50 ? 'Basic verification' : 'Insufficient verification'}
              </p>
            </div>
          </div>
        </div>

        <div className="verification-methods">
          <h4 className="methods-title">Verification Methods</h4>

          <div className="method-item">
            <div className="method-header">
              <div className="method-info">
                <h5 className="method-name">Proof of Humanity</h5>
                <p className="method-description">Decentralized human verification</p>
              </div>
              {getStatusIcon(verifications.proofOfHumanity.status)}
            </div>
            <div className="method-score">
              <div className="score-bar">
                <div
                  className="score-bar-fill"
                  style={{ width: `${verifications.proofOfHumanity.score}%` }}
                ></div>
              </div>
              <span className="score-value">{verifications.proofOfHumanity.score}/100</span>
            </div>
          </div>

          <div className="method-item">
            <div className="method-header">
              <div className="method-info">
                <h5 className="method-name">BrightID</h5>
                <p className="method-description">Social graph verification</p>
              </div>
              {getStatusIcon(verifications.brightId.status)}
            </div>
            <div className="method-score">
              <div className={`binary-indicator ${verifications.brightId.verified ? 'verified' : 'unverified'}`}>
                {verifications.brightId.verified ? 'Verified' : 'Unverified'}
              </div>
            </div>
          </div>

          <div className="method-item">
            <div className="method-header">
              <div className="method-info">
                <h5 className="method-name">Gitcoin Passport</h5>
                <p className="method-description">Web3 reputation scoring</p>
              </div>
              {getStatusIcon(verifications.gitcoinPassport.status)}
            </div>
            <div className="method-score">
              <div className="score-bar">
                <div
                  className="score-bar-fill"
                  style={{ width: `${verifications.gitcoinPassport.score}%` }}
                ></div>
              </div>
              <span className="score-value">{verifications.gitcoinPassport.score}/100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="protection-info">
        <FaExclamationTriangle className="info-icon" />
        <div className="info-content">
          <p><strong>Why Sybil Protection Matters:</strong></p>
          <ul>
            <li>Prevents one person from creating multiple identities</li>
            <li>Ensures fair representation in governance</li>
            <li>Protects against vote manipulation</li>
            <li>Builds trust in the DAO's decision-making process</li>
          </ul>
        </div>
      </div>

      <div className="protection-actions">
        {canVote ? (
          <div className="success-message">
            <FaCheckCircle className="success-icon" />
            <span>You are verified and can participate in voting</span>
          </div>
        ) : (
          <div className="warning-message">
            <FaExclamationTriangle className="warning-icon" />
            <span>Complete additional verification to participate</span>
          </div>
        )}

        <div className="action-buttons">
          <AnimatedButton
            variant="secondary"
            onClick={() => window.open('https://proofofhumanity.id', '_blank')}
            icon={<FaShieldAlt />}
          >
            Get Proof of Humanity
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={() => window.open('https://brightid.org', '_blank')}
            icon={<FaUserCheck />}
          >
            Connect BrightID
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={() => window.open('https://passport.gitcoin.co', '_blank')}
            icon={<FaCheckCircle />}
          >
            Get Gitcoin Passport
          </AnimatedButton>
        </div>
      </div>
    </GlassCard>
  );
};