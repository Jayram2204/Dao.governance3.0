import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import HeroSection from '../components/ui/Hero3D/HeroSection';
import { GlassCard } from '../components/ui/GlassCard/GlassCard';
import { FaVoteYea, FaCoins, FaChartLine, FaUsers, FaShieldAlt, FaRocket } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FaVoteYea />,
      title: 'Democratic Voting',
      description: 'Participate in governance with transparent, on-chain voting mechanisms'
    },
    {
      icon: <FaCoins />,
      title: 'Treasury Management',
      description: 'Community-controlled treasury with full transparency and accountability'
    },
    {
      icon: <FaChartLine />,
      title: 'Real-time Analytics',
      description: 'Track proposals, votes, and treasury metrics in real-time'
    },
    {
      icon: <FaUsers />,
      title: 'Community Driven',
      description: 'Built by the community, for the community with decentralized governance'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Audited',
      description: 'Smart contracts audited and secured with industry best practices'
    },
    {
      icon: <FaRocket />,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for both beginners and experts'
    }
  ];

  return (
    <div className="home-page">
      <HeroSection />

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Our DAO?</h2>
          <p className="section-subtitle">
            Built with cutting-edge technology and community-first principles
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <GlassCard key={index} variant="primary" glow className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Connect your wallet and join thousands of members shaping the future
          </p>
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <button
                  onClick={openConnectModal}
                  className="btn-primary btn-large"
                  disabled={connected}
                >
                  {connected ? '✓ Wallet Connected' : 'Connect Wallet Now'}
                </button>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </section>
    </div>
  );
};

export { Home };
