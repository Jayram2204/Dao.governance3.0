# 🚀 Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Web3 wallet (MetaMask recommended)

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Get WalletConnect Project ID

**This is required for wallet connection to work!**

1. Visit [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign up (it's free)
3. Click "Create New Project"
4. Give it a name (e.g., "My DAO Dashboard")
5. Copy the **Project ID**

### 3. Configure Environment

Create or update `.env` file in the root directory:

```env
VITE_WALLETCONNECT_PROJECT_ID=paste_your_project_id_here
VITE_APP_NAME=My DAO Dashboard
```

### 4. Verify Setup

Run the setup checker:
```bash
npm run check
```

This will verify:
- ✅ Dependencies installed
- ✅ .env file exists
- ✅ WalletConnect ID configured
- ✅ All core files present

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 6. Connect Your Wallet

1. Click "Connect Wallet" in the top right
2. Choose your wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection
4. You're in! 🎉

## What's Working

✅ **Wallet Connection** - Connect with any Web3 wallet
✅ **Home Page** - Landing page with features
✅ **Voting** - Governance interface
✅ **Treasury** - Treasury management
✅ **Analytics** - DAO metrics dashboard
✅ **Leaderboard** - Member rankings
✅ **Identity** - User profiles
✅ **Responsive Design** - Works on all devices

## Next Steps

### Deploy Smart Contracts (Optional)

If you want to connect to real contracts:

```bash
# Compile contracts
npx hardhat compile

# Deploy to testnet
npx hardhat run scripts/deploy.js --network sepolia

# Update .env with deployed addresses
VITE_DAO_CONTRACT_ADDRESS=0x...
VITE_GOVERNANCE_TOKEN_ADDRESS=0x...
```

### Customize Branding

1. **Colors**: Edit `src/index.css`
2. **Logo**: Update `src/components/layout/Navbar/Navbar.jsx`
3. **App Name**: Change in `.env`

### Deploy to Production

**Vercel (Recommended):**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Upload dist folder to Netlify
```

**Important**: Set environment variables in your hosting platform!

## Troubleshooting

### Wallet won't connect?
- Check WalletConnect Project ID is correct
- Make sure you have a Web3 wallet installed
- Try refreshing the page

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use?
```bash
npm run dev -- --port 3000
```

## Need Help?

1. Run `npm run check` to verify setup
2. Check browser console for errors (F12)
3. Make sure .env file is configured
4. Verify WalletConnect Project ID is valid

## Common Issues

**"Module not found"**
- Run: `npm install`

**"Invalid Project ID"**
- Get a real Project ID from cloud.walletconnect.com
- Don't use "demo" or placeholder values

**"Network error"**
- Check internet connection
- Try different RPC provider

---

**Ready to build your DAO! 🎉**
