// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MyDAOToken
 * @dev ERC20Votes token for governance. It mints an initial supply to the deployer.
 * Includes snapshotting and delegation functionality crucial for DAOs.
 * Minting/burning is handled by an AccessControl role, not public.
 */
contract MyDAOToken is ERC20, ERC20Permit, ERC20Votes, AccessControl {
    // Define a unique role for minters
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Constructor: Deploys the token and gives initial supply to the deployer
    constructor(uint256 initialSupply) 
        ERC20("My DAO Token", "MDT") 
        ERC20Permit("My DAO Token") 
    {
        // Grant the deployer the MINTER_ROLE and DEFAULT_ADMIN_ROLE
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        // Mint initial supply to the deployer
        // 18 decimal places is standard for ERC20
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Only MINTER_ROLE can mint new tokens.
     * This ensures the token supply is controlled by the DAO or a specific role.
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    // The following overrides are required for ERC20Votes to correctly track voting power

    function _update(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, amount);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
