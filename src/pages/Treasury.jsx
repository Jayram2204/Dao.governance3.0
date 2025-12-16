import { TreasuryOverview } from '../components/dao/TreasuryOverview';
import { ProposalForm } from '../components/dao/ProposalForm';
import { GlassCard } from '../components/ui/GlassCard/GlassCard';
import { Button } from '../components/ui/Button/Button';
import Treasury3D from '../components/charts/Treasury3D/Treasury3D';
import { useGetTreasuryBalances } from '../hooks/useDAO';
import { useState } from 'react';
import './Treasury.css';

export const Treasury = () => {
  const { treasuryBalances, isLoading, error } = useGetTreasuryBalances();
  const [showProposalForm, setShowProposalForm] = useState(false);

  const totalValue = treasuryBalances.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="treasury-page-container">
      <h2 className="page-title">DAO Treasury</h2>

      <GlassCard variant="primary" glow className="treasury-summary-card">
        <h3 className="summary-title">Total Treasury Value</h3>
        {isLoading && <p className="text-secondary">Loading...</p>}
        {error && <p className="text-accent-red">Error: {error.message}</p>}
        {!isLoading && !error && (
          <p className="total-value">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        )}
        <p className="summary-text text-secondary">
          This vault holds all the assets managed by the DAO.
          Any disbursements require a successful governance vote and a timelock delay.
        </p>
        <Button variant="primary" style={{ marginTop: '1rem' }} onClick={() => setShowProposalForm(true)}>
          Propose Spend
        </Button>
      </GlassCard>

      <h3 className="section-title">Asset Allocation</h3>
      {!isLoading && !error && (
        <Treasury3D 
          assets={treasuryBalances.map((asset, index) => ({
            ...asset,
            color: index === 0 ? '#8B5CF6' : index === 1 ? '#3B82F6' : index === 2 ? '#10B981' : '#F59E0B'
          }))}
          variant="torus"
        />
      )}
      {(isLoading || error) && <TreasuryOverview />}

      <h3 className="section-title">Individual Assets</h3>
      <GlassCard variant="secondary" className="individual-assets-card">
        {isLoading && <p className="text-secondary">Loading individual assets...</p>}
        {error && <p className="text-accent-red">Error: {error.message}</p>}
        {!isLoading && !error && treasuryBalances.length > 0 ? (
          <ul className="asset-list">
            {treasuryBalances.map((asset, index) => (
              <li key={index} className="asset-item">
                <span className="asset-name">{asset.name}</span>
                <span className="asset-amount">{asset.value.toLocaleString()} {asset.symbol}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-secondary">No individual assets to display.</p>
        )}
      </GlassCard>

      <ProposalForm
        isOpen={showProposalForm}
        onClose={() => setShowProposalForm(false)}
      />
    </div>
  );
};
