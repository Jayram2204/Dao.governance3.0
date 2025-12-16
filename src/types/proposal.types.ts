export type ProposalStatus = 'pending' | 'active' | 'succeeded' | 'failed' | 'executed' | 'cancelled';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  votesFor: string;
  votesAgainst: string;
  status: ProposalStatus;
  createdAt: number;
  executionTime?: number;
}
