# DAO Deployment Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create or update `.env` file:

```env
# For deployment
PRIVATE_KEY=your_private_key_here
VITE_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
VITE_ETHERSCAN_API_KEY=your_etherscan_key_here

# For frontend
VITE_PRIVY_APP_ID=your_privy_app_id_here
```

### 3. Compile Contracts

```bash
npx hardhat compile
```

### 4. Run Tests

```bash
npx hardhat test
```

### 5. Deploy to Local Network

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy
npx hardhat run scripts/deploy.js --network localhost
```

### 6. Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Detailed Steps

### Step 1: Prepare for Deployment

1. **Get Testnet ETH**
   - Visit [Sepolia Faucet](https://sepoliafaucet.com/)
   - Get test ETH for deployment

2. **Get RPC URL**
   - Sign up at [Alchemy](https://www.alchemy.com/)
   - Create a new app on Sepolia
   - Copy the HTTPS URL

3. **Get Etherscan API Key**
   - Sign up at [Etherscan](https://etherscan.io/)
   - Create an API key for contract verification

### Step 2: Deploy Contracts

Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

The script will:
1. Deploy MyDAOToken with 1M initial supply
2. Deploy DAOTimelock with 2-day delay
3. Deploy MyDAOGovernor with voting parameters
4. Configure all roles automatically
5. Delegate voting power to deployer
6. Save deployment info to `deployments/sepolia.json`

### Step 3: Verify Contracts

After deployment, verify on Etherscan:

```bash
# Verify Token
npx hardhat verify --network sepolia <TOKEN_ADDRESS> "1000000000000000000000000"

# Verify Timelock
npx hardhat verify --network sepolia <TIMELOCK_ADDRESS> \
  172800 \
  "[]" \
  "[0x0000000000000000000000000000000000000000]" \
  "<YOUR_ADDRESS>"

# Verify Governor
npx hardhat verify --network sepolia <GOVERNOR_ADDRESS> \
  <TOKEN_ADDRESS> \
  <TIMELOCK_ADDRESS> \
  1 \
  45818 \
  "1000000000000000000000" \
  4
```

### Step 4: Update Frontend

Update `src/config/contracts.js`:

```javascript
export const CONTRACTS = {
  TOKEN: "0x...", // From deployment
  TIMELOCK: "0x...", // From deployment
  GOVERNOR: "0x...", // From deployment
};
```

### Step 5: Distribute Tokens

Transfer tokens to DAO members:

```javascript
// Using Hardhat console
npx hardhat console --network sepolia

const token = await ethers.getContractAt("MyDAOToken", "TOKEN_ADDRESS");
await token.transfer("MEMBER_ADDRESS", ethers.parseEther("1000"));
```

### Step 6: Delegate Voting Power

Members must delegate to participate:

```javascript
// Each member runs:
await token.delegate(myAddress); // Delegate to self
// or
await token.delegate(delegateAddress); // Delegate to someone else
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Contracts compiled successfully
- [ ] Tests passing
- [ ] Testnet ETH acquired
- [ ] Contracts deployed
- [ ] Contracts verified on Etherscan
- [ ] Deployment info saved
- [ ] Frontend updated with addresses
- [ ] Tokens distributed to members
- [ ] Voting power delegated
- [ ] First test proposal created

## Governance Parameters

### Current Settings

- **Voting Delay:** 1 block (~12 seconds)
- **Voting Period:** 45,818 blocks (~7 days)
- **Proposal Threshold:** 1,000 tokens
- **Quorum:** 4% of total supply
- **Timelock Delay:** 2 days

### Modifying Parameters

To change parameters, create a governance proposal:

```javascript
// Example: Change voting period to 14 days
const newVotingPeriod = 91636; // ~14 days in blocks

const calldata = governor.interface.encodeFunctionData(
  "setVotingPeriod",
  [newVotingPeriod]
);

await governor.propose(
  [governorAddress],
  [0],
  [calldata],
  "Proposal: Extend voting period to 14 days"
);
```

## Troubleshooting

### "Insufficient funds"
- Get more testnet ETH from faucet
- Check your wallet balance

### "Nonce too high"
- Reset your MetaMask account
- Or wait for pending transactions

### "Contract verification failed"
- Check constructor arguments match deployment
- Ensure Solidity version matches (0.8.20)
- Wait a few minutes and try again

### "Transaction reverted"
- Check you have enough tokens
- Ensure voting power is delegated
- Verify timelock delays have passed

## Security Checklist

Before mainnet deployment:

- [ ] Professional audit completed
- [ ] All tests passing
- [ ] Governance parameters reviewed
- [ ] Emergency procedures documented
- [ ] Multi-sig setup for initial admin
- [ ] Token distribution plan finalized
- [ ] Community educated on governance
- [ ] Monitoring tools configured

## Cost Estimates

### Sepolia Testnet
- Token: ~0.005 ETH
- Timelock: ~0.008 ETH
- Governor: ~0.015 ETH
- **Total: ~0.028 ETH** (free from faucet)

### Ethereum Mainnet (at 30 gwei)
- Token: ~$50-100
- Timelock: ~$80-150
- Governor: ~$150-300
- **Total: ~$280-550**

## Next Steps

After deployment:

1. **Test Governance**
   - Create a test proposal
   - Vote on it
   - Execute it

2. **Distribute Tokens**
   - Send to team members
   - Airdrop to community
   - Set up vesting if needed

3. **Launch**
   - Announce to community
   - Provide governance guide
   - Monitor first proposals

4. **Iterate**
   - Gather feedback
   - Adjust parameters via governance
   - Add features as needed

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Etherscan](https://etherscan.io/)
- [Alchemy](https://www.alchemy.com/)
