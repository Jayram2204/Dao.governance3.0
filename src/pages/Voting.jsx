import { ProposalList } from '../components/dao/ProposalList';
import { ProposalForm } from '../components/dao/ProposalForm';
import { GlassCard } from '../components/ui/GlassCard/GlassCard';
import { AnimatedButton } from '../components/ui/AnimatedButton/AnimatedButton';
import { Loader } from '../components/ui/Loader/Loader';
import { useGetVotingPower, useDelegateVotes } from '../hooks/useDAO';
import { useDAOStore } from '../store/useDAOStore';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { FaVoteYea, FaUserCheck, FaUsers, FaPlus } from 'react-icons/fa';
import './Voting.css';

export const Voting = () => {
  const { votingPower, isLoading, error } = useGetVotingPower();
  const { address } = useAccount();
  const { delegate, isPending, isConfirming, isConfirmed, error: delegateError } = useDelegateVotes();
  const { addNotification, delegateVotingPower } = useDAOStore();
  const [showDelegate, setShowDelegate] = useState(false);
  const [delegateAddress, setDelegateAddress] = useState('');
  const [showProposalForm, setShowProposalForm] = useState(false);

  const handleDelegate = () => {
    if (delegateAddress) {
      delegate(delegateAddress);
      delegateVotingPower(delegateAddress);
      addNotification({
        type: 'success',
        title: 'Delegation Initiated',
        message: `Delegating voting power to ${delegateAddress.slice(0, 6)}...${delegateAddress.slice(-4)}`
      });
    }
  };

  const handleSelfDelegate = () => {
    if (address) {
      delegate(address);
      delegateVotingPower(address);
      addNotification({
        type: 'success',
        title: 'Self-Delegation Initiated',
        message: 'Delegating voting power to yourself'
      });
    }
  };

  return (
    <div className="voting-page-container">
      <h2 className="page-title">DAO Governance & Proposals</h2>

      <GlassCard variant="primary" glow className="voting-summary-card">
        <h3 className="summary-title">Your Voting Power</h3>
        {isLoading && (
          <p className="text-secondary">
            <Loader size="sm" color="primary" /> Loading...
          </p>
        )}
        {error && <p className="text-accent-red">Error: {error.message}</p>}
        {!isLoading && !error && (
          <p className="voting-power-value">{parseFloat(votingPower).toFixed(2)} MDT</p>
        )}
        <p className="summary-text text-secondary">
          Hold MDT tokens to propose and vote on the future of our DAO.
          You can delegate your votes to a trusted address.
        </p>

        {!showDelegate ? (
          <div className="delegate-button-group">
            <AnimatedButton 
              variant="primary" 
              onClick={handleSelfDelegate} 
              disabled={isPending || isConfirming}
              icon={<FaUserCheck />}
            >
              {isPending || isConfirming ? (
                <>
                  <Loader size="sm" color="text-primary" /> Delegating...
                </>
              ) : (
                'Delegate to Self'
              )}
            </AnimatedButton>
            <AnimatedButton 
              variant="secondary" 
              onClick={() => setShowDelegate(true)}
              icon={<FaUsers />}
            >
              Delegate to Other
            </AnimatedButton>
          </div>
        ) : (
          <div className="delegate-input-group">
            <input
              type="text"
              className="delegate-address-input"
              placeholder="Enter delegatee address (0x...)"
              value={delegateAddress}
              onChange={(e) => setDelegateAddress(e.target.value)}
              disabled={isPending || isConfirming}
            />
            <AnimatedButton
              variant="primary"
              onClick={handleDelegate}
              disabled={!delegateAddress || isPending || isConfirming}
              icon={<FaVoteYea />}
            >
              {isPending || isConfirming ? (
                <>
                  <Loader size="sm" color="text-primary" /> Confirming...
                </>
              ) : (
                'Confirm Delegation'
              )}
            </AnimatedButton>
            <AnimatedButton
              variant="default"
              onClick={() => setShowDelegate(false)}
              disabled={isPending || isConfirming}
            >
              Cancel
            </AnimatedButton>
          </div>
        )}

        {(isPending || isConfirming || isConfirmed || delegateError) && (
          <div className="delegate-feedback">
            {isPending && (
              <p>
                <Loader size="sm" color="primary" /> Confirming delegation in wallet...
              </p>
            )}
            {isConfirming && (
              <p>
                <Loader size="sm" color="primary" /> Delegation transaction mining...
              </p>
            )}
            {isConfirmed && <p className="text-accent-teal">Delegation confirmed! ✔</p>}
            {delegateError && (
              <p className="text-accent-red">
                Error delegating: {delegateError.shortMessage || delegateError.message}
              </p>
            )}
          </div>
        )}
      </GlassCard>

      <div className="proposals-header">
        <h3 className="section-title">Active Proposals</h3>
        <AnimatedButton
          variant="primary"
          onClick={() => setShowProposalForm(true)}
          icon={<FaPlus />}
        >
          Create Proposal
        </AnimatedButton>
      </div>
      <ProposalList />

      <ProposalForm
        isOpen={showProposalForm}
        onClose={() => setShowProposalForm(false)}
      />
    </div>
  );
};
