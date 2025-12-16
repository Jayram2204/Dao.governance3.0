/**
 * Parse blockchain and wallet errors into user-friendly messages
 * @param {Error|string} error - The error object or message
 * @returns {string} User-friendly error message
 */
export const parseError = (error) => {
  if (!error) return 'An unknown error occurred';

  const message = error.message || error.shortMessage || String(error);

  // User rejected transaction
  if (message.includes('user rejected') || message.includes('User denied') || message.includes('rejected')) {
    return 'Transaction rejected in wallet';
  }

  // Insufficient funds
  if (message.includes('insufficient funds') || message.includes('insufficient balance')) {
    return "You don't have enough ETH for gas fees";
  }

  // Already voted
  if (message.includes('already voted') || message.includes('AlreadyVoted')) {
    return 'You have already voted on this proposal';
  }

  // Voting not active
  if (message.includes('not active') || message.includes('ProposalNotActive')) {
    return 'Voting period has ended for this proposal';
  }

  // No voting power
  if (message.includes('no voting power') || message.includes('insufficient voting power') || message.includes('NoVotingPower')) {
    return 'You need to delegate your tokens to vote';
  }

  // Proposal threshold not met
  if (message.includes('below proposal threshold') || message.includes('ProposalThresholdNotMet')) {
    return 'You need more tokens to create a proposal';
  }

  // Quorum not reached
  if (message.includes('quorum') || message.includes('Quorum')) {
    return 'Proposal did not reach quorum';
  }

  // Timelock delay not met
  if (message.includes('timelock') || message.includes('TimelockNotReady')) {
    return 'Timelock delay has not passed yet';
  }

  // Network error
  if (message.includes('network') || message.includes('timeout') || message.includes('NETWORK_ERROR')) {
    return 'Network error. Please check your connection';
  }

  // Contract error
  if (message.includes('execution reverted')) {
    return 'Transaction failed. Please try again';
  }

  // Nonce too high
  if (message.includes('nonce')) {
    return 'Transaction nonce error. Please reset your wallet';
  }

  // Gas estimation failed
  if (message.includes('gas') && message.includes('estimation')) {
    return 'Transaction would fail. Please check parameters';
  }

  // Default: show first 100 characters
  return message.substring(0, 100);
};

/**
 * Get a user-friendly title for an error
 * @param {Error|string} error - The error object or message
 * @returns {string} Error title
 */
export const getErrorTitle = (error) => {
  if (!error) return 'Error';

  const message = error.message || error.shortMessage || String(error);

  if (message.includes('user rejected') || message.includes('User denied')) {
    return 'Transaction Rejected';
  }

  if (message.includes('insufficient funds')) {
    return 'Insufficient Funds';
  }

  if (message.includes('network') || message.includes('timeout')) {
    return 'Network Error';
  }

  return 'Transaction Failed';
};
