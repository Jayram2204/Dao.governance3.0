# Smart Contracts Documentation

## Overview

Your DAO consists of three main smart contracts that work together to provide secure, decentralized governance:

1. **MyDAOToken** - The governance token (ERC20Votes)
2. **DAOTimelock** - The treasury with time-delayed execution
3. **MyDAOGovernor** - The governance logic and voting system

## Architecture

```
┌─────────────────┐
│  DAO Members    │
│  (Token Holders)│
└────────┬────────┘
         │ Vote on proposals
         ▼
┌─────────────────┐
│  MyDAOGovernor  │ ◄─── Reads voting power from MyDAOToken
│  (Governance)   │
└────────┬────────┘
         │ Queues approved proposals
         ▼
┌─────────────────┐
│  DAOTimelock    │ ◄─── Holds treasury funds
│  (Treasury)     │      Executes after delay
└─────────────────┘
```

## Contract Details

### 1. MyDAOToken.sol

**Purpose:** Governance token with voting capabilities

**Key Features:**
- ERC20 standard token
- Vote delegation (users can delegate voting power)
- Snapshot mechanism (voting power is recorded at proposal creation)
- Minting controlled by MINTER_ROLE
- 18 decimal places (standard)

**Functions:**
- `mint(address to, uint256 amount)` - Mint new tokens (MINTER_ROLE only)
- `delegate(address delegatee)` - Delegate voting power
- `getVotes(address account)` - Get current voting power
- `getPastVotes(address account, uint256 blockNumber)` - Get historical voting power

**Initial Configuration:**
- Name: "My DAO Token"
- Symbol: "MDT"
- Initial Supply: 1,000,000 tokens (configurable)
- Deployer receives initial supply and MINTER_ROLE

### 2. DAOTimelock.sol

**Purpose:** Treasury that enforces time delays on all operations

**Key Features:**
- Holds all DAO funds (ETH, tokens, NFTs)
- Enforces minimum delay before execution (2 days default)
- Role-based access control
- Can execute any transaction after delay

**Roles:**
- `PROPOSER_ROLE` - Can schedule operations (Governor contract)
- `EXECUTOR_ROLE` - Can execute operations (Governor contract or anyone)
- `ADMIN_ROLE` - Can manage roles (Governor contract after setup)

**Functions:**
- `schedule()` - Schedule an operation (PROPOSER_ROLE)
- `execute()` - Execute a scheduled operation (EXECUTOR_ROLE)
- `cancel()` - Cancel a scheduled operation (PROPOSER_ROLE)

**Initial Configuration:**
- Min Delay: 172,800 seconds (2 days)
- Proposers: Governor contract (set after deployment)
- Executors: Anyone (0x0 address)
- Admin: Governor contract (transferred after deployment)

### 3. MyDAOGovernor.sol

**Purpose:** Core governance logic - proposals, voting, execution

**Key Features:**
- Create and vote on proposals
- Integrates with token for voting power
- Integrates with timelock for execution
- Quorum requirements
- Proposal threshold

**Proposal Lifecycle:**
1. **Pending** - Proposal created, voting hasn't started
2. **Active** - Voting is open
3. **Succeeded** - Proposal passed (quorum met, more for than against)
4. **Queued** - Proposal scheduled in timelock
5. **Executed** - Proposal executed after delay
6. **Defeated** - Proposal failed (didn't meet quorum or more against)
7. **Canceled** - Proposal canceled by proposer

**Functions:**
- `propose()` - Create a new proposal
- `castVote()` - Vote on a proposal (For/Against/Abstain)
- `queue()` - Queue a successful proposal
- `execute()` - Execute a queued proposal after delay
- `cancel()` - Cancel a proposal

**Initial Configuration:**
- Voting Delay: 1 block (~12 seconds)
- Voting Period: 45,818 blocks (~1 week)
- Proposal Threshold: 1,000 tokens
- Quorum: 4% of total supply

## Deployment Process

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PRIVATE_KEY=your_private_key_here
VITE_SEPOLIA_RPC_URL=your_rpc_url_here
VITE_ETHERSCAN_API_KEY=your_etherscan_key_here
```

### Deploy to Local Network

```bash
# Start local Hardhat node
npx hardhat node

# In another terminal, deploy
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Deploy to Mainnet

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

## Post-Deployment Configuration

### 1. Update Frontend Configuration

After deployment, update `src/config/contracts.js` with the deployed addresses:

```javascript
export const CONTRACTS = {
  TOKEN: "0x...", // MyDAOToken address
  TIMELOCK: "0x...", // DAOTimelock address
  GOVERNOR: "0x...", // MyDAOGovernor address
};
```

### 2. Verify Contracts on Etherscan

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### 3. Distribute Tokens

Transfer tokens to DAO members:

```javascript
// Using ethers.js
await token.transfer(memberAddress, amount);
```

### 4. Delegate Voting Power

Members must delegate their voting power (can delegate to themselves):

```javascript
// Delegate to self
await token.delegate(myAddress);

// Or delegate to another address
await token.delegate(delegateAddress);
```

## Creating a Proposal

### Example: Transfer Funds from Treasury

```javascript
// 1. Encode the function call
const transferCalldata = treasury.interface.encodeFunctionData(
  "transfer",
  [recipientAddress, amount]
);

// 2. Create proposal
const tx = await governor.propose(
  [treasuryAddress], // targets
  [0], // values (ETH to send)
  [transferCalldata], // calldatas
  "Proposal #1: Fund Development Team" // description
);

// 3. Wait for voting delay
// 4. Vote on proposal
await governor.castVote(proposalId, 1); // 1 = For, 0 = Against, 2 = Abstain

// 5. After voting period, queue proposal
await governor.queue(
  [treasuryAddress],
  [0],
  [transferCalldata],
  descriptionHash
);

// 6. Wait for timelock delay (2 days)
// 7. Execute proposal
await governor.execute(
  [treasuryAddress],
  [0],
  [transferCalldata],
  descriptionHash
);
```

## Security Considerations

### Critical Security Features

1. **Timelock Delay** - 2-day delay prevents immediate execution of malicious proposals
2. **Quorum Requirement** - 4% of supply must vote to prevent low-participation attacks
3. **Proposal Threshold** - 1,000 tokens required to prevent spam proposals
4. **Role-Based Access** - Only Governor can propose to Timelock
5. **Snapshot Voting** - Voting power locked at proposal creation prevents manipulation

### Best Practices

1. **Test Thoroughly** - Always test on testnet before mainnet
2. **Audit Contracts** - Get professional audit for mainnet deployment
3. **Start Conservative** - Begin with higher thresholds, lower over time
4. **Monitor Proposals** - Watch for suspicious proposals during timelock delay
5. **Emergency Procedures** - Have a plan for responding to attacks

### Common Vulnerabilities to Avoid

1. **Flash Loan Attacks** - Mitigated by snapshot voting
2. **Governance Takeover** - Mitigated by quorum and timelock
3. **Spam Proposals** - Mitigated by proposal threshold
4. **Immediate Execution** - Mitigated by timelock delay

## Governance Parameters

### Recommended Settings

**For Small DAOs (<100 members):**
- Voting Period: 3 days
- Proposal Threshold: 1% of supply
- Quorum: 10%
- Timelock Delay: 1 day

**For Medium DAOs (100-1000 members):**
- Voting Period: 7 days
- Proposal Threshold: 0.5% of supply
- Quorum: 4%
- Timelock Delay: 2 days

**For Large DAOs (>1000 members):**
- Voting Period: 14 days
- Proposal Threshold: 0.1% of supply
- Quorum: 2%
- Timelock Delay: 7 days

## Testing

Run the test suite:

```bash
npx hardhat test
```

Run with coverage:

```bash
npx hardhat coverage
```

## Upgrading Contracts

⚠️ **WARNING:** These contracts are NOT upgradeable by design for security.

To "upgrade":
1. Deploy new contracts
2. Create proposal to transfer funds from old treasury to new
3. Migrate token holders (if changing token)
4. Update frontend to use new addresses

## Troubleshooting

### Common Issues

**"Insufficient voting power"**
- Solution: Delegate your tokens first with `token.delegate(yourAddress)`

**"Proposal threshold not met"**
- Solution: Acquire more tokens or lower the threshold via governance

**"Quorum not reached"**
- Solution: Get more members to vote or lower quorum via governance

**"Timelock delay not met"**
- Solution: Wait for the full delay period (2 days)

## Resources

- [OpenZeppelin Governor Documentation](https://docs.openzeppelin.com/contracts/4.x/governance)
- [OpenZeppelin Timelock Documentation](https://docs.openzeppelin.com/contracts/4.x/api/governance#TimelockController)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)

## Support

For issues or questions:
1. Check this documentation
2. Review OpenZeppelin docs
3. Test on local network first
4. Use testnet before mainnet
