import { useGetProposalDetails, useGetProposalCount, useVote, useHasVoted } from '../../hooks/useDAO';
import { ProposalCard } from './ProposalCard';
import { Loader } from '../ui/Loader/Loader';
import { Card } from '../ui/Card/Card';

export const ProposalList = () => {
  const { proposalCount, isLoading: countLoading } = useGetProposalCount();
  const { castVote, isPending, isConfirming, isConfirmed, error: voteError } = useVote();

  const handleVoteClick = (proposalId, supports) => {
    console.log(`Attempting to vote on proposal ${proposalId} with support ${supports}`);
    castVote(BigInt(proposalId), supports);
  };

  if (countLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', gap: '1rem' }}>
        <Loader size="lg" color="primary" />
        <p style={{ color: 'var(--text-secondary)' }}>Loading proposals...</p>
      </div>
    );
  }

  // Generate proposals based on proposalCount
  const mockProposals = Array.from({ length: proposalCount || 0 }).map((_, i) => {
    const { proposal } = useGetProposalDetails(i + 1);
    return proposal;
  }).filter(proposal => proposal !== null);

  if (!mockProposals || mockProposals.length === 0) {
    return (
      <Card style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No proposals found yet.</p>
      </Card>
    );
  }

  return (
    <div className="proposal-list-container">
      {mockProposals.map((proposal) => {
        const { hasVoted } = useHasVoted(proposal.id);
        return (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onVoteClick={handleVoteClick}
            hasVoted={hasVoted}
            isVoting={isPending || isConfirming}
          />
        );
      })}

      {(isPending || isConfirming || isConfirmed || voteError) && (
        <Card className="vote-feedback-card" style={{ marginTop: '1.5rem', padding: '1.5rem', textAlign: 'center' }}>
          {isPending && (
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: 0 }}>
              <Loader size="sm" color="primary" /> Confirming vote in wallet...
            </p>
          )}
          {isConfirming && (
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: 0 }}>
              <Loader size="sm" color="primary" /> Vote transaction is mining...
            </p>
          )}
          {isConfirmed && (
            <p style={{ color: 'var(--accent-teal)', margin: 0 }}>
              ✔ Vote confirmed successfully!
            </p>
          )}
          {voteError && (
            <p style={{ color: 'var(--accent-red)', margin: 0 }}>
              Error casting vote: {voteError.shortMessage || voteError.message}
            </p>
          )}
        </Card>
      )}
    </div>
  );
};
