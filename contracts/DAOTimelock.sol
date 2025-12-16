// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title DAOTimelock
 * @dev This contract acts as the DAO's treasury. It holds all the assets
 * and executes operations only after a specified delay.
 * Only the Governor contract (or other PROPOSER_ROLE holders) can propose actions.
 * Only the EXECUTOR_ROLE can execute.
 * The ADMIN_ROLE can manage other roles and change the minDelay.
 */
contract DAOTimelock is TimelockController {
    /**
     * @dev Constructor: Sets up the TimelockController.
     * @param minDelay The minimum delay before a proposed transaction can be executed (in seconds)
     * @param proposers Addresses allowed to schedule transactions (your Governor will be one)
     * @param executors Addresses allowed to execute scheduled transactions
     * @param admin The initial admin (can be the deployer, or a multi-sig)
     */
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {
        // By default, the deployer is the DEFAULT_ADMIN_ROLE
        // We often revoke admin rights from the deployer after setting up the Governor
        // and transfer it to the Governor itself, or a multi-sig
    }
}
