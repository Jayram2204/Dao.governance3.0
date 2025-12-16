import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount, useBalance } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { CONTRACTS, ERC20_ABI, TREASURY_ASSETS } from '../config/contracts';
import { useDAOStore } from '../store/useDAOStore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * Hook to get user's voting power
 */
export const useGetVotingPower = () => {
  const { address } = useAccount();
  
  const { data, isLoading, error } = useReadContract({
    address: CONTRACTS.TOKEN.address,
    abi: CONTRACTS.TOKEN.abi,
    functionName: 'getVotes',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Handle contract not deployed or other errors gracefully
  const hasError = error && (error.message?.includes('returned no data') || error.message?.includes('not a contract'));
  
  return {
    votingPower: data ? formatEther(data) : '0',
    isLoading,
    error: hasError ? null : error, // Don't show error if contract not deployed
  };
};

/**
 * Hook to get user's token balance
 */
export const useGetTokenBalance = () => {
  const { address } = useAccount();
  
  const { data, isLoading, error } = useReadContract({
    address: CONTRACTS.TOKEN.address,
    abi: CONTRACTS.TOKEN.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Handle contract not deployed or other errors gracefully
  const hasError = error && (error.message?.includes('returned no data') || error.message?.includes('not a contract'));
  
  return {
    balance: data ? formatEther(data) : '0',
    isLoading,
    error: hasError ? null : error, // Don't show error if contract not deployed
  };
};

/**
 * Hook to check if user has voted on a proposal
 */
export const useHasVoted = (proposalId) => {
  const { address } = useAccount();
  
  const { data, isLoading, error } = useReadContract({
    address: CONTRACTS.GOVERNOR.address,
    abi: CONTRACTS.GOVERNOR.abi,
    functionName: 'hasVoted',
    args: proposalId && address ? [proposalId, address] : undefined,
    query: {
      enabled: !!proposalId && !!address,
    },
  });

  // Handle contract not deployed or other errors gracefully
  const hasError = error && (error.message?.includes('returned no data') || error.message?.includes('not a contract'));
  
  return {
    hasVoted: !!data,
    isLoading,
    error: hasError ? null : error, // Don't show error if contract not deployed
  };
};

/**
 * Hook to cast a vote
 */
export const useVote = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const castVote = (proposalId, support) => {
    // support: 0 = Against, 1 = For, 2 = Abstain
    const supportValue = support === true ? 1 : support === false ? 0 : 2;
    
    writeContract({
      address: CONTRACTS.GOVERNOR.address,
      abi: CONTRACTS.GOVERNOR.abi,
      functionName: 'castVote',
      args: [proposalId, supportValue],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Vote cast successfully!');
    }
    if (error) {
      toast.error('Failed to cast vote');
    }
  }, [isConfirmed, error]);

  return {
    castVote,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

/**
 * Hook to create a proposal
 */
export const usePropose = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const propose = (targets, values, calldatas, description) => {
    writeContract({
      address: CONTRACTS.GOVERNOR.address,
      abi: CONTRACTS.GOVERNOR.abi,
      functionName: 'propose',
      args: [targets, values, calldatas, description],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Proposal created successfully!');
    }
    if (error) {
      toast.error('Failed to create proposal');
    }
  }, [isConfirmed, error]);

  return {
    propose,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

/**
 * Hook to delegate voting power
 */
export const useDelegate = () => {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const delegate = (delegatee) => {
    writeContract({
      address: CONTRACTS.TOKEN.address,
      abi: CONTRACTS.TOKEN.abi,
      functionName: 'delegate',
      args: [delegatee],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Voting power delegated successfully!');
    }
    if (error) {
      toast.error('Failed to delegate voting power');
    }
  }, [isConfirmed, error]);

  return {
    delegate,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

/**
 * Alias for backward compatibility
 */
export const useDelegateVotes = useDelegate;

/**
 * Hook to get treasury balances
 */
export const useGetTreasuryBalances = () => {
  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address: CONTRACTS.TIMELOCK.address,
  });

  // Return real ETH balance, empty array for other assets until contracts are deployed
  const balances = [];

  if (ethBalance && parseFloat(formatEther(ethBalance.value)) > 0) {
    balances.push({
      name: 'ETH',
      symbol: 'ETH',
      value: parseFloat(formatEther(ethBalance.value)),
    });
  }

  return {
    treasuryBalances: balances,
    isLoading: false,
    error: null,
  };
};

/**
 * Mock hook for proposal count - replace with actual contract call
 */
export const useGetProposalCount = () => {
  // In production, read from contract
  return {
    proposalCount: 0, // No proposals until contracts are deployed
    isLoading: false,
    error: null,
  };
};

/**
 * Mock hook for proposal details - replace with actual contract call
 */
export const useGetProposalDetails = (proposalId) => {
  // No mock data - return empty proposal until contracts are deployed
  const proposal = null;

  return {
    proposal,
    isLoading: false,
    error: null,
  };
};

/**
 * Main DAO hook for backward compatibility
 */
export const useDAO = () => {
  const {
    proposals,
    members,
    treasuryBalance,
    votingPower,
    setProposals,
    setMembers,
    setTreasuryBalance,
    setVotingPower,
    setLoading,
    setError,
  } = useDAOStore();

  const { proposalCount } = useGetProposalCount();
  const { treasuryBalances } = useGetTreasuryBalances();
  const { votingPower: userVotingPower } = useGetVotingPower();

  useEffect(() => {
    if (treasuryBalances) {
      const total = treasuryBalances.reduce((sum, asset) => sum + asset.value, 0);
      setTreasuryBalance(total.toString());
    }
  }, [treasuryBalances, setTreasuryBalance]);

  useEffect(() => {
    if (userVotingPower) {
      setVotingPower(userVotingPower);
    }
  }, [userVotingPower, setVotingPower]);

  return {
    proposals,
    members,
    treasuryBalance,
    votingPower,
    totalMembers: members.length,
    proposalCount,
  };
};
