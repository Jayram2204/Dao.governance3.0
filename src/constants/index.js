// DAO 2.0 Constants

// Proposal States (matches OpenZeppelin Governor)
export const ProposalState = {
  PENDING: 0,
  ACTIVE: 1,
  CANCELED: 2,
  DEFEATED: 3,
  SUCCEEDED: 4,
  QUEUED: 5,
  EXPIRED: 6,
  EXECUTED: 7,
};

export const ProposalStateLabels = {
  [ProposalState.PENDING]: 'Pending',
  [ProposalState.ACTIVE]: 'Active',
  [ProposalState.CANCELED]: 'Canceled',
  [ProposalState.DEFEATED]: 'Defeated',
  [ProposalState.SUCCEEDED]: 'Succeeded',
  [ProposalState.QUEUED]: 'Queued',
  [ProposalState.EXPIRED]: 'Expired',
  [ProposalState.EXECUTED]: 'Executed',
};

export const ProposalStateColors = {
  [ProposalState.PENDING]: '#F59E0B',
  [ProposalState.ACTIVE]: '#10B981',
  [ProposalState.CANCELED]: '#6B7280',
  [ProposalState.DEFEATED]: '#EF4444',
  [ProposalState.SUCCEEDED]: '#10B981',
  [ProposalState.QUEUED]: '#3B82F6',
  [ProposalState.EXPIRED]: '#6B7280',
  [ProposalState.EXECUTED]: '#8B5CF6',
};

// Vote Support Values
export const VoteSupport = {
  AGAINST: 0,
  FOR: 1,
  ABSTAIN: 2,
};

export const VoteSupportLabels = {
  [VoteSupport.AGAINST]: 'Against',
  [VoteSupport.FOR]: 'For',
  [VoteSupport.ABSTAIN]: 'Abstain',
};

// Governance Parameters
export const GOVERNANCE_PARAMS = {
  VOTING_DELAY: 7200, // ~1 day in blocks
  VOTING_PERIOD: 50400, // ~7 days in blocks
  PROPOSAL_THRESHOLD: '1000', // 1000 tokens
  QUORUM_PERCENTAGE: 4, // 4%
  TIMELOCK_DELAY: 172800, // 2 days in seconds
  GRACE_PERIOD: 604800, // 7 days in seconds
};

// Network Configuration
export const SUPPORTED_CHAINS = {
  MAINNET: 1,
  SEPOLIA: 11155111,
  HARDHAT: 31337,
};

export const CHAIN_NAMES = {
  [SUPPORTED_CHAINS.MAINNET]: 'Ethereum Mainnet',
  [SUPPORTED_CHAINS.SEPOLIA]: 'Sepolia Testnet',
  [SUPPORTED_CHAINS.HARDHAT]: 'Hardhat Local',
};

export const BLOCK_EXPLORERS = {
  [SUPPORTED_CHAINS.MAINNET]: 'https://etherscan.io',
  [SUPPORTED_CHAINS.SEPOLIA]: 'https://sepolia.etherscan.io',
  [SUPPORTED_CHAINS.HARDHAT]: 'http://localhost:8545',
};

// Time Constants
export const TIME_CONSTANTS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
};

// Block Time (average)
export const BLOCK_TIME = 12; // seconds

// Token Decimals
export const TOKEN_DECIMALS = 18;

// UI Constants
export const ITEMS_PER_PAGE = 10;
export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_TITLE_LENGTH = 100;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'dao_theme',
  WALLET_CONNECTED: 'dao_wallet_connected',
  LAST_VISITED: 'dao_last_visited',
  NOTIFICATIONS: 'dao_notifications',
};

// API Endpoints (if using backend)
export const API_ENDPOINTS = {
  PROPOSALS: '/api/proposals',
  VOTES: '/api/votes',
  MEMBERS: '/api/members',
  TREASURY: '/api/treasury',
  ANALYTICS: '/api/analytics',
};

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: 'Insufficient token balance',
  INSUFFICIENT_VOTING_POWER: 'Insufficient voting power',
  ALREADY_VOTED: 'You have already voted on this proposal',
  PROPOSAL_NOT_ACTIVE: 'This proposal is not active',
  TRANSACTION_REJECTED: 'Transaction was rejected',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  VOTE_CAST: 'Vote cast successfully!',
  DELEGATION_SUCCESS: 'Voting power delegated successfully!',
  PROPOSAL_CREATED: 'Proposal created successfully!',
  PROPOSAL_EXECUTED: 'Proposal executed successfully!',
  TRANSACTION_CONFIRMED: 'Transaction confirmed!',
};

// Feature Flags
export const FEATURES = {
  PROPOSAL_CREATION: true,
  DELEGATION: true,
  TREASURY_MANAGEMENT: true,
  ANALYTICS: true,
  LEADERBOARD: true,
  NOTIFICATIONS: false, // Coming soon
  GOVERNANCE_FORUM: false, // Coming soon
};

// Social Links
export const SOCIAL_LINKS = {
  DISCORD: 'https://discord.gg/your-dao',
  TWITTER: 'https://twitter.com/your-dao',
  GITHUB: 'https://github.com/your-dao',
  DOCS: 'https://docs.your-dao.com',
  FORUM: 'https://forum.your-dao.com',
};

// DAO Metadata
export const DAO_METADATA = {
  NAME: 'DAO 2.0',
  DESCRIPTION: 'A decentralized autonomous organization for the future',
  TOKEN_NAME: 'My DAO Token',
  TOKEN_SYMBOL: 'MDT',
  WEBSITE: 'https://your-dao.com',
  EMAIL: 'contact@your-dao.com',
};

export default {
  ProposalState,
  ProposalStateLabels,
  ProposalStateColors,
  VoteSupport,
  VoteSupportLabels,
  GOVERNANCE_PARAMS,
  SUPPORTED_CHAINS,
  CHAIN_NAMES,
  BLOCK_EXPLORERS,
  TIME_CONSTANTS,
  BLOCK_TIME,
  TOKEN_DECIMALS,
  ITEMS_PER_PAGE,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURES,
  SOCIAL_LINKS,
  DAO_METADATA,
};
