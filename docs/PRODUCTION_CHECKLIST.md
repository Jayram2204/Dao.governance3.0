# 🛡️ Production Deployment Checklist

## Critical Security & Deployment Steps

This checklist covers everything needed to safely launch your DAO to production.

## ⚠️ CRITICAL: Do NOT Skip These Steps

### 1. Smart Contract Security

#### A. Testnet Deployment & Testing

**Before mainnet, you MUST:**

```bash
# 1. Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# 2. Save deployed addresses
# Update src/config/contracts.js with testnet addresses

# 3. Get testnet ETH
# Visit https://sepoliafaucet.com/

# 4. Test EVERY function:
```

**Test Checklist:**
- [ ] Deploy all three contracts successfully
- [ ] Verify contracts on Etherscan
- [ ] Mint initial token supply
- [ ] Delegate voting power to yourself
- [ ] Create a test proposal
- [ ] Vote on the proposal
- [ ] Wait for voting period to end
- [ ] Queue the proposal in Timelock
- [ ] Wait for Timelock delay (2 days)
- [ ] Execute the proposal
- [ ] Verify treasury transaction executed
- [ ] Test delegation to another address
- [ ] Test voting with delegated power
- [ ] Attempt to vote after period ends (should fail)
- [ ] Attempt to execute before delay (should fail)

#### B. Smart Contract Audit

**Option 1: Professional Audit (Recommended for Mainnet)**

Hire a security firm:
- **OpenZeppelin**: https://openzeppelin.com/security-audits
- **CertiK**: https://www.certik.com/
- **Trail of Bits**: https://www.trailofbits.com/
- **Consensys Diligence**: https://consensys.net/diligence/

Cost: $10,000 - $50,000+  
Timeline: 2-4 weeks

**Option 2: Community Audit (Minimum for Testnet)**

1. Share code on:
   - Code4rena: https://code4rena.com/
   - Immunefi: https://immunefi.com/
   - Reddit r/ethdev
   - Discord security channels

2. Offer bug bounty:
   - Critical: $5,000+
   - High: $1,000+
   - Medium: $500+
   - Low: $100+

3. Document all findings and fixes

#### C. Contract Verification on Etherscan

**After deployment, verify each contract:**

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

**Verification Checklist:**
- [ ] Token contract verified
- [ ] Timelock contract verified
- [ ] Governor contract verified
- [ ] All contracts show green checkmark on Etherscan
- [ ] Source code is readable on Etherscan
- [ ] Contract ABI is available

#### D. CRITICAL: Decentralize Admin Keys

**⚠️ THIS IS THE MOST IMPORTANT STEP**

Right now, your deployer wallet has god-mode powers. You MUST transfer control to the DAO.

**Step 1: Create Decentralization Proposal**

```javascript
// scripts/decentralize.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  const timelock = await hre.ethers.getContractAt("DAOTimelock", TIMELOCK_ADDRESS);
  const governor = await hre.ethers.getContractAt("MyDAOGovernor", GOVERNOR_ADDRESS);
  
  // Encode the calls to transfer roles
  const ADMIN_ROLE = await timelock.DEFAULT_ADMIN_ROLE();
  
  // Grant admin to Governor
  const grantAdminCalldata = timelock.interface.encodeFunctionData(
    "grantRole",
    [ADMIN_ROLE, GOVERNOR_ADDRESS]
  );
  
  // Revoke admin from deployer
  const revokeAdminCalldata = timelock.interface.encodeFunctionData(
    "revokeRole",
    [ADMIN_ROLE, deployer.address]
  );
  
  // Create proposal
  const tx = await governor.propose(
    [TIMELOCK_ADDRESS, TIMELOCK_ADDRESS],
    [0, 0],
    [grantAdminCalldata, revokeAdminCalldata],
    "Proposal: Decentralize DAO - Transfer admin rights to Governor"
  );
  
  console.log("Decentralization proposal created!");
  console.log("Transaction hash:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Step 2: Execute Decentralization**

1. Create the proposal (run script above)
2. Wait for voting delay (1 block)
3. Vote YES on the proposal
4. Wait for voting period (7 days)
5. Queue the proposal
6. Wait for timelock delay (2 days)
7. Execute the proposal

**Step 3: Verify Decentralization**

```bash
# Check that Governor has admin role
npx hardhat console --network sepolia

> const timelock = await ethers.getContractAt("DAOTimelock", "TIMELOCK_ADDRESS")
> const ADMIN_ROLE = await timelock.DEFAULT_ADMIN_ROLE()
> await timelock.hasRole(ADMIN_ROLE, "GOVERNOR_ADDRESS")
true  // ✅ Governor has admin

> await timelock.hasRole(ADMIN_ROLE, "YOUR_DEPLOYER_ADDRESS")
false  // ✅ Deployer no longer has admin
```

**Decentralization Checklist:**
- [ ] Proposal created to transfer admin
- [ ] Community voted on proposal
- [ ] Proposal executed successfully
- [ ] Governor has ADMIN_ROLE on Timelock
- [ ] Deployer no longer has ADMIN_ROLE
- [ ] Governor has PROPOSER_ROLE on Timelock
- [ ] Governor has MINTER_ROLE on Token (if applicable)
- [ ] Announcement made to community
- [ ] Documentation updated

### 2. Frontend Deployment

#### A. Deploy to Vercel

**Step 1: Prepare for Deployment**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Step 2: Configure Environment Variables**

In Vercel dashboard, add:
```
VITE_PRIVY_APP_ID=your_production_privy_id
VITE_MAINNET_RPC_URL=your_alchemy_mainnet_url
VITE_SEPOLIA_RPC_URL=your_alchemy_sepolia_url
VITE_ETHERSCAN_API_KEY=your_etherscan_key
```

**Step 3: Set Production Domain**

- Add custom domain in Vercel
- Configure DNS records
- Enable HTTPS (automatic)

**Vercel Deployment Checklist:**
- [ ] Project connected to GitHub
- [ ] Environment variables configured
- [ ] Build succeeds
- [ ] Site accessible at production URL
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] Auto-deploy on push enabled

#### B. Separate Environment Variables

Create `.env.production`:

```env
# Production Environment Variables

# Privy (Production)
VITE_PRIVY_APP_ID=your_production_privy_app_id

# RPC URLs (Production)
VITE_MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_PROD_KEY
VITE_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_PROD_KEY

# Contract Addresses (Mainnet)
VITE_TOKEN_ADDRESS=0xYourMainnetTokenAddress
VITE_GOVERNOR_ADDRESS=0xYourMainnetGovernorAddress
VITE_TIMELOCK_ADDRESS=0xYourMainnetTimelockAddress

# API Keys
VITE_ETHERSCAN_API_KEY=your_etherscan_key
VITE_ALCHEMY_API_KEY=your_alchemy_key

# App Configuration
VITE_NETWORK=mainnet
VITE_CHAIN_ID=1
```

Keep `.env` for development:

```env
# Development Environment Variables

# Privy (Development)
VITE_PRIVY_APP_ID=your_dev_privy_app_id

# RPC URLs (Testnet)
VITE_MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/demo
VITE_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_DEV_KEY

# Contract Addresses (Sepolia)
VITE_TOKEN_ADDRESS=0xYourSepoliaTokenAddress
VITE_GOVERNOR_ADDRESS=0xYourSepoliaGovernorAddress
VITE_TIMELOCK_ADDRESS=0xYourSepoliaTimelockAddress

# API Keys
VITE_ETHERSCAN_API_KEY=your_etherscan_key

# App Configuration
VITE_NETWORK=sepolia
VITE_CHAIN_ID=11155111
```

**Environment Checklist:**
- [ ] `.env.production` created
- [ ] `.env` for development
- [ ] `.env.example` updated
- [ ] `.gitignore` includes `.env*`
- [ ] Vercel environment variables set
- [ ] Different Privy App IDs for dev/prod
- [ ] Different contract addresses for dev/prod

### 3. Performance Optimization

#### A. Use The Graph (Indexer)

**Why:** Querying blockchain directly is slow. The Graph indexes events for instant queries.

**Step 1: Create Subgraph**

```bash
# Install Graph CLI
npm install -g @graphprotocol/graph-cli

# Initialize subgraph
graph init --studio your-dao-subgraph

# Define schema in schema.graphql
```

**Step 2: Define Schema**

```graphql
# schema.graphql
type Proposal @entity {
  id: ID!
  proposalId: BigInt!
  proposer: Bytes!
  targets: [Bytes!]!
  values: [BigInt!]!
  signatures: [String!]!
  calldatas: [Bytes!]!
  startBlock: BigInt!
  endBlock: BigInt!
  description: String!
  forVotes: BigInt!
  againstVotes: BigInt!
  abstainVotes: BigInt!
  state: Int!
  createdAt: BigInt!
  votes: [Vote!]! @derivedFrom(field: "proposal")
}

type Vote @entity {
  id: ID!
  proposal: Proposal!
  voter: Bytes!
  support: Int!
  weight: BigInt!
  reason: String
  timestamp: BigInt!
}

type Delegation @entity {
  id: ID!
  delegator: Bytes!
  delegatee: Bytes!
  timestamp: BigInt!
}
```

**Step 3: Deploy Subgraph**

```bash
# Build
graph codegen && graph build

# Deploy to The Graph Studio
graph deploy --studio your-dao-subgraph
```

**Step 4: Query from Frontend**

```javascript
// src/hooks/useSubgraph.js
import { useQuery } from '@tanstack/react-query';

const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/your-dao-subgraph';

export const useProposals = () => {
  return useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const response = await fetch(SUBGRAPH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              proposals(orderBy: createdAt, orderDirection: desc) {
                id
                proposalId
                proposer
                description
                forVotes
                againstVotes
                abstainVotes
                state
                createdAt
              }
            }
          `,
        }),
      });
      const data = await response.json();
      return data.data.proposals;
    },
  });
};
```

**The Graph Checklist:**
- [ ] Subgraph created
- [ ] Schema defined
- [ ] Event handlers written
- [ ] Subgraph deployed
- [ ] Frontend queries subgraph
- [ ] Performance improved (instant loading)

#### B. Skeleton Loaders

Replace basic loaders with skeleton screens.

**Create Skeleton Component:**

```javascript
// src/components/ui/Skeleton/Skeleton.jsx
import './Skeleton.css';

export const Skeleton = ({ width, height, className = '' }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
    />
  );
};
```

```css
/* src/components/ui/Skeleton/Skeleton.css */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--border-color) 50%,
    var(--bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

**Use in ProposalList:**

```javascript
if (isLoading) {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <Card key={i} style={{ marginBottom: '1rem' }}>
          <Skeleton width="60%" height="24px" />
          <Skeleton width="100%" height="16px" style={{ marginTop: '0.5rem' }} />
          <Skeleton width="100%" height="16px" />
          <Skeleton width="40%" height="16px" />
        </Card>
      ))}
    </div>
  );
}
```

**Performance Checklist:**
- [ ] The Graph subgraph deployed
- [ ] Frontend queries subgraph
- [ ] Skeleton loaders implemented
- [ ] Loading states feel instant
- [ ] No blockchain queries for lists

### 4. Final Pre-Launch Checklist

#### Security
- [ ] Smart contracts audited
- [ ] Contracts verified on Etherscan
- [ ] Admin keys decentralized
- [ ] Multi-sig setup (if applicable)
- [ ] Bug bounty program launched

#### Testing
- [ ] All functions tested on testnet
- [ ] Edge cases tested
- [ ] Mobile testing complete
- [ ] Cross-browser testing done
- [ ] Load testing performed

#### Deployment
- [ ] Frontend deployed to Vercel
- [ ] Custom domain configured
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Analytics configured

#### Documentation
- [ ] User guide published
- [ ] Developer docs complete
- [ ] Governance docs published
- [ ] FAQ created
- [ ] Video tutorials (optional)

#### Community
- [ ] Discord/Telegram setup
- [ ] Social media accounts created
- [ ] Launch announcement prepared
- [ ] Community moderators assigned
- [ ] Support system in place

#### Legal
- [ ] Legal wrapper researched
- [ ] Terms of service created
- [ ] Privacy policy published
- [ ] Compliance reviewed
- [ ] Legal counsel consulted

## 🚨 Red Flags - DO NOT LAUNCH IF:

- ❌ Contracts not audited
- ❌ Contracts not verified on Etherscan
- ❌ Admin keys not decentralized
- ❌ Not tested on testnet
- ❌ No community communication channels
- ❌ No documentation
- ❌ Frontend not on HTTPS
- ❌ Environment variables exposed

## ✅ Green Light - Ready to Launch IF:

- ✅ All security steps complete
- ✅ Thorough testing done
- ✅ Community ready
- ✅ Documentation published
- ✅ Support system in place
- ✅ Legal considerations addressed
- ✅ Monitoring tools configured
- ✅ Emergency procedures documented

---

**Remember: It's better to delay launch than to launch unsafely.**

**Your community's trust and funds depend on doing this right.**
