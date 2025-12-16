# Phase 2: Privy Integration Setup Guide

## What Was Implemented

Phase 2 adds hybrid authentication to your DAO using Privy, allowing users to connect via:
- Traditional Web3 wallets (MetaMask, WalletConnect, etc.)
- Social logins (Google, Apple, Email)
- Embedded wallets for social users

## Files Created

### Components
- `src/components/web3/WalletButton/WalletButton.jsx` - Smart wallet connection button
- `src/components/web3/WalletButton/WalletButton.css` - Wallet button styles
- `src/components/ui/Button/Button.jsx` - Reusable button component
- `src/components/ui/Button/Button.css` - Button styles

### Updated Files
- `src/main.jsx` - Added PrivyProvider and QueryClientProvider
- `src/components/layout/Navbar/Navbar.jsx` - Integrated WalletButton
- `.env` - Added VITE_PRIVY_APP_ID
- `.env.example` - Added Privy configuration example

## Setup Instructions

### 1. Get Your Privy App ID

1. Go to [https://privy.io/](https://privy.io/)
2. Sign up or log in
3. Create a new app
4. Copy your App ID from the dashboard

### 2. Configure Environment Variables

Update your `.env` file with your Privy App ID:

```env
VITE_PRIVY_APP_ID=your_actual_privy_app_id_here
```

### 3. Test the Integration

1. Start your dev server: `npm run dev`
2. Open your browser to `http://localhost:5174/`
3. Click the "Connect Wallet" button in the navbar
4. Try connecting with:
   - A Web3 wallet (MetaMask, etc.)
   - Email login
   - Social login (Google, Apple)

## Features

### WalletButton Component
- Shows "Connect Wallet" when not authenticated
- Displays shortened wallet address when connected
- Provides logout functionality
- Handles loading states

### Privy Configuration
- **Theme**: Dark mode matching your DAO design
- **Accent Color**: Web3 Violet (#8B5CF6)
- **Login Methods**: Email, Wallet, Google, Apple
- **Chains**: Mainnet and Sepolia
- **Embedded Wallets**: Auto-created for social login users

## Customization

### Change Login Methods

Edit `src/main.jsx`:

```javascript
loginMethods: ['email', 'wallet', 'google', 'apple', 'twitter', 'discord'],
```

### Change Supported Chains

```javascript
import { mainnet, sepolia, polygon } from 'wagmi/chains';

supportedChains: [mainnet, sepolia, polygon],
```

### Customize Appearance

```javascript
appearance: {
  theme: 'dark', // or 'light'
  accentColor: '#8B5CF6', // Your brand color
  logo: '/your-logo.png', // Path to your logo
},
```

## Next Steps

Phase 3 will add:
- Reusable UI components (Cards, Modals, Forms)
- Loading states and error handling
- Toast notifications
- Enhanced user experience

## Troubleshooting

### "VITE_PRIVY_APP_ID is not set" Error
- Make sure you've added your Privy App ID to `.env`
- Restart your dev server after updating `.env`

### Wallet Not Connecting
- Check browser console for errors
- Verify your Privy App ID is correct
- Ensure you've allowed the necessary permissions in your wallet

### Styling Issues
- Make sure `colors.css` is imported in `index.css`
- Check that CSS variables are defined in your color palette

### Import/Build Errors
- If you see buffer polyfill errors, make sure `vite.config.js` has `define: { global: 'globalThis' }`
- Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

## Technical Details

### Dependencies Installed
- `@privy-io/react-auth` - Privy authentication SDK
- `@privy-io/wagmi` - Privy integration with Wagmi
- `@tanstack/react-query` - State management for async data (already installed)
- `wagmi` - Ethereum library (already installed)
- `viem` - TypeScript Ethereum library (already installed)

### Vite Configuration
Added `define: { global: 'globalThis' }` to handle Node.js globals in the browser environment.
