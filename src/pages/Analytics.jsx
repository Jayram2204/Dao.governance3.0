import { useState } from 'react';
import { Card } from '../components/ui/Card/Card';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { LineChart, BarChart, PieChart, AreaChart, DonutChart } from '../components/charts';
import './Analytics.css';

// Analytics data will be loaded from blockchain/contracts
const votingData = [];
const membershipData = [];
const proposalTypeData = [];

export const Analytics = () => {
  const { isConnected } = useAccount();
  const [timeRange, setTimeRange] = useState('6M');

  if (!isConnected) {
    return (
      <div className="analytics-page-container">
        <Card style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="analytics-lock-icon">📊</div>
          <h2>Analytics Dashboard</h2>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>
            Connect your wallet to access detailed DAO analytics and insights.
          </p>
          <ConnectButton />
        </Card>
      </div>
    );
  }

  return (
    <div className="analytics-page-container">
      <div className="analytics-header">
        <h1 className="page-title">📊 DAO Analytics</h1>
        <div className="analytics-controls">
          <div className="time-range-selector">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                className={`time-range-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <Card className="metric-card">
          <div className="metric-icon">🗳️</div>
          <div className="metric-content">
            <h3>Total Proposals</h3>
            <div className="metric-value">0</div>
            <div className="metric-change">No data available</div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Active Members</h3>
            <div className="metric-value">0</div>
            <div className="metric-change">No data available</div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Treasury Value</h3>
            <div className="metric-value">$0</div>
            <div className="metric-change">No data available</div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Participation Rate</h3>
            <div className="metric-value">0%</div>
            <div className="metric-change">No data available</div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <Card className="chart-card large">
          <div className="chart-header">
            <h3>Participation Trends</h3>
          </div>
          <LineChart
            data={votingData}
            xKey="month"
            height={300}
            lines={[
              { dataKey: 'participation', name: 'Participation %', color: '#8B5CF6' },
              { dataKey: 'proposals', name: 'Proposals', color: '#3B82F6' },
            ]}
          />
        </Card>

        <Card className="chart-card">
          <div className="chart-header">
            <h3>Member Distribution</h3>
          </div>
          <DonutChart
            data={membershipData}
            height={300}
            centerText="5,504"
            centerSubtext="Total Members"
          />
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="charts-grid">
        <Card className="chart-card">
          <div className="chart-header">
            <h3>Treasury Growth</h3>
          </div>
          <AreaChart
            data={votingData}
            xKey="month"
            height={300}
            areas={[
              { dataKey: 'treasury', name: 'Treasury Value', color: '#10B981' },
            ]}
          />
        </Card>

        <Card className="chart-card">
          <div className="chart-header">
            <h3>Proposal Types</h3>
          </div>
          <PieChart
            data={proposalTypeData}
            height={300}
            showLabels={true}
          />
        </Card>
      </div>

      {/* Bar Chart */}
      <Card className="chart-card large">
        <div className="chart-header">
          <h3>Monthly Activity</h3>
        </div>
        <BarChart
          data={votingData}
          xKey="month"
          height={300}
          bars={[
            { dataKey: 'proposals', name: 'Proposals', color: '#8B5CF6' },
          ]}
        />
      </Card>

      {/* Activity Feed */}
      <Card className="activity-card">
        <h3>Recent Activity</h3>
        <div className="activity-feed">
          {[
            { icon: '🗳️', action: 'New proposal created', time: '2 hours ago', user: '0x1234...5678' },
            { icon: '✅', action: 'Proposal #42 passed', time: '5 hours ago', user: 'Community' },
            { icon: '💰', action: 'Treasury transfer executed', time: '1 day ago', user: '0xabcd...efgh' },
            { icon: '👥', action: '50 new members joined', time: '2 days ago', user: 'System' },
            { icon: '🎯', action: 'Voting power delegated', time: '3 days ago', user: '0x9876...5432' },
          ].map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <div className="activity-action">{activity.action}</div>
                <div className="activity-meta">
                  <span className="activity-user">{activity.user}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
