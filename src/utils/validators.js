import { isAddress } from 'viem';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../constants';

/**
 * Validate Ethereum address
 */
export const validateAddress = (address) => {
  if (!address) {
    return { valid: false, error: 'Address is required' };
  }
  
  if (!isAddress(address)) {
    return { valid: false, error: 'Invalid Ethereum address' };
  }
  
  return { valid: true };
};

/**
 * Validate proposal title
 */
export const validateProposalTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' };
  }
  
  if (title.length > MAX_TITLE_LENGTH) {
    return { valid: false, error: `Title must be less than ${MAX_TITLE_LENGTH} characters` };
  }
  
  return { valid: true };
};

/**
 * Validate proposal description
 */
export const validateProposalDescription = (description) => {
  if (!description || description.trim().length === 0) {
    return { valid: false, error: 'Description is required' };
  }
  
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return { valid: false, error: `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters` };
  }
  
  return { valid: true };
};

/**
 * Validate token amount
 */
export const validateTokenAmount = (amount, balance) => {
  if (!amount || amount === '0') {
    return { valid: false, error: 'Amount is required' };
  }
  
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || numAmount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  
  if (balance && numAmount > parseFloat(balance)) {
    return { valid: false, error: 'Insufficient balance' };
  }
  
  return { valid: true };
};

/**
 * Validate voting power
 */
export const validateVotingPower = (votingPower, required) => {
  const power = parseFloat(votingPower || '0');
  const requiredPower = parseFloat(required || '0');
  
  if (power < requiredPower) {
    return { 
      valid: false, 
      error: `Insufficient voting power. Required: ${requiredPower}, You have: ${power}` 
    };
  }
  
  return { valid: true };
};

/**
 * Validate URL
 */
export const validateURL = (url) => {
  if (!url) {
    return { valid: false, error: 'URL is required' };
  }
  
  try {
    new URL(url);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' };
  }
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
};

export default {
  validateAddress,
  validateProposalTitle,
  validateProposalDescription,
  validateTokenAmount,
  validateVotingPower,
  validateURL,
  validateEmail,
};
