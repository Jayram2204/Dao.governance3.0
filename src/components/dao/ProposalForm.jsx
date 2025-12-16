import React, { useState } from 'react';
import { usePropose } from '../../hooks/useDAO';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton/AnimatedButton';
import { Loader } from '../ui/Loader/Loader';
import { FaPlus, FaTimes, FaCoins, FaCode, FaSlidersH, FaCogs, FaSpinner, FaPaperPlane, FaRocket, FaCog } from 'react-icons/fa';
import { parseEther } from 'viem';
import './ProposalForm.css';

export const ProposalForm = ({ isOpen, onClose }) => {
  const { propose, isPending, isConfirming, isConfirmed, error } = usePropose();
  const [proposalType, setProposalType] = useState('treasury');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // Treasury Management
    treasury: {
      recipient: '',
      amount: '',
      tokenAddress: '0x0000000000000000000000000000000000000000', // ETH
    },
    // Contract Upgrade
    upgrade: {
      proxyAddress: '',
      newImplementation: '',
    },
    // Parameter Changes
    parameter: {
      contractAddress: '',
      functionName: '',
      newValue: '',
    },
    // Custom Actions
    custom: {
      targetAddress: '',
      value: '',
      functionSignature: '',
      parameters: '',
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties like "treasury.recipient"
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      // Handle top-level properties
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTypeChange = (type) => {
    setProposalType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let targets = [];
    let values = [];
    let calldatas = [];

    switch (proposalType) {
      case 'treasury':
        // Simple ETH transfer
        targets = [formData.treasury.recipient];
        values = [formData.treasury.amount ? parseEther(formData.treasury.amount) : 0n];
        calldatas = ['0x']; // Empty calldata for ETH transfers
        break;

      case 'upgrade':
        // Contract upgrade via proxy
        // This would typically call an upgrade function on the proxy
        targets = [formData.upgrade.proxyAddress];
        values = [0n];
        // This is a simplified example - real upgrade would need proper encoding
        calldatas = ['0x']; // Would need to encode upgradeTo(newImplementation)
        break;

      case 'parameter':
        // Parameter change
        targets = [formData.parameter.contractAddress];
        values = [0n];
        // This would need proper function encoding
        calldatas = ['0x']; // Would need to encode the parameter change function
        break;

      case 'custom':
        // Custom contract call
        targets = [formData.custom.targetAddress];
        values = [formData.custom.value ? parseEther(formData.custom.value) : 0n];
        calldatas = ['0x']; // Would need to encode the custom function call
        break;

      default:
        return;
    }

    const description = `${formData.title}\n\n${formData.description}\n\nProposal Type: ${proposalType.toUpperCase()}`;

    propose(targets, values, calldatas, description);
  };

  const handleClose = () => {
    if (!isPending && !isConfirming) {
      setProposalType('treasury');
      setFormData({
        title: '',
        description: '',
        treasury: {
          recipient: '',
          amount: '',
          tokenAddress: '0x0000000000000000000000000000000000000000',
        },
        upgrade: {
          proxyAddress: '',
          newImplementation: '',
        },
        parameter: {
          contractAddress: '',
          parameterName: '',
          newValue: '',
        },
        custom: {
          targetAddress: '',
          value: '',
          functionSignature: '',
          parameters: '',
        }
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="proposal-form-overlay" onClick={handleClose}>
      <div className="proposal-form-container" onClick={(e) => e.stopPropagation()}>
        <GlassCard variant="primary" className="proposal-form-card">
          <div className="proposal-form-header">
            <h3 className="form-title">
              <FaPlus className="form-icon" />
              Create New Proposal
            </h3>
            <button
              className="close-button"
              onClick={handleClose}
              disabled={isPending || isConfirming}
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="proposal-form">
            <div className="form-group">
              <label htmlFor="proposalType" className="form-label">Proposal Type</label>
              <select
                id="proposalType"
                value={proposalType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="form-input"
                disabled={isPending || isConfirming}
              >
                <option value="treasury">Treasury Management</option>
                <option value="upgrade">Contract Upgrade</option>
                <option value="parameter">Parameter Change</option>
                <option value="custom">Custom Action</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title" className="form-label">Proposal Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="e.g., Fund Development Team Q1 2025"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={isPending || isConfirming}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                placeholder="Describe what this proposal does and why it should be approved..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
                disabled={isPending || isConfirming}
              />
            </div>

            {/* Treasury Management Fields */}
            {proposalType === 'treasury' && (
              <div className="form-section">
                <h4 className="section-title">
                  <FaCoins className="section-icon" />
                  Treasury Management
                </h4>
                <p className="section-subtitle">Transfer funds from the DAO treasury</p>

                <div className="form-group">
                  <label htmlFor="treasuryRecipient" className="form-label">Recipient Address</label>
                  <input
                    type="text"
                    id="treasuryRecipient"
                    name="treasury.recipient"
                    className="form-input"
                    placeholder="0x..."
                    value={formData.treasury.recipient}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="treasuryAmount" className="form-label">Amount (ETH)</label>
                  <input
                    type="number"
                    id="treasuryAmount"
                    name="treasury.amount"
                    className="form-input"
                    placeholder="0.0"
                    step="0.01"
                    min="0"
                    value={formData.treasury.amount}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>
              </div>
            )}

            {/* Contract Upgrade Fields */}
            {proposalType === 'upgrade' && (
              <div className="form-section">
                <h4 className="section-title">
                  <FaCogs className="section-icon" />
                  Contract Upgrade
                </h4>
                <p className="section-subtitle">Upgrade a proxy contract to a new implementation</p>

                <div className="form-group">
                  <label htmlFor="proxyAddress" className="form-label">Proxy Contract Address</label>
                  <input
                    type="text"
                    id="proxyAddress"
                    name="upgrade.proxyAddress"
                    className="form-input"
                    placeholder="0x..."
                    value={formData.upgrade.proxyAddress}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newImplementation" className="form-label">New Implementation Address</label>
                  <input
                    type="text"
                    id="newImplementation"
                    name="upgrade.newImplementation"
                    className="form-input"
                    placeholder="0x..."
                    value={formData.upgrade.newImplementation}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>
              </div>
            )}

            {/* Parameter Change Fields */}
            {proposalType === 'parameter' && (
              <div className="form-section">
                <h4 className="section-title">
                  <FaSlidersH className="section-icon" />
                  Parameter Change
                </h4>
                <p className="section-subtitle">Modify contract parameters</p>

                <div className="form-group">
                  <label htmlFor="paramContractAddress" className="form-label">Contract Address</label>
                  <input
                    type="text"
                    id="paramContractAddress"
                    name="parameter.contractAddress"
                    className="form-input"
                    placeholder="0x..."
                    value={formData.parameter.contractAddress}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="parameterName" className="form-label">Parameter Name</label>
                  <input
                    type="text"
                    id="parameterName"
                    name="parameter.parameterName"
                    className="form-input"
                    placeholder="e.g., votingPeriod"
                    value={formData.parameter.parameterName}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newValue" className="form-label">New Value</label>
                  <input
                    type="text"
                    id="newValue"
                    name="parameter.newValue"
                    className="form-input"
                    placeholder="New parameter value"
                    value={formData.parameter.newValue}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>
              </div>
            )}

            {/* Custom Action Fields */}
            {proposalType === 'custom' && (
              <div className="form-section">
                <h4 className="section-title">
                  <FaCode className="section-icon" />
                  Custom Action
                </h4>
                <p className="section-subtitle">Execute a custom contract function</p>

                <div className="form-group">
                  <label htmlFor="customTargetAddress" className="form-label">Target Contract Address</label>
                  <input
                    type="text"
                    id="customTargetAddress"
                    name="custom.targetAddress"
                    className="form-input"
                    placeholder="0x..."
                    value={formData.custom.targetAddress}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="functionSignature" className="form-label">Function Signature</label>
                  <input
                    type="text"
                    id="functionSignature"
                    name="custom.functionSignature"
                    className="form-input"
                    placeholder="transfer(address,uint256)"
                    value={formData.custom.functionSignature}
                    onChange={handleInputChange}
                    required
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="parameters" className="form-label">Parameters (JSON array)</label>
                  <textarea
                    id="parameters"
                    name="custom.parameters"
                    className="form-textarea"
                    placeholder='["0x123...", "1000000000000000000"]'
                    value={formData.custom.parameters}
                    onChange={handleInputChange}
                    rows={3}
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customValue" className="form-label">ETH Value (optional)</label>
                  <input
                    type="number"
                    id="customValue"
                    name="custom.value"
                    className="form-input"
                    placeholder="0.0"
                    step="0.01"
                    min="0"
                    value={formData.custom.value}
                    onChange={handleInputChange}
                    disabled={isPending || isConfirming}
                  />
                </div>
              </div>
            )}

            {(isPending || isConfirming || isConfirmed || error) && (
              <div className="form-feedback">
                {isPending && (
                  <div className="feedback-item">
                    <Loader size="sm" color="primary" />
                    <span>Submitting proposal to blockchain...</span>
                  </div>
                )}
                {isConfirming && (
                  <div className="feedback-item">
                    <Loader size="sm" color="primary" />
                    <span>Proposal transaction is mining...</span>
                  </div>
                )}
                {isConfirmed && (
                  <div className="feedback-item success">
                    <span>✅ Proposal created successfully!</span>
                  </div>
                )}
                {error && (
                  <div className="feedback-item error">
                    <span>❌ Error: {error.shortMessage || error.message}</span>
                  </div>
                )}
              </div>
            )}

            <div className="form-actions">
              <AnimatedButton
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={isPending || isConfirming}
              >
                Cancel
              </AnimatedButton>
              <AnimatedButton
                type="submit"
                variant="primary"
                disabled={isPending || isConfirming || !formData.title || !formData.description || 
                  (proposalType === 'treasury' && (!formData.treasury.recipient || !formData.treasury.amount)) ||
                  (proposalType === 'upgrade' && (!formData.upgrade.proxyAddress || !formData.upgrade.newImplementation)) ||
                  (proposalType === 'parameter' && (!formData.parameter.contractAddress || !formData.parameter.parameterName || !formData.parameter.newValue)) ||
                  (proposalType === 'custom' && (!formData.custom.targetAddress || !formData.custom.functionSignature))}
              >
                {isPending || isConfirming ? (
                  <>
                    <Loader size="sm" color="text-primary" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Create Proposal
                  </>
                )}
              </AnimatedButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};