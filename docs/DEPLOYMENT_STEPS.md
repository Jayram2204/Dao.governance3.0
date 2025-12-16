# 🚀 Complete Deployment Guide

## ✅ Option A: Security Fixes - COMPLETE

All critical security issues have been fixed:
- ✅ Voting delay increased to 1 day (7200 blocks)
- ✅ Proposal grace period added (7 days)
- ✅ Contracts compiled successfully

---

## 🚀 Option B: Deploy to Testnet

### Prerequisites

1. **Get Testnet ETH**
   - Visit [Sepolia Faucet](https://sepoliafaucet.com/)
   - Or [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - Need ~0.05 ETH for deployment

2. **Get Alchemy API Key**
   - Sign up at [Alchemy.com](https://www.alchemy.com/)
   - Create a new app on Sepolia network
   - Copy the HTTPS URL

3. **Prepare Private Key**
   - Export from MetaMask: Settings → Security & Privacy → Show Private Key
   - ⚠️ **NEVER share this or commit to Git!**

### Step-by-Step Deployment

#### 1. Update .env File

```bash
# Copy example
cp .env.example .env

# Edit .env and add:
PRIVATE_KEY=your_private_key_here
VITE_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
VITE_ETHERSCAN_API_KEY=your_etherscan_key_here
```

#### 2. Test Locally First

```bash
# Start local Hardhat node (Terminal 1)
npx hardhat node

# Deploy to local network (Terminal 2)
npx hardhat run scripts/deploy.js --network localhost
```

Expected output:
```
🚀 Starting DAO deployment...
✅ MyDAOToken deployed to: 0x5FbDB...
✅ DAOTimelock deployed to: 0x9fE46...
✅ MyDAOGovernor deployed to: 0xe7f17...
🎉 DAO Deployment Complete!
```

#### 3. Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

This will:
1. Deploy MyDAOToken (1M tokens to deployer)
2. Deploy DAOTimelock (2-day delay)
3. Deploy MyDAOGovernor (with security fixes)
4. Configure all roles automatically
5. Delegate voting power to deployer
6. Save deployment info to `deployments/sepolia.json`

#### 4. Verify Contracts on Etherscan

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
  7200 \
  50400 \
  "1000000000000000000000" \
  4
```

#### 5. Update Frontend Configuration

Edit `src/config/contracts.js`:

```javascript
export const CONTRACTS = {
  TOKEN: {
    address: "0xYOUR_TOKEN_ADDRESS",
    abi: TOKEN_ABI, // Copy from artifacts/contracts/MyDAOToken.sol/MyDAOToken.json
  },
  GOVERNOR: {
    address: "0xYOUR_GOVERNOR_ADDRESS",
    abi: GOVERNOR_ABI, // Copy from artifacts/contracts/MyDAOGovernor.sol/MyDAOGovernor.json
  },
  TIMELOCK: {
    address: "0xYOUR_TIMELOCK_ADDRESS",
    abi: TIMELOCK_ABI, // Copy from artifacts/contracts/DAOTimelock.sol/DAOTimelock.json
  },
};
```

#### 6. Copy Full ABIs

```bash
# Token ABI
cat artifacts/contracts/MyDAOToken.sol/MyDAOToken.json | jq '.abi' > src/abis/MyDAOToken.json

# Governor ABI
cat artifacts/contracts/MyDAOGovernor.sol/MyDAOGovernor.json | jq '.abi' > src/abis/MyDAOGovernor.json

# Timelock ABI
cat artifacts/contracts/DAOTimelock.sol/DAOTimelock.json | jq '.abi' > src/abis/DAOTimelock.json
```

Then import in `src/config/contracts.js`:
```javascript
import TokenABI from '../abis/MyDAOToken.json';
import GovernorABI from '../abis/MyDAOGovernor.json';
import TimelockABI from '../abis/DAOTimelock.json';
```

---

## 🔌 Option C: Add Wallet Connection

### Step 1: Get WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Sign up / Log in
3. Create new project
4. Copy Project ID
5. Add to `.env`:
   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_real_project_id_here
   ```

### Step 2: Restore Wagmi/RainbowKit

Update `src/main.jsx`:

```javascript
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'DAO 2.0 Dashboard',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, sepolia],
  ssr: false,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
```

### Step 3: Update Components to Use Real Hooks

Replace `SimpleWalletButton` with `ConnectButton` from RainbowKit:

```javascript
import { ConnectButton } from '@rainbow-me/rainbowkit';

// In Navbar.jsx
<ConnectButton />
```

### Step 4: Enable Real Data Hooks

Update pages to use actual Wagmi hooks instead of mock data:

```javascript
// In Voting.jsx
import { useAccount } from 'wagmi';
import { useGetVotingPower, useDelegateVotes } from '../hooks/useDAO';

const { address } = useAccount();
const { votingPower } = useGetVotingPower();
const { delegate } = useDelegateVotes();
```

---

## 📋 Option D: Review & Document

### Deployment Checklist

#### Pre-Deployment
- [x] Security fixes applied
- [x] Contracts compiled
- [ ] Tests passing
- [ ] Testnet ETH acquired
- [ ] RPC URL configured
- [ ] Private key secured

#### Deployment
- [ ] Deployed to Sepolia
- [ ] Contracts verified on Etherscan
- [ ] Deployment info saved
- [ ] Frontend updated with addresses
- [ ] Full ABIs copied

#### Post-Deployment
- [ ] Tokens distributed to team
- [ ] Voting power delegated
- [ ] First test proposal created
- [ ] Wallet connection working
- [ ] All pages functional

### Testing Checklist

#### Smart Contract Tests
```bash
npx hardhat test
```

Expected: All tests pass

#### Frontend Tests
- [ ] Home page loads
- [ ] Navigation works
- [ ] Wallet connects
- [ ] Token balance displays
- [ ] Voting power shows
- [ ] Can create proposal
- [ ] Can vote on proposal
- [ ] Can delegate votes

### Documentation Complete

- [x] `SECURITY_FIXES.md` - Security improvements documented
- [x] `DEPLOYMENT_STEPS.md` - This file
- [x] `CRITICAL_AUDIT_REPORT.md` - Full audit findings
- [ ] `API_DOCUMENTATION.md` - Contract interfaces
- [ ] `USER_GUIDE.md` - How to use the DAO

---

## 🎯 Next Steps

### Immediate (Today)
1. Run tests: `npx hardhat test`
2. Deploy to Sepolia testnet
3. Verify contracts on Etherscan
4. Update frontend with addresses

### Short-term (This Week)
1. Get WalletConnect Project ID
2. Restore Wagmi/RainbowKit
3. Test wallet connection
4. Distribute test tokens
5. Create first test proposal

### Medium-term (This Month)
1. Professional security audit
2. Bug bounty program
3. Community testing
4. Documentation completion
5. Marketing materials

### Long-term (Before Mainnet)
1. Multi-sig setup
2. Emergency procedures
3. Monitoring and alerts
4. Legal review
5. Mainnet deployment

---

## 📞 Support

If you encounter issues:

1. **Check browser console** (F12) for errors
2. **Check terminal output** for deployment errors
3. **Verify .env file** has correct values
4. **Check Etherscan** for transaction status
5. **Review docs** in the `docs/` folder

---

**Status:** Ready for deployment  
**Security:** ✅ Critical fixes applied  
**Next Action:** Deploy to Sepolia testnet
