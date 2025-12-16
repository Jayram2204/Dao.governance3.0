// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/**
 * @title MyDAOGovernor
 * @dev This contract implements the core logic for your DAO.
 * It connects the governance token (for voting power) and the timelocked treasury.
 * 
 * SECURITY FEATURES:
 * - Voting delay: Prevents flash loan attacks by requiring time between proposal and voting
 * - Timelock: 2-day delay before execution gives community time to react
 * - Quorum: Ensures minimum participation before proposals can pass
 * - Proposal threshold: Prevents spam by requiring minimum token holdings
 */
contract MyDAOGovernor is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    // Grace period after timelock expires (7 days)
    uint256 public constant EXECUTION_GRACE_PERIOD = 7 days;
    /**
     * @dev Constructor: Sets up the Governor with its token and timelock.
     * @param _token The governance token contract
     * @param _timelock The timelock controller contract
     * @param _votingDelay Blocks after proposal creation when voting starts
     * @param _votingPeriod Blocks voting is open for
     * @param _proposalThreshold Amount of tokens needed to create a proposal
     * @param _quorumNumerator Quorum percentage (e.g., 4 = 4%)
     */
    constructor(
        IVotes _token,
        TimelockController _timelock,
        uint48 _votingDelay,
        uint32 _votingPeriod,
        uint256 _proposalThreshold,
        uint256 _quorumNumerator
    )
        Governor("My DAO Governor")
        GovernorSettings(_votingDelay, _votingPeriod, _proposalThreshold)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorumNumerator)
        GovernorTimelockControl(_timelock)
    {}

    // The following functions are overrides required by Solidity

    function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.proposalNeedsQueuing(proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _queueOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    /**
     * @dev Override to prevent execution of expired proposals
     * Adds grace period check before executing
     */
    function _executeOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        require(!proposalExpired(proposalId), "Governor: proposal expired");
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    /**
     * @dev Check if proposal has expired after grace period
     * This prevents stale proposals from being executed months/years later
     */
    function proposalExpired(uint256 proposalId) public view returns (bool) {
        uint256 deadline = proposalDeadline(proposalId);
        return block.number > deadline + (EXECUTION_GRACE_PERIOD / 12); // Convert seconds to blocks
    }
}
