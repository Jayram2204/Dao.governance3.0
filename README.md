# DAO 2.0 Dashboard 🚀

A modern, production-ready DAO dashboard with wallet connection, governance, and analytics.

## ⚡ Quick Start

### 1. Install
```bash
npm install
```

### 2. Get WalletConnect Project ID
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a free account
3. Create new project
4. Copy your Project ID

### 3. Configure
Update `.env`:
```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 4. Run
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## ✨ Features

- 🔐 Multi-wallet support (MetaMask, WalletConnect, Coinbase, etc.)
- 🗳️ Governance & voting interface
- 💰 Treasury management
- 📊 Real-time analytics
- 🏆 Leaderboard & achievements
- 🎨 Modern, responsive UI
- ⚡ Built with Vite for speed

## 🛠️ Tech Stack

- React 19 + Vite 7
- Wagmi + RainbowKit (Web3)
- Hardhat (Smart Contracts)
- Zustand (State)
- React Router v7

## 📦 Build

```bash
npm run build
npm run preview
```

## 🔧 Smart Contracts

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Update contract addresses in `.env` after deployment.

## 🚀 Deploy

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist folder
```

**Important**: Set `VITE_WALLETCONNECT_PROJECT_ID` in your hosting platform's environment variables.

## 📁 Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── store/         # State management
├── config/        # Configuration
└── utils/         # Utilities
```

## 🎨 Customize

### Colors
Edit `src/index.css`:
```css
:root {
  --color-primary: #8b5cf6;
  --color-secondary: #06b6d4;
}
```

### Branding
- Update logo in `src/components/layout/Navbar/Navbar.jsx`
- Change app name in `.env`

## 🔒 Security

- Never commit `.env` with real credentials
- Audit smart contracts before mainnet
- Use hardware wallets for production
- Keep dependencies updated

## 📄 License

MIT License - see LICENSE file

---

Built with ❤️ by the DAO community
