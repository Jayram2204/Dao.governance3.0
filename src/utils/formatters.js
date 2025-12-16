import { formatEther, formatUnits, parseEther } from 'viem';
import { TIME_CONSTANTS, BLOCK_TIME } from '../constants';

/**
 * Format token amount with decimals
 */
export const formatTokenAmount = (amount, decimals = 18, maxDecimals = 2) => {
  if (!amount) return '0';
  
  try {
    const formatted = formatUnits(BigInt(amount), decimals);
    const num = parseFloat(formatted);
    
    if (num === 0) return '0';
    if (num < 0.01) return '< 0.01';
    
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    });
  } catch (e) {
    console.error('Error formatting token amount:', e);
    return '0';
  }
};

/**
 * Format ETH amount
 */
export const formatEthAmount = (amount, maxDecimals = 4) => {
  if (!amount) return '0';
  
  try {
    const formatted = formatEther(BigInt(amount));
    const num = parseFloat(formatted);
    
    if (num === 0) return '0';
    if (num < 0.0001) return '< 0.0001';
    
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    });
  } catch (e) {
    console.error('Error formatting ETH amount:', e);
    return '0';
  }
};

/**
 * Format USD amount
 */
export const formatUSD = (amount) => {
  if (!amount) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercentage = (value, total, decimals = 1) => {
  if (!total || total === 0) return '0%';
  
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Format address (0x1234...5678)
 */
export const formatAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return '';
  if (address.length < startLength + endLength) return address;
  
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

/**
 * Format date
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (includeTime) {
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format relative time (2 hours ago, 3 days ago)
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  
  if (diff < TIME_CONSTANTS.MINUTE) {
    return 'just now';
  }
  
  if (diff < TIME_CONSTANTS.HOUR) {
    const minutes = Math.floor(diff / TIME_CONSTANTS.MINUTE);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  
  if (diff < TIME_CONSTANTS.DAY) {
    const hours = Math.floor(diff / TIME_CONSTANTS.HOUR);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  
  if (diff < TIME_CONSTANTS.WEEK) {
    const days = Math.floor(diff / TIME_CONSTANTS.DAY);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  
  const weeks = Math.floor(diff / TIME_CONSTANTS.WEEK);
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
};

/**
 * Format time remaining
 */
export const formatTimeRemaining = (endDate) => {
  if (!endDate) return '';
  
  const now = Date.now();
  const end = new Date(endDate).getTime();
  const diff = end - now;
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / TIME_CONSTANTS.DAY);
  const hours = Math.floor((diff % TIME_CONSTANTS.DAY) / TIME_CONSTANTS.HOUR);
  const minutes = Math.floor((diff % TIME_CONSTANTS.HOUR) / TIME_CONSTANTS.MINUTE);
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }
  
  return `${minutes}m remaining`;
};

/**
 * Format block number to time estimate
 */
export const formatBlocksToTime = (blocks) => {
  const seconds = blocks * BLOCK_TIME;
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  
  if (days > 0) {
    return `~${days}d ${hours}h`;
  }
  
  if (hours > 0) {
    return `~${hours}h`;
  }
  
  const minutes = Math.floor(seconds / 60);
  return `~${minutes}m`;
};

/**
 * Format large numbers (1.2K, 3.4M, etc.)
 */
export const formatCompactNumber = (num) => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export default {
  formatTokenAmount,
  formatEthAmount,
  formatUSD,
  formatPercentage,
  formatAddress,
  formatDate,
  formatRelativeTime,
  formatTimeRemaining,
  formatBlocksToTime,
  formatCompactNumber,
  truncateText,
};
