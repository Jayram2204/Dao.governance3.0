import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useDAOStore = create(
  subscribeWithSelector((set, get) => ({
    // Core State
    proposals: [],
    members: [],
    treasuryAssets: [],
    votingPower: '0',
    delegatedTo: null,
    userVotes: {},
    
    // UI State
    isLoading: false,
    error: null,
    selectedProposal: null,
    showVoteModal: false,
    showDelegateModal: false,
    
    // 3D Visualization State
    hoveredAsset: null,
    chartVariant: 'torus', // 'torus' or 'sphere'
    
    // Notifications
    notifications: [],
    
    // Actions - Proposals
    setProposals: (proposals) => set({ proposals }),
    
    addProposal: (proposal) => set((state) => ({
      proposals: [{ ...proposal, id: Date.now(), createdAt: new Date() }, ...state.proposals]
    })),
    
    updateProposal: (proposalId, updates) => set((state) => ({
      proposals: state.proposals.map(p => 
        p.id === proposalId ? { ...p, ...updates } : p
      )
    })),
    
    voteOnProposal: (proposalId, vote, votingPower) => set((state) => {
      const updatedProposals = state.proposals.map(p => {
        if (p.id === proposalId) {
          const newVotesFor = vote === 'for' ? p.votesFor + votingPower : p.votesFor;
          const newVotesAgainst = vote === 'against' ? p.votesAgainst + votingPower : p.votesAgainst;
          
          return {
            ...p,
            votesFor: newVotesFor,
            votesAgainst: newVotesAgainst,
            totalVotes: newVotesFor + newVotesAgainst,
            hasVoted: true
          };
        }
        return p;
      });
      
      return {
        proposals: updatedProposals,
        userVotes: { ...state.userVotes, [proposalId]: vote }
      };
    }),
    
    // Actions - Treasury
    setTreasuryAssets: (assets) => set({ treasuryAssets: assets }),
    
    updateAssetValue: (symbol, newValue) => set((state) => ({
      treasuryAssets: state.treasuryAssets.map(asset =>
        asset.symbol === symbol ? { ...asset, value: newValue } : asset
      )
    })),
    
    // Actions - Members
    setMembers: (members) => set({ members }),
    
    addMember: (member) => set((state) => ({
      members: [...state.members, member]
    })),
    
    // Actions - Voting Power
    setVotingPower: (power) => set({ votingPower: power }),
    
    setDelegatedTo: (address) => set({ delegatedTo: address }),
    
    delegateVotingPower: (toAddress) => set((state) => ({
      delegatedTo: toAddress,
      notifications: [...state.notifications, {
        id: Date.now(),
        type: 'success',
        message: `Voting power delegated to ${toAddress.slice(0, 6)}...${toAddress.slice(-4)}`,
        timestamp: new Date()
      }]
    })),
    
    // Actions - UI State
    setLoading: (isLoading) => set({ isLoading }),
    
    setError: (error) => set({ error }),
    
    setSelectedProposal: (proposal) => set({ selectedProposal: proposal }),
    
    setShowVoteModal: (show) => set({ showVoteModal: show }),
    
    setShowDelegateModal: (show) => set({ showDelegateModal: show }),
    
    // Actions - 3D Visualization
    setHoveredAsset: (asset) => set({ hoveredAsset: asset }),
    
    setChartVariant: (variant) => set({ chartVariant: variant }),
    
    // Actions - Notifications
    addNotification: (notification) => set((state) => ({
      notifications: [...state.notifications, {
        ...notification,
        id: Date.now(),
        timestamp: new Date()
      }]
    })),
    
    removeNotification: (id) => set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),
    
    clearNotifications: () => set({ notifications: [] }),
    
    // Getters
    getProposalById: (id) => {
      const { proposals } = get();
      return proposals.find(p => p.id === id);
    },
    
    getActiveProposals: () => {
      const { proposals } = get();
      return proposals.filter(p => p.status === 'active');
    },
    
    getPendingProposals: () => {
      const { proposals } = get();
      return proposals.filter(p => p.status === 'pending');
    },
    
    getExecutedProposals: () => {
      const { proposals } = get();
      return proposals.filter(p => p.status === 'executed');
    },
    
    getTotalTreasuryValue: () => {
      const { treasuryAssets } = get();
      return treasuryAssets.reduce((total, asset) => total + asset.value, 0);
    },
    
    getAssetAllocation: () => {
      const { treasuryAssets } = get();
      const total = treasuryAssets.reduce((sum, asset) => sum + asset.value, 0);
      return treasuryAssets.map(asset => ({
        ...asset,
        percentage: (asset.value / total) * 100
      }));
    },
    
    getUserVoteOnProposal: (proposalId) => {
      const { userVotes } = get();
      return userVotes[proposalId] || null;
    },
    
    // Computed values
    get totalTreasuryValue() {
      return get().getTotalTreasuryValue();
    },
    
    get assetAllocation() {
      return get().getAssetAllocation();
    }
  }))
);
